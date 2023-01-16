import jwt from 'jsonwebtoken'
import User from '../api_mongo/user.logic.js'
const requireAuth = async (req, res, next) => {
    // verify authentication
    const {authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({error: 'Invalid Authorization'});
    }

    const token = authorization.split(' ')[1]
    

    try {
        const {_id} = jwt.verify(token, process.env.SECRET);
        req.user = await User.findUser(_id);
        
        next()
    }catch(e){
        res.status(401).json({error: "Request is not authorized", msg:e})
    }

} 
export default requireAuth