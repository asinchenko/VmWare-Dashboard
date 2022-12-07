import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let imgs;
export default class Images {
    static async injectDB(conn) {
        if (imgs) {
            return
        }
        try{
            imgs = await conn.db(process.env.DB_NAME).collection("images")
        }catch(e){
            console.error(
                `Unable to establish a collection handle in imgs.logic: ${e}`
            )
        }
    };
    static async getIMGs({
        filters = null,
        page = 0,
        imgPerPage = 20,
    } = {}) {
    let query;
    if (filters) {
        if ("name" in filters) {
            query = {$text: { $search: filters["name"] }}
        }else if ("status" in filters){
            query = {"status": {$eq: filters["status"]}}
        }else if ("cpu" in filters){  
            query = {"cpu": {$eq: filters["cpu"]}}
        }
    }
    let cursor
    try {
        cursor = await imgs
            .find(query)
    }catch(e){
        console.error(`Unable to find command, ${e}`)
        return {myFile:[], totalNumberIMGs:0}
    }
    const displayCursor = cursor.limit(imgPerPage).skip(imgPerPage*page)

    try {
        const myFile = await displayCursor.toArray();
        const totalNumberIMGs = await imgs.countDocuments(query)
        return {myFile, totalNumberIMGs}
    }catch(e) {
        console.error(
            `Unable to convert cursor to array or problem counting documents, ${e}`
        )
        return {myFile: [], totalNumberIMGs: 0}
    }
    };

    static async addIMG(myFile, description){
        try{
            const date = new Date();
            const addDoc = {
                myFile,
                description,
                date,
            };
            return await imgs.insertOne(addDoc)
        }catch (e) {
            console.error(`Unable to add a IMG: ${e}`)
            return {error: e}
        };
    };

    static async updateIMG(imgId, descripion,date){
        try{
            const updateIMG = await imgs.updateOne(
                {_id: ObjectId(imgId)},
                {$set: {descripion: descripion, date: date}},
            )
            return updateIMG
        }catch (e) {
            console.error(`Unable to update a IMG: ${e}`)
            return {error: e}
        };
    };

    static async deleteIMG(imgId){
        try{
            const deleteIMG = await imgs.deleteOne(
                {_id: ObjectId(imgId)},
            )
            return deleteIMG
        }catch (e) {
            console.error(`Unable to delee a IMG: ${e}`)
            return {error: e}
        };
    };

    static async getIMGByDescription(imgDescription) {
        try{
            const findIMG = await imgs.findOne(
                {description: imgDescription},
            )
            return findIMG
        }catch (e) {
            console.error(`Unable to delee a IMG: ${e}`)
            return {error: e}
        };
    };

    static async getIMGByState(imgId) {
        let states = [];
        try{
            const findIMG = await imgs.distinct("status")
            return findIMG
        }catch (e) {
            console.error(`Unable to get IMG status: ${e}`)
            return {error: e}
        };
    };

    static async getIMGByDate() {
        try{
            const findIMG = await imgs.find().sort({date: -1}).limit(1).toArray()
            return findIMG
        }catch (e) {
            console.error(`Unable to get IMG by date: ${e}`)
            return {error: e}
        };
    };
}