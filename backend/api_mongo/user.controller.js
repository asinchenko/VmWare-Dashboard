import mongodb from "mongodb";
import User from './user.logic.js'

export default class UserController {
    static async apiLoginUser(req, res){
        res.json({mssg:"login User"})
    };

    static async apiSignupUser(req, res){
        const {email, password} = req.body;
        try {
            const newUser = await User.signupUserHashPassword(email, password)
            
            res.status(200).json({email, newUser})
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