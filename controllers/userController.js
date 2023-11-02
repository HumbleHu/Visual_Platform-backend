const userModel = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signUp = async(req, res) => {
    const { username, password } = req.body;
    let newUser = await userModel.findOne({ username });
    if (newUser) {
        return res.status(400).json({ msg: 'user already exists'});
    }
    newUser = new user({
        username, password: bcrypt.hashSync(password, 10)
    });
    await newUser.save();
    const token = jwt.sign({ id: user.id}, process.env.SECRET_KEY, { expiresIn: '2h'});
    return res.status(200).json({ token, newUser });
    // res: This is the response object that Express provides in the callback function for route handlers.
    // json(): This is a method on the Express response object that sends a JSON response. It also automatically sets the content-type header to application/json.
}

exports.signIn = async(req, res) => {
    console.log('req body: ' + req.body);
    const { username, password } = req.body;
    let user = await userModel.findOne({ username });
    if (!user) {
        return res.status(400).json({ msg: 'user does not exists'});
    }
    const isMatch = bcrypt.compareSync(password, user.passowrd);
    if (!isMatch) {
        return res.status(400).json({ msg: 'incorrect passowrd, please try again'});
    }
    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, { expiresIn: '2h'});
    return res.status(200).json({ token, user });
    /**
     * The token in the code you provided is a JSON Web Token (JWT). 
     * It's a compact, URL-safe means of representing claims to be transferred between two parties. 
     * In this context, the token is used for authentication and can contain claims about the user.
     * 
     * When a user signs up or logs in, a token is generated with jwt.sign().
     * This token is then sent back to the client.
     * In subsequent requests, the client can send this token back to the server to prove their identity.
     * The server can verify the token to ensure it was one that the server issued and that it hasn't been tampered with.
     */
}