// packages import
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import https from 'https';
import clientRouter from "./routes/client.route.js";
import vmsRouter from "./routes/vms.route.js";
import hwRouter from "./routes/hw.route.js";
import imgRouter from "./routes/img.route.js";
import usersRouter from "./routes/user.route.js";
import VirtualMachines from './api_mongo/vms.logic.js';
import vcenterGetVMData from './api_vcenter/vms.vcenter.js'
import dotenv from "dotenv";
import nocache from 'nocache';
dotenv.config();
// enable CORS
const app = express();
app.use(nocache());
app.set('etag', false)
app.disable('view cache');
app.use(cors());
app.use(express.json({limit: '30mb'}));
app.use(express.urlencoded({limit: '30mb'}));
// set the port on which our app wil run
// important to read from environment variable if deploying


const USERNAME = `${process.env.USERNAME}`
const PASSWORD = `${process.env.PASSWORD}`
const token = `${USERNAME}:${PASSWORD}`;
const encodedToken = Buffer.from(token).toString('base64');
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    },
  )
// basic string route to prevent Glitch error
axios.defaults.httpsAgent = httpsAgent
axios.defaults.auth = {'username': USERNAME, 'password': PASSWORD}

var vmWareToken;
var helloTimeout;
var requestTimeout;
if (process.env.NODE_ENV === 'dev'){
    vmWareToken = "";
    helloTimeout = 150000000;
    requestTimeout = 432000000;
}else {
    vmWareToken = await getVMWareToken();
    helloTimeout = 150000;
    requestTimeout = 600000;
}

async function getVMWareToken(){
    // replace with a custom URL as required
    //const backendUrl = "https://192.168.88.50/rest/vcenter/vm";
    const backendUrl = `https://${process.env.VCENTER}/api/session`
    // return the data without modification
    let vmWareToken = await axios.post(backendUrl,
        {   
            headers: {
            'Authorization': 'Bearer '+ encodedToken,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json', 
            'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Auth-Token, Content-Type, Authorization, X-Requested-With'},
            responseType: 'json',
          }
    ).then(response => response.data);
    return vmWareToken
}

const headers = {
    method: 'get',
    // auth: {
    //   username: "administrator@alex.home.ws",
    //   password: "Propro123a$d"
    // },
    headers: { 'vmware-api-session-id': vmWareToken,
    'Content-Type': 'application/json','Access-Control-Allow-Origin': '*','Accept': 'application/json', 
    'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, X-Auth-Token, Content-Type, Authorization, X-Requested-With'},
    responseType: 'json',
}

app.get("/token", (req, res) => {
    // replace with a custom URL as required
    //const backendUrl = "https://192.168.88.50/rest/vcenter/vm";
    const backendUrl = `https://${process.env.VCENTER}/api/session`
    // return the data without modification
    axios.post(backendUrl,
        {   
            headers: {
            'Authorization': 'Bearer '+ encodedToken,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json', 
            'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, X-Auth-Token, Content-Type, Authorization, X-Requested-With'},
            responseType: 'json',
          }
    ).then(response => res.send(response.data));
});

app.get("/data", (req, res) => {
    // replace with a custom URL as required
    const backendUrl = `https://${process.env.VCENTER}/rest/vcenter/vm`;
    axios.get(backendUrl,headers
    ).then(response => res.send(response.data));
});


const getVMData = async (url, headers, res) => {
    try {
        vmWareToken = await getVMWareToken();
        const date = new Date();
        const result = await vcenterGetVMData(url, headers);
        if (result){
            const vmPost = await VirtualMachines.addVM(
                result,
                date,
            );
        }
    }catch(e) {
        console.log(e)
    };
};

var interval = setInterval(function() {
    getVMData(`https://${process.env.VCENTER}/rest/vcenter/vm`, headers)
    }, requestTimeout);
    

const helloRequest = async (url, headers, res) => {
    const result = await vcenterGetVMData(url, headers);
    };

var helloRequestInterval = setInterval(function() {
        helloRequest(`https://${process.env.VCENTER}/rest/vcenter/vm`, headers)
    }, helloTimeout);

//clearInterval(interval);
app.get("/fetch", (req, res) => {
    // replace with a custom URL as required
    const backendUrl = `https://${process.env.VCENTER}/rest/vcenter/vm`;
    //const backendUrl = "https://192.168.88.50/rest/com/vmware/cis/session"
    // return the data without modification
    getVMData(`https://${process.env.VCENTER}/rest/vcenter/vm`, headers, res)
})

app.use('/api/client', clientRouter);
app.use('/api/vms', vmsRouter);
app.use('/api/hw', hwRouter);
app.use('/api/img', imgRouter);
app.use('/api/user', usersRouter);
app.use('*',(req, res) => res.status(404).json({error: "not Found"}));



export default app