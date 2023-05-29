import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let excel;
export default class Excel {
    static async injectDB(conn) {
        if (excel) {
            return
        }
        try{
            excel = await conn.db(process.env.DB_NAME).collection("excel")
        }catch(e){
            console.error(
                `Unable to establish a collection handle in excels.logic: ${e}`
            )
        }
    };
    static async getExcel({
        filters = null,
        page = 0,
        excelPerPage = 20,
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
        cursor = await excel
            .find(query)
    }catch(e){
        console.error(`Unable to find command, ${e}`)
        return {excelList:[], totalNumberExcels:0}
    }
    const displayCursor = cursor.limit(excelPerPage).skip(excelPerPage*page)

    try {
        const excelList = await displayCursor.toArray();
        const totalNumberExcels = await excel.countDocuments(query)
        return {excelList, totalNumberExcels}
    }catch(e) {
        console.error(
            `Unable to convert cursor to array or problem counting documents, ${e}`
        )
        return {excelList: [], totalNumberExcels: 0}
    }
    };

    static async addExcel(excel, title){
        try{
            const date = new Date();
            const addDoc = {
                excel, title, date
            };
            return await excel.insertOne(addDoc)
        }catch (e) {
            console.error(`Unable to add a excel: ${e}`)
            return {error: e}
        };
    };

    static async updateExcel(_id,excel,document, type,tags,date){
        try{
            const updateExcel = await excel.updateOne(
                {_id: ObjectId(_id)},
                {$set: {
                    excel,document, type,tags,date}},
            )
            return updateExcel
        }catch (e) {
            console.error(`Unable to update a excel: ${e}`)
            return {error: e}
        };
    };

    static async deleteExcel(_id){
        try{
            const deleteExcel = await excel.deleteOne(
                {_id: ObjectId(_id)},
            )
            return deleteExcel
        }catch (e) {
            console.error(`Unable to delete a excel: ${e}`)
            return {error: e}
        };
    };

    static async getExcelByID(_id) {
        try{
            const findExcel = await excel.findOne(
                {_id: ObjectId(_id)},
            )
            return findExcel
        }catch (e) {
            console.error(`Unable to delete a excel: ${e}`)
            return {error: e}
        };
    };
    static async getExcelByName(name) {
        try{
            const findExcel = await excel.findOne(
                {name: name},
            )
            return findExcel
        }catch (e) {
            console.error(`Unable to delete a excel: ${e}`)
            return {error: e}
        };
    };

    static async updateDBDateField(){
        try{
            const cursor = await excel.find({});
            await cursor.forEach(async (doc) => {
                // do something with the document, e.g. update "type" field if date is exceeded
                if (new Date(doc.date) < new Date()) {
                  await excel.updateOne(
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
    
}