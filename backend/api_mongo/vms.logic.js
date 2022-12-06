import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;
let vms;
export default class VirtualMachines {
    static async injectDB(conn) {
        if (vms) {
            return
        }
        try{
            vms = await conn.db(process.env.DB_NAME).collection("virtual_machines")
        }catch(e){
            console.error(
                `Unable to establish a collection handle in vms.logic: ${e}`
            )
        }
    };
    static async getVMs({
        filters = null,
        page = 0,
        vmPerPage = 20,
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
        cursor = await vms
            .find(query)
    }catch(e){
        console.error(`Unable to find command, ${e}`)
        return {vmList:[], totalNumberVMs:0}
    }
    const displayCursor = cursor.limit(vmPerPage).skip(vmPerPage*page)

    try {
        const vmList = await displayCursor.toArray();
        const totalNumberVMs = await vms.countDocuments(query)
        return {vmList, totalNumberVMs}
    }catch(e) {
        console.error(
            `Unable to convert cursor to array or problem counting documents, ${e}`
        )
        return {vmList: [], totalNumberVMs: 0}
    }
    };

    static async addVM(vmList, date){
        try{
            const addDoc = {
                vmList,
                date,
            };
            return await vms.insertOne(addDoc)
        }catch (e) {
            console.error(`Unable to add a VM: ${e}`)
            return {error: e}
        };
    };

    static async updateVM(vmId, descripion,date){
        try{
            const updateVM = await vms.updateOne(
                {_id: ObjectId(vmId)},
                {$set: {descripion: descripion, date: date}},
            )
            return updateVM
        }catch (e) {
            console.error(`Unable to update a VM: ${e}`)
            return {error: e}
        };
    };

    static async deleteVM(vmId){
        try{
            const deleteVM = await vms.deleteOne(
                {_id: ObjectId(vmId)},
            )
            return deleteVM
        }catch (e) {
            console.error(`Unable to delee a VM: ${e}`)
            return {error: e}
        };
    };

    static async getVMByID(vmId) {
        try{
            const findVM = await vms.findOne(
                {_id: ObjectId(vmId)},
            )
            return findVM
        }catch (e) {
            console.error(`Unable to delee a VM: ${e}`)
            return {error: e}
        };
    };

    static async getVMByState(vmId) {
        let states = [];
        try{
            const findVM = await vms.distinct("status")
            return findVM
        }catch (e) {
            console.error(`Unable to get VM status: ${e}`)
            return {error: e}
        };
    };

    static async getVMByDate() {
        try{
            const findVM = await vms.find().sort({date: -1}).limit(1).toArray()
            return findVM
        }catch (e) {
            console.error(`Unable to get VM by date: ${e}`)
            return {error: e}
        };
    };
}