import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let client;
export default class Client {
    static async injectDB(conn) {
        if (client) {
            return
        }
        try{
            client = await conn.db(process.env.DB_NAME).collection("client")
        }catch(e){
            console.error(
                `Unable to establish a collection handle in hardware.logic: ${e}`
            )
        }
    };
    static async getHardWare({
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
        cursor = await client
            .find(query)
    }catch(e){
        console.error(`Unable to find command, ${e}`)
        return {clientList:[], totalNumberClients:0}
    }
    const displayCursor = cursor.limit(clientPerPage).skip(clientPerPage*page)

    try {
        const clientList = await displayCursor.toArray();
        const totalNumberClients = await client.countDocuments(query)
        return {clientList, totalNumberClients}
    }catch(e) {
        console.error(
            `Unable to convert cursor to array or problem counting documents, ${e}`
        )
        return {clientList: [], totalNumberClients: 0}
    }
    };

    static async addClient(client,document, type, contract, used,rate,date){
        try{
            const addDoc = {
                client,
                document, 
                type,
                contract, 
                used,
                rate, 
                date, 
            };
            return await client.insertOne(addDoc)
        }catch (e) {
            console.error(`Unable to add a CLIENT: ${e}`)
            return {error: e}
        };
    };

    static async updateClient(_id,client,document, type, contract, used,rate,date){
        try{
            const updateClient = await client.updateOne(
                {_id: ObjectId(_id)},
                {$set: {
                    _id,client,document, type, contract, used,rate,date}},
            )
            return updateClient
        }catch (e) {
            console.error(`Unable to update a CLIENT: ${e}`)
            return {error: e}
        };
    };

    static async deleteClient(_id){
        try{
            const deleteClient = await client.deleteOne(
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
            const findClient = await client.findOne(
                {_id: ObjectId(_id)},
            )
            return findClient
        }catch (e) {
            console.error(`Unable to delete a CLIENT: ${e}`)
            return {error: e}
        };
    };
}