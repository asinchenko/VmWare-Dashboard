import mongodb from "mongodb";
import User from './user.logic.js'
import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt";

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
            res.status(200).json({email, token, role})
        }catch(e){
            res.status(400).json({error:e.message})
        }
    };

    static async apiSignupUser(req, res){
        const {email, password, role} = req.body;
        try {
            const newUser = await User.signupUserHashPassword(email, password, role)
            
            //create token
            const token = createToken(newUser._id)
            res.status(200).json({email, token})
        }catch(e){
            res.status(400).json({error:e.message})
        }
    };

    static async apiUpdateUser(req, res){
        const {_id, description, role} = req.body;
        try {
            const updateUser = await User.updateUSER(_id,role, description)
            res.status(200).json({_id, role})
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
}