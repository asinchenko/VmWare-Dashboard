// packages import
import server from "./server.js";
import mongodb from "mongodb";
import clnt from "./api_mongo/client.logic.js"
import vms from "./api_mongo/vms.logic.js"
import hws from "./api_mongo/hardware.logic.js"
import imgs from "./api_mongo/images.logic.js"
import user from "./api_mongo/user.logic.js"
import excel from "./api_mongo/excel.logic.js"
import collocation from "./api_mongo/collocation.logic.js"
import dotenv from "dotenv";
import https from 'https';

dotenv.config();
const port = process.env.PORT || 4000;
const MongoClient = mongodb.MongoClient;

MongoClient.connect(
    process.env.DB_URI,{
        wtimeoutMS: 3000,
        useNewUrlParser: true,
    }
)
.catch(err => {
    console.log(err.stack)
    process.exit(1)
})
.then(async client => {
    await clnt.injectDB(client)
    await vms.injectDB(client)
    await hws.injectDB(client)
    await imgs.injectDB(client)
    await user.injectDB(client)
    await excel.injectDB(client)
    await collocation.injectDB(client)
    server.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
});

// console text when app is running
