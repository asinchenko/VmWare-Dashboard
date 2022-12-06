// packages import
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import https from 'https';
import vmsRouter from "./routes/vms.route.js";
import hwRouter from "./routes/hw.route.js";
import usersRouter from "./routes/users.route.js";
import VirtualMachines from './api_mongo/vms.logic.js';
import vcenterGetVMData from './api_vcenter/vms.vcenter.js'
// enable CORS
const app = express();
app.use(cors());
app.use(express.json());
// set the port on which our app wil run
// important to read from environment variable if deploying


const USERNAME = 'administrator@alex.home.ws'
const PASSWORD = 'Propro123a$d'
const token = `${USERNAME}:${PASSWORD}`;
const encodedToken = Buffer.from(token).toString('base64');
const httpsAgent = new https.Agent({
    rejectUnauthorized: false,
    },
  )

// basic string route to prevent Glitch error
axios.defaults.httpsAgent = httpsAgent
axios.defaults.auth = {'username': USERNAME, 'password': PASSWORD}

var vmWareToken = await getVMWareToken();
async function getVMWareToken(){
    // replace with a custom URL as required
    //const backendUrl = "https://192.168.88.50/rest/vcenter/vm";
    const backendUrl = "https://192.168.88.50/api/session"
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

app.get("/hello", (req, res) => {
    res.send("Hello World!");
});

app.get("/token", (req, res) => {
    // replace with a custom URL as required
    //const backendUrl = "https://192.168.88.50/rest/vcenter/vm";
    const backendUrl = "https://192.168.88.50/api/session"
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
    const backendUrl = "https://192.168.88.50/rest/vcenter/vm";
    
    //const backendUrl = "https://192.168.88.50/rest/com/vmware/cis/session"
    // return the data without modification
    axios.get(backendUrl,headers
    ).then(response => res.send(response.data));
});


const getVMData = async (url, headers, res) => {
    try {
        vmWareToken = await getVMWareToken();
        const date = new Date();
        const result = await vcenterGetVMData(url, headers);
        const vmPost = await VirtualMachines.addVM(
            result,
            date,
        );
    }catch(e) {
        console.log(e)
    };
};

var interval = setInterval(function() {
    getVMData("https://192.168.88.50/rest/vcenter/vm", headers)
    }, 3600000);
    

const helloRequest = async (url, headers, res) => {
    const result = await vcenterGetVMData(url, headers);
    };

var helloRequestInterval = setInterval(function() {
        helloRequest("https://192.168.88.50/rest/vcenter/vm", headers)
    }, 30000);

//clearInterval(interval);
app.get("/fetch", (req, res) => {
    // replace with a custom URL as required
    const backendUrl = "https://192.168.88.50/rest/vcenter/vm";
    //const backendUrl = "https://192.168.88.50/rest/com/vmware/cis/session"
    // return the data without modification
    getVMData("https://192.168.88.50/rest/vcenter/vm", headers, res)
})

app.use('/api/vms', vmsRouter);
app.use('/api/hw', hwRouter);
app.use('/api/users', usersRouter);
app.use('*',(req, res) => res.status(404).json({error: "not Found"}));



export default app