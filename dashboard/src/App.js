import React, {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import {TooltipComponent} from '@syncfusion/ej2-react-popups';
import {Navbar, Footer, Sidebar, ThemeSettings} from './components';
import {Dashboard, Equipment, Calendar, VMs, Stacked, Pyramid, Customers, Kanban, Area, Line, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Login, Signup, AckPage, Collocation} from './pages';
import {useStateContext} from './contexts/ContextProvider';
import VMsDataService from "./services/vms";
import HWDataService from "./services/hws";
import ClientDataService from "./services/clnts";
import {useAuthContext} from './services/useAuthContext'
import './App.css'


const App = () => {
  const {searchLatestVM, setLatestVM, 
    latestTimeUpdate, setlatestTimeUpdate,
    activeMenu, themeSettings, 
    setThemeSettings, currentColor, currentMode,
    resourcesToCustomers, setResourcesToCustomers,
    cpuTotalAmount, setCPUTotalAmount,
    ramTotalAmount, setRAMTotalAmount,
    storageTotalSSDAmount , setStoragaTotalSSDAmount,
    storageTotalFCAmount, setStorageTotalFCAmount,
    storageTotalNLAmount, setStorageTotalNLAmount,
    hardWareDevices, setHardWareDevices,
    clientList, setClientList
  } = useStateContext();
    const {user} = useAuthContext();
    const {getLatest} = VMsDataService();
    const {getAll} = HWDataService();
    const {getClientAll} = ClientDataService();

    var clientResourcesArray = [];
    
    const retrieveResults = async () => {
      await getLatest()
        .then(response => {
            getClientAll().then(clients => {
              const clientsContract = clients.data.clients;
              setClientList(clientsContract)
              let updatedResponse = response.data[0].vmList;
              updatedResponse.map((value) =>{
              segmentClients(value,clientResourcesArray,clientsContract);
            });
            let latestDate = response.data[0].date;
            setLatestVM(updatedResponse);
            setlatestTimeUpdate(latestDate);
            updateWithReservedValues(clientResourcesArray, clientsContract)
            setResourcesToCustomers(clientResourcesArray);
        }).catch(e => {
            console.log(e, "getLatest function");
        });
        }).catch(e => {
              console.log(e, "getClientAll function");
            });
      getAll()
        .then(response => {
          setHardWareDevices(response.data.hardWare)
        }).catch(e => {
          console.log(e, "getAll function");
      });
      
    }
  useEffect(() => {
    if (user) {
      if (searchLatestVM.length == 0 || latestTimeUpdate === 0 ){
        retrieveResults();
        setCPUTotalAmount(7648);
        setRAMTotalAmount(4300);
        setStoragaTotalSSDAmount(185000);
        setStorageTotalFCAmount(44000);
        setStorageTotalNLAmount(500000);
  }}});
  if (!user) {
    return (<div>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>/verify/:userId/:uniqueString
        <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/> }/>
        <Route path="*" element={<Login/>}/>
      </Routes>
      </BrowserRouter>
    </div>)
  }
  if (user && !user.acknowledge) {
    return (<div>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<AckPage/>}/>
      </Routes>
      </BrowserRouter>
      </div>)
  }
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <BrowserRouter>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{zIndex:'1000'}}>
          <TooltipComponent conent="Settings" position="Top">
            <button type="button"
            onClick={() => setThemeSettings(true)}
            className="text-3xl p-3 
            hover:drop-shadow-xl 
            hover:bg-light-gray text-white"
            style={{background: currentColor, 
            borderRadius: '50%'}}>
              <FiSettings/>
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
            <Sidebar/>
          </div>
        ):(
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar/>
          </div>
        )}
        <div className={
          `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${
          activeMenu 
          ? 'md:ml-72' 
          : 'flex-2'}`
        }>
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full"> 
            <Navbar/>
          </div>
        <div>
          {themeSettings && <ThemeSettings />}
          <Routes>
            {/* Dashboard  */}
            <Route path="/" element={user ? <Dashboard/> : <Navigate to="/login"/>}/>
            <Route path="/dashboard" element={user ? <Dashboard/> : <Navigate to="/login"/>}/>
            {/* Pages */}
            <Route path="/equipment/:param" element={user ? <Equipment/> : <Navigate to="/login"/>}/>
            <Route path="/vms" element={user ? <VMs/> : <Navigate to="/login"/>}/>
            <Route path="/customers" element={user ? <Customers/> : <Navigate to="/login"/>}/>
            <Route path="/collocation" element={user ? <Collocation/> : <Navigate to="/login"/>}/>
            {/* Apps */}
            <Route path="/kanban" element={user ? <Kanban/> : <Navigate to="/login"/>}/>
            <Route path="/editor" element={user ? <Editor/> : <Navigate to="/login"/>}/>
            <Route path="/calendar" element={user ? <Calendar/> : <Navigate to="/login"/>}/>
            <Route path="/color-picker" element={user ? <ColorPicker/> : <Navigate to="/login"/>}/>
            {/* Charts */}
            <Route path="/line" element={user ? <Line/> : <Navigate to="/login"/>}/>
            <Route path="/area" element={user ? <Area/> : <Navigate to="/login"/>}/>
            <Route path="/bar" element={user ? <Bar/> : <Navigate to="/login"/>}/>
            <Route path="/pie" element={user ? <Pie/> : <Navigate to="/login"/>}/>
            <Route path="/financial" element={user ? <Financial/> : <Navigate to="/login"/>}/>
            <Route path="/color" element={user ? <ColorMapping/> : <Navigate to="/login"/>}/>
            <Route path="/pyramid" element={user ? <Pyramid/> : <Navigate to="/login"/>}/>
            <Route path="/stacked" element={user ? <Stacked/> : <Navigate to="/login"/>}/>
            <Route path="*" element={user ? <Dashboard/> : <Navigate to="/"/>}/>
            <Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
            <Route path="/signup" element={!user ? <Signup/> : <Navigate to="/"/> }/>
          </Routes>
        </div>
      </div>
    </div>
    </BrowserRouter>
  </div>
  )
}

async function segmentClients(value, clientResourcesArray, clientsContract){
    let reset = false;
    for (const client of clientsContract){
      const tagsArray = client.tags.split(',')
      if (tagsArray.some(tag=>value.name.includes(tag)) && client.client != "Other") {
          const deStringifyContract = {cpu:0, ram:0, ssd:0, fc:0, nl:0}
          deStringifyContract.cpu = Number(client.contract.cpu);
          deStringifyContract.ram = Number(client.contract.ram);
          deStringifyContract.ssd = Number(client.contract.ssd);
          deStringifyContract.fc = Number(client.contract.fc)
          deStringifyContract.nl = Number(client.contract.nl)
          value.customer = client.client;
          value.contract = deStringifyContract;
          value.document = client.document;
          calculateResources(value, clientResourcesArray);
          reset = true;
      }
      
    }
    if (clientsContract === "Reserv"){
      //
    }
    if (!reset) {
      value.customer = "Other";
      value.contract = {cpu:0, ram:0, ssd: 0, fc: 0, nl:0};
      calculateResources(value, clientResourcesArray);
    } 
  // if (value.name == "vcenter"){
  //   value.customer = "Vcenter";
  //   value.contract = {cpu:100, ram:100, ssd: 100, fc: 100, nl:600};
  //   value.document = 11;
  //   calculateResources(value, clientResourcesArray);
  // } else if (value.name.includes("TestVM1")) {
  //   value.customer = "WS Home";
  //   value.contract = {cpu:50, ram:50, ssd: 200, fc: 200, nl:300};
  //   value.document = 12;
  //   calculateResources(value, clientResourcesArray);
  // } else if (value.name.includes("TestVM2")) {
  //   value.customer = "Home Customer";
  //   value.contract = {cpu:10, ram:10 ,ssd: 0, fc: 0, nl:10};
  //   value.document = 13;
  //   calculateResources(value, clientResourcesArray);
  // } else if (value.name.includes("BA") || value.name.includes("PA-VM")) {
  //   value.customer = "Business Algorithm";
  //   value.contract = {cpu:8, ram:24, ssd: 180, fc: 0, nl:0};
  //   value.document = 14;
  //   calculateResources(value, clientResourcesArray);
  // } else if (value.name.includes("kaztol")) {
  //   value.customer = "KazAvtoZhol";
  //   value.contract = {cpu:188, ram:2008, ssd: 8192, fc: 0, nl:261872};
  //   value.document = 15;
  //   calculateResources(value, clientResourcesArray);
  // } else if (value.name.includes("frp")) {
  //   value.customer = "Фонд Развития";
  //   value.contract = {cpu:8, ram: 12, ssd: 100, fc: 0, nl:30000};
  //   value.document = 16;
  //   calculateResources(value, clientResourcesArray);
  // } else if (value.name.includes("Megacam") || value.name.includes("mikrotik-")) {
  //   value.customer = "Перспектива";
  //   value.contract = {cpu:0, ram:0 ,ssd: 0, fc: 0, nl:0};
  //   value.document = 17;
  //   calculateResources(value, clientResourcesArray);
  // } else if (value.name.toLowerCase().includes("smax") || value.name.includes("OPB-age") || value.name.includes("OpsB-")){
  //   value.customer = "SMAX";
  //   value.document = 18;
  //   value.contract = {cpu:0, ram:0 ,ssd: 0, fc: 0, nl:0};
  //   calculateResources(value, clientResourcesArray);
  // } else if (value.name.includes("cuba") || value.name.includes("tovma") || value.name.includes("TB-ege") || value.name.includes("db-srv")) {
  //   value.customer = "Tovma";
  //   value.contract = {cpu:0, ram:0, ssd: 0, fc: 0, nl:0};
  //   value.document = 19;
  //   calculateResources(value, clientResourcesArray);
  // } else if (value.name.toLowerCase() === 'admin-laptop' || value.name.toLowerCase() === 'alex-laptop' || value.name.toLowerCase() === 'DC_Mail' || value.name.toLowerCase() === 'KSC' || value.name.toLowerCase() === 'proxy' || value.name.toLowerCase() === 'SB' || value.name.toLowerCase() === 'web' || value.name.toLowerCase() === 'router'){
  //   value.customer = "PlusMicro";
  //   value.contract = {cpu:58, ram:122, ssd:1024, fc:0, nl:381};
  //   value.document = 20;
  //   calculateResources(value, clientResourcesArray);
  // } else {
  //   value.customer = "Others";
  //   value.contract = {cpu:0, ram:0, ssd: 0, fc: 0, nl:0};
  //   calculateResources(value, clientResourcesArray);
  // } 
}

function calculateResources(value, clientResourcesArray){
  let customerVM = {};
  const objIndex = clientResourcesArray.findIndex(e => Object.keys(e)[0] === value.customer);
  let storage = {ssd: 0,fc: 0,nl: 0};
  value.details.value.disks.map(disk => {
    if (disk.value.backing.vmdk_file.toLowerCase().includes("ssd")){
      storage.ssd += formatBytes(disk.value.capacity);
    }else if (disk.value.backing.vmdk_file.toLowerCase().includes("fc")){
      storage.fc += formatBytes(disk.value.capacity);
    }else{
      storage.nl += formatBytes(disk.value.capacity)
    }
  })
  value.storage = storage;
  if (objIndex != -1){
    clientResourcesArray[objIndex][value.customer] = 
      { vm_amount: clientResourcesArray[objIndex][value.customer].vm_amount === undefined ? 0 : clientResourcesArray[objIndex][value.customer].vm_amount + 1, 
        cpu: value.cpu + clientResourcesArray[objIndex][value.customer].cpu, 
        ram: value.ram + clientResourcesArray[objIndex][value.customer].ram,
        storage: {
          ssd: storage.ssd + clientResourcesArray[objIndex][value.customer].storage.ssd,
          fc: storage.fc + clientResourcesArray[objIndex][value.customer].storage.fc,
          nl: storage.nl + clientResourcesArray[objIndex][value.customer].storage.nl,
        },
        contract : value.contract,
        document: value.document,
      };
  }else {
    customerVM[value.customer] = {
      vm_amount: 1, 
      cpu: value.cpu, 
      ram: value.ram, storage: storage,
      contract : value.contract,
      document: value.document,
    };
  }
  if (Object.keys(customerVM).length > 0)
    clientResourcesArray.push(customerVM)
};
export function formatBytes(bytes, decimals = 2) {

  if (!+bytes) return '0'
  const k = 1024*1024*1024
  const dm = decimals < 0 ? 0 : decimals
  const i = Math.floor(bytes/k)
  return parseInt(`${parseFloat(i.toFixed(dm))}`)
}

function updateWithReservedValues(clientResourcesArray, clientsContract){
  let customerVM = {};
  for (let client of clientsContract){
    if (client.type.toLowerCase() === 'reserv'){
      const objIndex = clientResourcesArray.findIndex(e => Object.keys(e)[0] === client.client);
      if (objIndex == -1){
        const deStringifyContract = {cpu:0, ram:0, ssd:0, fc:0, nl:0}
        deStringifyContract.cpu = Number(client.contract.cpu);
        deStringifyContract.ram = Number(client.contract.ram);
        deStringifyContract.ssd = Number(client.contract.ssd);
        deStringifyContract.fc = Number(client.contract.fc)
        deStringifyContract.nl = Number(client.contract.nl)
        customerVM[client.client] = {
          vm_amount: 0, 
          cpu: 0, 
          ram: 0, storage: {ssd: 0,fc: 0,nl: 0},
          contract : deStringifyContract,
          document: client.document,
        };
      }
      if (Object.keys(customerVM).length > 0){
        clientResourcesArray.push(customerVM)
      }
    }
  }
}
export default App
