// packages import
import axios from 'axios'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import https from 'https'
import multer from 'multer'
import nocache from 'nocache'
import nodemailer from 'nodemailer'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import Client from './api_mongo/client.logic.js'
import VirtualMachines from './api_mongo/vms.logic.js'
import vcenterGetVMData from './api_vcenter/vms.vcenter.js'
import clientRouter from './routes/client.route.js'
import collocationRouter from './routes/collocation.route.js'
import excelRouter from './routes/excel.route.js'
import hwRouter from './routes/hw.route.js'
import imgRouter from './routes/img.route.js'
import usersRouter from './routes/user.route.js'
import vmsRouter from './routes/vms.route.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
dotenv.config()
// enable CORS
const app = express()
app.use(nocache())
app.set('etag', false)
app.disable('view cache')
app.use(cors())
app.use(express.json({ limit: '30mb' }))
app.use(express.urlencoded({ limit: '30mb' }))
app.use(express.static('verificationPage'))
// set the port on which our app wil run
// important to read from environment variable if deploying
const USERNAME = `${process.env.USERNAME}`
const PASSWORD = `${process.env.PASSWORD}`
const token = `${USERNAME}:${PASSWORD}`
const encodedToken = Buffer.from(token).toString('base64')
https.globalAgent.options.rejectUnauthorized = false
const httpsAgent = new https.Agent({
	requestCert: false,
	rejectUnauthorized: false,
})
// basic string route to prevent Glitch error
axios.defaults.httpsAgent = httpsAgent
axios.defaults.auth = { username: USERNAME, password: PASSWORD }

var vmWareToken
var helloTimeout
var requestTimeout
if (process.env.NODE_ENV === 'dev') {
	vmWareToken = ''
	helloTimeout = 150000000
	requestTimeout = 432000000
} else {
	vmWareToken = await getVMWareToken()
	helloTimeout = 150000
	requestTimeout = 600000
}

async function getVMWareToken() {
	// replace with a custom URL as required
	//const backendUrl = "https://192.168.88.50/rest/vcenter/vm";
	const backendUrl = `https://${process.env.VCENTER}/api/session`
	// return the data without modification
	let vmWareToken = await axios
		.post(backendUrl, {
			headers: {
				Authorization: 'Bearer ' + encodedToken,
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				Accept: 'application/json',
				'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
				'Access-Control-Allow-Headers':
					'Origin, X-Auth-Token, Content-Type, Authorization, X-Requested-With',
			},
			responseType: 'json',
		})
		.then(response => response.data)
		.catch(e => {
			console.log("Couldn't connect to vmWare. Error occurred")
		})
	return vmWareToken
}

const headers = {
	method: 'get',
	headers: {
		'vmware-api-session-id': vmWareToken,
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
		Accept: 'application/json',
		'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
		'Access-Control-Allow-Headers':
			'Origin, X-Auth-Token, Content-Type, Authorization, X-Requested-With',
	},
	responseType: 'json',
}

app.get('/token', (req, res) => {
	// replace with a custom URL as required
	//const backendUrl = "https://192.168.88.50/rest/vcenter/vm";
	const backendUrl = `https://${process.env.VCENTER}/api/session`
	// return the data without modification
	axios
		.post(backendUrl, {
			headers: {
				Authorization: 'Bearer ' + encodedToken,
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
				Accept: 'application/json',
				'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
				'Access-Control-Allow-Headers':
					'Origin, X-Auth-Token, Content-Type, Authorization, X-Requested-With',
			},
			responseType: 'json',
		})
		.then(response => res.send(response.data))
		.catch(e => {
			console.log("Couldn't get vmWare token")
		})
})

app.get('/data', (req, res) => {
	// replace with a custom URL as required
	const backendUrl = `https://${process.env.VCENTER}/rest/vcenter/vm`
	axios.get(backendUrl, headers).then(response => res.send(response.data))
})

const getVMData = async (url, headers, res) => {
	try {
		vmWareToken = await getVMWareToken()
		const date = new Date()
		const result = await vcenterGetVMData(url, headers)
		if (result) {
			const vmPost = await VirtualMachines.addVM(result, date)
		}
	} catch (e) {
		console.log(new Date.now(), 'Could not get VM data from getVMData function')
		vmWareToken = null
		setTimeout(() => {
			getVMData(`https://${process.env.VCENTER}/rest/vcenter/vm`, headers)
		}, 300000)
	}
}

var interval = setInterval(function () {
	getVMData(`https://${process.env.VCENTER}/rest/vcenter/vm`, headers)
}, requestTimeout)

const helloRequest = async (url, headers, res) => {
	if (vmWareToken) {
		const result = await vcenterGetVMData(url, headers)
	}
}

var helloRequestInterval = setInterval(function () {
	helloRequest(`https://${process.env.VCENTER}/rest/vcenter/vm`, headers)
}, helloTimeout)

//clearInterval(interval);
app.get('/fetch', (req, res) => {
	// replace with a custom URL as required
	const backendUrl = `https://${process.env.VCENTER}/rest/vcenter/vm`
	//const backendUrl = "https://192.168.88.50/rest/com/vmware/cis/session"
	// return the data without modification
	getVMData(`https://${process.env.VCENTER}/rest/vcenter/vm`, headers, res)
})

const gmail = `${process.env.GMAIL}`
const gmailpass = `${process.env.GMAILPASS}`

export const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	auth: {
		user: gmail,
		pass: gmailpass,
	},
})

const destinationFolder = `${__dirname}/hardwareFile/`
// Configure multer to handle the file upload
const storage = multer.diskStorage({
	destination: destinationFolder,
	filename: function (req, file, cb) {
		const fileName = file.originalname.toLowerCase().split(' ').join('-')
		cb(null, fileName)
	},
})
const upload = multer({
	storage: storage,
	fileFilter: function (req, file, cb) {
		const ext = path.extname(file.originalname)
		if (ext !== '.xlsx') {
			return cb(new Error('Only XLSX files are allowed'))
		}
		cb(null, true)
	},
})

app.get('/api/downloadHardware', function (req, res) {
	const file = `${__dirname}/hardwareFile/HPE_DC-Astana.xlsx`
	res.download(file) // Set disposition and send it.
})
app.post('/api/downloadHardware', upload.single('file'), (req, res, next) => {
	const file = req.file
	if (!file) {
		return res.status(400).send('No file uploaded')
	}
	res.status(200).send('File uploaded successfully')
})
app.get('/api/downloadCollocation', function (req, res) {
	const file = `${__dirname}/hardwareFile/DC_RACKS.xlsx`
	res.download(file) // Set disposition and send it.
})

setInterval(() => {
	// Checks for Date fields in client collection to change the "type" field from Active to Inactive in case of old datetime
	Client.updateDBDateField()
}, 60 * 60 * 1000)

app.use('/api/client', clientRouter)
app.use('/api/excel', excelRouter)
app.use('/api/collocation', collocationRouter)
app.use('/api/vms', vmsRouter)
app.use('/api/hw', hwRouter)
app.use('/api/img', imgRouter)
app.use('/api/user', usersRouter)
app.use('*', (req, res) => res.status(404).json({ error: 'not Found' }))

// const server = https.createServer(parameters,app)
const server = app
export default server
