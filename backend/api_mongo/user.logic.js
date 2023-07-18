import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
import bcrypt from "bcrypt";
import validator from "validator";
import {transporter} from '../server.js'
let user;
export default class User {
    static async injectDB(conn) {
        if (user) {
            return
        }
        try{
            user = await conn.db(process.env.DB_NAME).collection("user")
        }catch(e){
            console.error(
                `Unable to establish a collection handle in hardware.logic: ${e}`
            )
        }
    };
    static async getUser({
        filters = null,
        page = 0,
        userPerPage = 20,
    } = {}) {
    let query;
    if (filters) {
        if ("name" in filters) {
            query = {$text: { $search: filters["name"] }}
        }else if ("status" in filters){
            query = {"status": {$eq: filters["status"]}}
        }else if ("cpu" in filters){  
            query = {"vendor": {$eq: filters["vendor"]}}
        }
    }
    let cursor
    try {
        cursor = await user
            .find(query)
    }catch(e){
        console.error(`Unable to find command, ${e}`)
        return {userList:[], totalNumberUSERs:0}
    }
    const displayCursor = cursor.limit(userPerPage).skip(userPerPage*page)

    try {
        const userList = await displayCursor.toArray();
        const totalNumberUSERs = await user.countDocuments(query)
        return {userList, totalNumberUSERs}
    }catch(e) {
        console.error(
            `Unable to convert cursor to array or problem counting documents, ${e}`
        )
        return {userList: [], totalNumberUSERs: 0}
    }
    };

    static async updateUSER(userId, role="user", description="",){
        try{
            const updateUSER = await user.updateOne(
                {_id: ObjectId(userId)},
                {$set: {role:role, description: description}},
            )
            return updateUSER
        }catch (e) {
            console.error(`Unable to update a USER: ${e}`)
            return {error: e}
        };
    };

    static async deleteUSER(userId){
        try{
            const findUSER = await user.findOne(
                {_id: ObjectId(userId)},
            )
            if (!findUSER) {
                throw Error('Couldn`t find a user you are trying to delete')
            }
            const deleteUSER = await user.deleteOne(
                {_id: ObjectId(userId)},
            )
            return findUSER
        }catch (e) {
            console.error(`Unable to delete a USER: ${e}`)
            return {error: e}
        };
    };

    static async getUSERByID(userId) {
        try{
            const findUSER = await user.findOne(
                {_id: ObjectId(userId)},
            )
            return findUSER
        }catch (e) {
            console.error(`Unable to delee a USER: ${e}`)
            return {error: e}
        };
    };

    static async getUSERByState(userId) {
        let states = [];
        try{
            const findUSER = await user.distinct("status")
            return findUSER
        }catch (e) {
            console.error(`Unable to get USER status: ${e}`)
            return {error: e}
        };
    };

    static async getUSERByDate() {
        try{
            const findUSER = await user.find().sort({date: -1}).limit(1).toArray()
            return findUSER
        }catch (e) {
            console.error(`Unable to get USER by date: ${e}`)
            return {error: e}
        };
    };

    static async signupUserHashPassword(email, password, role='user', uuid){
        const exists = await user.findOne({email})

        //validator
        if (!email || !password){
            throw Error('All fields must be filled')
        };
        if (!validator.isEmail(email)){
            throw Error('Email is not vaild')
        };
        if (!validator.isStrongPassword(password)){
            throw Error('Password is not strong enough')
        };
        if (exists) {
            throw Error('Email already in use')
        };
        if (!email.includes("vehi.kz")){
            throw Error('Email domain is not vaild')
        };
        //Hash password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        const date = new Date();
        const addDoc = {
            email,
            password: hash,
            role,
            date,
            verified:false,
            uuid,
        }
        return await user.insertOne(addDoc)
    };
    static async loginUser(email, password){
        if (!email || !password){
            throw Error('All fields must be filled')
        };
        const userLogin = await user.findOne({email})

        if (!userLogin){
            throw Error('Incorrect email')
        };
        console.log(userLogin)
        if (!userLogin.verified){
            throw Error('Please verify your email address')
        };

        const match = await  bcrypt.compare(password, userLogin.password);

        if (!match){
            throw Error('Incorrect password')
        };

        return userLogin
    }

    static async findUser(_id){
        const find = await user.findOne({_id: ObjectId(_id)})
        return find
    }

    static async verifyEmailRequest(_id, email, uniqueString){
        try{

        
        const currentUrl = process.env.BACKEND_API;
        const mailOptions = {
            from: 'sinchenko.a@vehi.kz',
            to: email,
            subject: "Verify your email",
            html: `<p>Verify link: <a href=${"http://"+currentUrl + ":4000/api/user/verify/" + _id + "/" + uniqueString}>Click Here!</a></p>`
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(uniqueString, salt);
        const newVerification = {
            userId: _id,
            uniqueString: hash,
            createdDate: Date.now(),
            expiresIn: Date.now() + 21600000,
        };
        const sendEmail = await transporter.sendMail(mailOptions)
        
        return sendEmail
    }
    catch(e){
        console.log(e)
    }
    }

    static async verifyEmailLink(_id,uniqueString){
        const find = await user.findOne({_id: ObjectId(_id)})
        if (!find) {
            throw Error("User doesn't exists")
        }
        const updateUSER = await user.updateOne(
            {_id: find._id},
            {$set: {verified:true}},
        )
    }
}