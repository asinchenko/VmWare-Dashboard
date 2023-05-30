import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let collocation;
export default class Collocation {
    static async injectDB(conn) {
        if (collocation) {
            return
        }
        try{
            collocation = await conn.db(process.env.DB_NAME).collection("collocation")
        }catch(e){
            console.error(
                `Unable to establish a collection handle in collocations.logic: ${e}`
            )
        }
    };
    static async getCollocation({
        filters = null,
        page = 0,
        collocationPerPage = 20,
    } = {}) {
    let query = {};
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
        cursor = await collocation.find(query)
    }catch(e){
        console.error(`Unable to find command, ${e}`)
        return {collocationList:[], totalNumberCollocations:0}
    }
    const displayCursor = cursor.limit(collocationPerPage).skip(collocationPerPage*page)

    try {
        const collocationList = await displayCursor.toArray();
        const totalNumberCollocations = await collocation.countDocuments(query)
        return {collocationList, totalNumberCollocations}
    }catch(e) {
        console.error(
            `Unable to convert cursor to array or problem counting documents, ${e}`
        )
        return {collocationList: [], totalNumberCollocations: 0}
    }
    };

    static async addCollocation(collocationFile, title, modifiedBy){
        try{
            let index = 0;
            try{
                index = await collocation.countDocuments() + 1;
            }catch(e){
                console.log(e)
            }
            const date = new Date();
            const addDoc = {
                index, modifiedBy, collocationFile, title, date
            };
            return await collocation.insertOne(addDoc)
        }catch (e) {
            console.error(`Unable to add a collocation: ${e}`)
            return {error: e}
        };
    };

    static async updateCollocation(_id,collocationFile,document, type,tags,date){
        try{
            const updateCollocation = await collocation.updateOne(
                {_id: ObjectId(_id)},
                {$set: {
                    collocationFile,document, type,tags,date}},
            )
            return updateCollocation
        }catch (e) {
            console.error(`Unable to update a collocation: ${e}`)
            return {error: e}
        };
    };

    static async deleteCollocation(_id){
        try{
            const deleteCollocation = await collocation.deleteOne(
                {_id: ObjectId(_id)},
            )
            return deleteCollocation
        }catch (e) {
            console.error(`Unable to delete a collocation: ${e}`)
            return {error: e}
        };
    };

    static async getCollocationByID(_id) {
        try{
            const findCollocation = await collocation.findOne(
                {_id: ObjectId(_id)},
            )
            return findCollocation
        }catch (e) {
            console.error(`Unable to delete a collocation: ${e}`)
            return {error: e}
        };
    };
    static async getCollocationByName(name) {
        try{
            const findCollocation = await collocation.findOne(
                {name: name},
            )
            return findCollocation
        }catch (e) {
            console.error(`Unable to delete a collocation: ${e}`)
            return {error: e}
        };
    };

    static async updateDBDateField(){
        try{
            const cursor = await collocation.find({});
            await cursor.forEach(async (doc) => {
                // do something with the document, e.g. update "type" field if date is exceeded
                if (new Date(doc.date) < new Date()) {
                  await collocation.updateOne(
                    { _id: doc._id },
                    { $set: { type: "inactive" } }
                  );
                }
              });
        }catch (e) {
            console.error(`Unable to update type field based on Time: ${e}`)
            return {error: e}
        };
    }
    static async getCollocationByDate() {
        try{
            const findVM = await collocation.find().sort({date: -1}).limit(1).toArray()
            return findVM
        }catch (e) {
            console.error(`Unable to get VM by date: ${e}`)
            return {error: e}
        };
    };
    
}