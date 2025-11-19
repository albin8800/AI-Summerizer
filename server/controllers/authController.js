import User from '../models/User.js';
import bcrypt from 'bcrypt';


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if(!name || !email || !password) {
            return res.status(400).json({ message: "All Fields are Required" });
        }

        const existingUser = await User.findOne({ email })

        if(existingUser) {
            return res.status(400).json({ message: "User already exist "})
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            message: "User Registered Succesfully",

            user: {
                id:newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        })
    } catch (error) {
        res.status(500).json({ message: "Server Error" })
    }
}

export default register;