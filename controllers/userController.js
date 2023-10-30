const user = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async(req, res) => {
    const { username, password } = req.body;
    let user = await user.findOne({ username });
    if (user) {
        return res.status(400).json({ msg: 'user already exists'});
    }
    user = new User({
        username, password: bcrypt.hashSync(passowrd, 10)
    });
    await user.save();
    const token = jwt.sign({ id: user.id}, process.env.SECRET_KEY, { expiresIn: '2h'});
    return res.status(200).json({ token, user });
}

exports.signIn = async(req, res) => {
    console.log('req body: ' + req.body);
    const { username, password } = req.body;
}