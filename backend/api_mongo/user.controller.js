import mongodb from "mongodb";
import User from './user.logic.js'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";
import path from 'path'
import {v4 as uuidv4} from "uuid";


const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: '30d'})
}

export default class UserController {
    static async apiLoginUser(req, res){
        const {email, password} = req.body;
        try {
            const loginUser = await User.loginUser(email, password);
            const token = createToken(loginUser._id);
            const role = loginUser.role;
            const acknowledge = loginUser.verified;
            const description = loginUser.description;
            res.status(200).json({email, token, role, acknowledge,description})
        }catch(e){
            res.status(400).json({error:e.message})
        }
    };

    static async apiSignupUser(req, res){
        const {email, password, role} = req.body;
        const uniqueString = uuidv4();
        try {
            const newUser = await User.signupUserHashPassword(email, password, role, uniqueString)
            //create token
            const _id = (newUser.insertedId.toString());
            const token = createToken(_id)
            try {
                const verifyEmail = await User.verifyEmailRequest(_id, email, uniqueString)
            }catch(e){
                res.status(400).json({error:e.message, description:"User was registered, but message couldn't be sent"})
            }
            res.status(200).json({email, token, acknowledge:false})
        }catch(e){
            res.status(400).json({error:e.message, description:"couldn't register a user"})
        };
        
        
    };

    static async apiUpdateUser(req, res){
        const {_id, description, role, verified} = req.body;
        try {
            const updateUser = await User.updateUSER(_id,role, description, verified)
            res.status(200).json({_id, role})
        }catch(e){
            res.status(400).json({error:e.message})
        }
    };

    static async apiDeleteUser(req, res){
        const {_id} = req.body;
        try {
            const updateUser = await User.deleteUSER(_id)
            const userEmail = updateUser;
            res.status(200).json({_id, message:`User with email ${userEmail.email} was deleted`})
        }catch(e){
            res.status(400).json({error:e.message})
        }
    };

    static async apiGetUsers(req, res, next) {
        const userPerPage = req.query.userPerPage ? parseInt(req.query.userPerPage):0;
        const page = req.query.page ? parseInt(req.query.page, 10):0;
        let filters = {}
        if (req.query.status) {
            filters.status = req.query.status
        }else if (req.query.name) {
            filters.name = req.query.name
        }
        const {userList, totalNumberUSERs} = await User.getUser({
            filters,
            page,
            userPerPage,
        })
        let response = {
            users: userList,
            page: page,
            filters,
            entries_per_page: userPerPage,
            total_results: totalNumberUSERs,
        }
        res.json(response)
    };

    static async verifyUserAccount(req, res) {
        const {userId, uniqueString} = req.params;
        console.log(userId, uniqueString);
        const __dirname = path.resolve();
        try{
            const tryToVerify = await User.verifyEmailLink(userId,uniqueString);
            res.sendFile(path.resolve(__dirname, "./verificationPage/email.html"));
        }catch(e){
            res.sendFile(path.resolve(__dirname, "./verificationPage/no_email.html"));
        }
        

    }
}