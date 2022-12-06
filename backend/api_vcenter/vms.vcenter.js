import axios from 'axios';

const vcenerFetchVMDetails = async (url, headers) => {
    try {
        const {data:response} = await axios.get(url, headers) //use data destructuring to get data from the promise object
        return response
    }
        
    catch (error) {
        console.log(error);
    }
};

const vcenterGetVMData = async (backendUrl, headers) => {
    try {
    const {data:response} = await axios.get(backendUrl, headers) //use data destructuring to get data from the promise object
    let template = {
        ram:  null,
        vm:   null,
        name: null,
        state:null,
        cpu:  null,
        details: null,
    }
    let data = response;
    let vm_list = [];
    let vals = Object.values(data)[0]
    //console.log(vals)
    for (let item of vals) {
        let virtual_machine = JSON.parse(JSON.stringify(template));
        for (let key in item){
            if (key === "memory_size_MiB"){
                virtual_machine.ram = item[key]
            } else if (key === "vm"){
                try{
                    let request = await vcenerFetchVMDetails("https://192.168.88.50/rest/vcenter/vm/"+item[key], headers);
                    virtual_machine.details = request;
                    virtual_machine.vm = item[key];
                }catch(e){
                    console.log(`api, ${e}`)
                    res.status(500).json({error:e})
                    virtual_machine.vm = item[key];
                    virtual_machine.details = "empty";
                }
            }else if (key === "name"){
                virtual_machine.name = item[key]
            }else if (key === "power_state"){
                virtual_machine.state = item[key]
            }else if (key === "cpu_count"){
                virtual_machine.cpu = item[key]
            }
        }
        vm_list.push(virtual_machine)
        //console.log(virtual_machine)
        //console.log(vm_list)
    }
    //console.log(vals)
    //res.send(vm_list)
    //console.log(vm_list)
    return vm_list
    }
    catch(e){
        console.log("Error to fetch VM data", e);
    }
};

export default vcenterGetVMData