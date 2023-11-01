const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async(req, res) => {
    const { username, password } = req.body;
    let newUser = await user.findOne({ username });
    if (newUser) {
        return res.status(400).json({ msg: 'user already exists'});
    }
    newUser = new user({
        username, password: bcrypt.hashSync(password, 10)
    });
    await newUser.save();
    const token = jwt.sign({ id: user.id}, process.env.SECRET_KEY, { expiresIn: '2h'});
    return res.status(200).json({ token, newUser });
}

exports.signIn = async(req, res) => {
    console.log('req body: ' + req.body);
    const { username, password } = req.body;
    let user = await user.findOne({ username });
    if (!user) {
        return res.status(400).json({ msg: 'user does not exists'});
    }
    const isMatch = bcrypt.compareSync(password, user.passowrd);
    if (!isMathch) {
        return res.status(400).json({ msg: 'incorrect passowrd, please try again'});
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '2h'});
    return res.status(200).json({ token, user });
}