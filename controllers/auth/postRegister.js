const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const postRegister = async (req, res) => {
    try {
        const {username, mail, password} = req.body;

        const userExists = await User.exists({ mail: mail.toLowerCase() });
        if(userExists) {
            return res.status(409).send("Mail already in use");
        }

        const Epassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            username: username,
            mail: mail.toLowerCase(),
            password: Epassword
        });

        const token = jwt.sign(
            {
                userID: user._id,
                mail
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: '24h'
            }
        );
        res.status(201).json({
            mail: user.mail,
            token: token,
            username: user.username
        });

    } catch(err) {
        return res.status(500).send("Error occured. please try again");
    }
};

module.exports = postRegister;