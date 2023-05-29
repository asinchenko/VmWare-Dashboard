#!/bin/sh

token=`cat token.txt`

curl -k -X GET -H 'Accept: application/json' -H "vmware-api-session-id: $token" https://192.168.88.50/rest/vcenter/vm | python3 -m json.tool



# Receive data as JSON object and apply double iteration to get key value pairs of VMs

# let vals = Object.values(data)[0]

# for (let item of vals) {
#     for (let key in item){
#         if (key === "memory_size_MiB"){
#             template.ram = item[key],
#         }else if (key === "vm"){
#             try{
#                 let request = axios.get("https://192.168.88.50/rest/vcenter/"+item[key], headers).then(response => res.json(response.data));
#                 template.details = request;
#                 template.vm = item[key];
#             }catch(e){
#                 console.log(`api, ${e}`)
#                 res.status(500).json({error:e})
#                 template.vm = item[key];
#                 template.details = undefined;
#             }
#         }else if (key === "name"){
#             template.name = item[key],
#         }else if (key === "power_state"){
#             template.state = item[key],
#         }else if (key === "cpu_count"){
#             template.cpu = item[key],
#         }
#     }
#     //TODO:
#     //invoke VirtualMachines.addVM method to update database with this template
# }