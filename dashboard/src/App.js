import React, {useEffect, useState} from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {FiSettings} from 'react-icons/fi';
import {TooltipComponent} from '@syncfusion/ej2-react-popups';
import {Navbar, Footer, Sidebar, ThemeSettings} from './components';
import {Ecommerce, Orders, Calendar, Employees, Stacked, Pyramid, Customers, Kanban, Area, Line, Bar, Pie, Financial, ColorPicker, ColorMapping, Editor, Login, Signup} from './pages';
import {useStateContext} from './contexts/ContextProvider';
import VMsDataService from "./services/vms";
import HWDataService from "./services/hws";
import './App.css'
//1c7050c916f9fed3227a2b12f49e380e
//const src = "https://192.168.88.50/rest/vcenter/vm"
const src = "http://localhost:4000/fetch"


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
    hardWareDevices, setHardWareDevices
  } = useStateContext();

  

    var clientResourcesArray = [];
    const retrieveResults = () => {
      VMsDataService.getLatest()
        .then(response => {
            let updatedResponse = response.data[0].vmList;
            updatedResponse.map((value) =>{
              segmentClients(value,clientResourcesArray);
            });
            let latestDate = response.data[0].date;
            setLatestVM(updatedResponse);
            setlatestTimeUpdate(latestDate);
            setResourcesToCustomers(clientResourcesArray);
        }).catch(e => {
            console.log(e);
        });
        HWDataService.getAll()
          .then(response => {
            setHardWareDevices(response.data.hardWare)
          })
    }
  useEffect(() => {
    if (searchLatestVM.length == 0 || latestTimeUpdate === 0 ){
      retrieveResults();
      setCPUTotalAmount(128);
      setRAMTotalAmount(1024);
      setStoragaTotalSSDAmount(960);
      setStorageTotalFCAmount(50);
      setStorageTotalNLAmount(1024);
  }});
  // useEffect(() => {

  // });

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
            <Route path="/" element={<Ecommerce/>}/>
            <Route path="/ecommerce" element={<Ecommerce/>}/>
            {/* Pages */}
            <Route path="/orders/:param" element={<Orders/>}/>
            <Route path="/employees" element={<Employees/>}/>
            <Route path="/customers" element={<Customers/>}/>
            {/* Apps */}
            <Route path="/kanban" element={<Kanban/>}/>
            <Route path="/editor" element={<Editor/>}/>
            <Route path="/calendar" element={<Calendar/>}/>
            <Route path="/color-picker" element={<ColorPicker/>}/>
            {/* Charts */}
            <Route path="/line" element={<Line/>}/>
            <Route path="/area" element={<Area/>}/>
            <Route path="/bar" element={<Bar/>}/>
            <Route path="/pie" element={<Pie/>}/>
            <Route path="/financial" element={<Financial/>}/>
            <Route path="/color" element={<ColorMapping/>}/>
            <Route path="/pyramid" element={<Pyramid/>}/>
            <Route path="/stacked" element={<Stacked/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
          </Routes>
        </div>
      </div>
    </div>
    </BrowserRouter>
  </div>
  )
}

function segmentClients(value, clientResourcesArray){
  if (value.name == "vcenter"){
    value.customer = "Vcenter";
    value.cpu_contract = 100;
    value.ram_contract = 100;
    value.storage_contract = {ssd: 100, fc: 100, nl:600};
    calculateResources(value, clientResourcesArray);
  } else if (value.name.includes("TestVM1")) {
    value.customer = "WS Home";
    value.cpu_contract = 50;
    value.ram_contract = 50;
    value.storage_contract = {ssd: 200, fc: 200, nl:300};
    calculateResources(value, clientResourcesArray);
  } else if (value.name.includes("TestVM2")) {
    value.customer = "Home Customer";
    value.cpu_contract = 10;
    value.ram_contract = 10;
    value.storage_contract = {ssd: 0, fc: 0, nl:10};
    calculateResources(value, clientResourcesArray);
  }
}

function calculateResources(value, clientResourcesArray){
  let customerVM = {};
  const objIndex = clientResourcesArray.findIndex(e => Object.keys(e)[0] === value.customer);
  let storage = {ssd: 0,fc: 0,nl: 0};
  value.details.value.disks.map(disk => {
    if (disk.value.backing.vmdk_file.includes("SSD")){
      storage.ssd += formatBytes(disk.value.capacity);
    }else if (disk.value.backing.vmdk_file.includes("FC")){
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
        cpu_contract : value.cpu_contract,
        ram_contract : value.ram_contract,
        storage_contract : value.storage_contract,
      };
  }else {
    customerVM[value.customer] = {vm_amount: 1, cpu: value.cpu, 
      ram: value.ram, storage: storage,

      ram_contract : value.ram_contract,
      cpu_contract : value.cpu_contract,
      storage_contract : value.storage_contract,
    };
  }
  if (Object.keys(customerVM).length > 0)
    clientResourcesArray.push(customerVM)
};
function formatBytes(bytes, decimals = 2) {

  if (!+bytes) return '0'
  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseInt(`${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))}`)
}
export default App