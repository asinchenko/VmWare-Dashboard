import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let clnt;
export default class Client {
    static async injectDB(conn) {
        if (clnt) {
            return
        }
        try{
            clnt = await conn.db(process.env.DB_NAME).collection("client")
        }catch(e){
            console.error(
                `Unable to establish a collection handle in clients.logic: ${e}`
            )
        }
    };
    static async getClient({
        filters = null,
        page = 0,
        clientPerPage = 20,
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
        cursor = await clnt
            .find(query)
    }catch(e){
        console.error(`Unable to find command, ${e}`)
        return {clientList:[], totalNumberClients:0}
    }
    const displayCursor = cursor.limit(clientPerPage).skip(clientPerPage*page)

    try {
        const clientList = await displayCursor.toArray();
        const totalNumberClients = await clnt.countDocuments(query)
        return {clientList, totalNumberClients}
    }catch(e) {
        console.error(
            `Unable to convert cursor to array or problem counting documents, ${e}`
        )
        return {clientList: [], totalNumberClients: 0}
    }
    };

    static async addClient(client,contract, document, type,date, tags, manager){
        try{
            if (!document){
                const index = await clnt.find().count() + 1;
                document = index;
            }
            const addDoc = {
                client, document, contract, type, date, tags, manager
            };
            return await clnt.insertOne(addDoc)
        }catch (e) {
            console.error(`Unable to add a CLIENT: ${e}`)
            return {error: e}
        };
    };

    static async updateClient(_id,client,document, type,tags,date){
        try{
            const updateClient = await clnt.updateOne(
                {_id: ObjectId(_id)},
                {$set: {
                    client,document, type,tags,date}},
            )
            return updateClient
        }catch (e) {
            console.error(`Unable to update a CLIENT: ${e}`)
            return {error: e}
        };
    };

    static async deleteClient(_id){
        try{
            const deleteClient = await clnt.deleteOne(
                {_id: ObjectId(_id)},
            )
            return deleteClient
        }catch (e) {
            console.error(`Unable to delete a CLIENT: ${e}`)
            return {error: e}
        };
    };

    static async getClientByID(_id) {
        try{
            const findClient = await clnt.findOne(
                {_id: ObjectId(_id)},
            )
            return findClient
        }catch (e) {
            console.error(`Unable to delete a CLIENT: ${e}`)
            return {error: e}
        };
    };

    static async updateDBDateField(){
        try{
            const cursor = await clnt.find({});
            await cursor.forEach(async (doc) => {
                // do something with the document, e.g. update "type" field if date is exceeded
                if (new Date(doc.date) < new Date()) {
                  await clnt.updateOne(
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