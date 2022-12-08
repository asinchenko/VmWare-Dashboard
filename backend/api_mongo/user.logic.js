import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
import bcrypt from "bcrypt";
import validator from "validator";
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

    static async updateUSER(userId, descripion,date){
        try{
            const updateUSER = await user.updateOne(
                {_id: ObjectId(userId)},
                {$set: {descripion: descripion, date: date}},
            )
            return updateUSER
        }catch (e) {
            console.error(`Unable to update a USER: ${e}`)
            return {error: e}
        };
    };

    static async deleteUSER(userId){
        try{
            const deleteUSER = await user.deleteOne(
                {_id: ObjectId(userId)},
            )
            return deleteUSER
        }catch (e) {
            console.error(`Unable to delee a USER: ${e}`)
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

    static async signupUserHashPassword(email, password){
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
            date,
        }
        return await user.insertOne(addDoc)
    };
    static async loginUser(email, password){
        if (!email || !password){
            throw Error('All fields must be filled')
        };
        const userLogin = await user.findOne({email})

        if (!userLogin){
            throw Error('Incorect email')
        };

        const match = await  bcrypt.compare(password, userLogin.password);

        if (!match){
            throw Error('Incorrect password')
        };

        return userLogin
    }
}