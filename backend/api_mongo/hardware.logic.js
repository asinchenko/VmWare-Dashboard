import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let hws;
export default class HardWare {
    static async injectDB(conn) {
        if (hws) {
            return
        }
        try{
            hws = await conn.db(process.env.DB_NAME).collection("hardware")
        }catch(e){
            console.error(
                `Unable to establish a collection handle in hardware.logic: ${e}`
            )
        }
    };
    static async getHardWare({
        filters = null,
        page = 0,
        hwPerPage = 20,
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
        cursor = await hws
            .find(query)
    }catch(e){
        console.error(`Unable to find command, ${e}`)
        return {hwList:[], totalNumberHWs:0}
    }
    const displayCursor = cursor.limit(hwPerPage).skip(hwPerPage*page)

    try {
        const hwList = await displayCursor.toArray();
        const totalNumberHWs = await hws.countDocuments(query)
        return {hwList, totalNumberHWs}
    }catch(e) {
        console.error(
            `Unable to convert cursor to array or problem counting documents, ${e}`
        )
        return {hwList: [], totalNumberHWs: 0}
    }
    };

    static async addHW(vendor,hwName, type, description, status,cpu,ram){
        try{
            
            let date = new Date();
            const addDoc = {
                vendor,
                hwName, 
                type,
                description, 
                status,
                cpu, 
                ram, 
                date,
            };
            return await hws.insertOne(addDoc)
        }catch (e) {
            console.error(`Unable to add a HW: ${e}`)
            return {error: e}
        };
    };

    static async updateHW(hwId, descripion,date){
        try{
            const updateHW = await hws.updateOne(
                {_id: ObjectId(hwId)},
                {$set: {descripion: descripion, date: date}},
            )
            return updateHW
        }catch (e) {
            console.error(`Unable to update a HW: ${e}`)
            return {error: e}
        };
    };

    static async deleteHW(hwId){
        try{
            const deleteHW = await hws.deleteOne(
                {_id: ObjectId(hwId)},
            )
            return deleteHW
        }catch (e) {
            console.error(`Unable to delete a HW: ${e}`)
            return {error: e}
        };
    };

    static async getHWByID(hwId) {
        try{
            const findHW = await hws.findOne(
                {_id: ObjectId(hwId)},
            )
            return findHW
        }catch (e) {
            console.error(`Unable to delete a HW: ${e}`)
            return {error: e}
        };
    };

    static async getHWByState(hwId) {
        let states = [];
        try{
            const findHW = await hws.distinct("status")
            return findHW
        }catch (e) {
            console.error(`Unable to get HW status: ${e}`)
            return {error: e}
        };
    };

    static async getHWByDate() {
        try{
            const findHW = await hws.find().sort({date: -1}).limit(1).toArray()
            return findHW
        }catch (e) {
            console.error(`Unable to get HW by date: ${e}`)
            return {error: e}
        };
    };
}