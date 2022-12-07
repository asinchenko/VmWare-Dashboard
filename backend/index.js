// packages import
import app from "./server.js";
import mongodb from "mongodb";
import vms from "./api_mongo/vms.logic.js"
import hws from "./api_mongo/hardware.logic.js"
import imgs from "./api_mongo/images.logic.js"
import dotenv from "dotenv";
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
    console.log(err.stack).
    process.exit(1)
})
.then(async client => {
    
    await vms.injectDB(client)
    await hws.injectDB(client)
    await imgs.injectDB(client)
    app.listen(port, () => {
        console.log(`Server listening at http://localhost:${port}`);
    });
});

// console text when app is running
