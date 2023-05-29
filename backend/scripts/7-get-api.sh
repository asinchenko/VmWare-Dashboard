#!/bin/sh
token=`cat token.txt`

start_time='2022-10-19T11:20:00Z'
end_time='2022-10-19T11:25:00Z'
#get max value CPU Usage
curl -k -X GET -H 'Accept: application/json' -H "vmware-api-session-id: $token" "https://192.168.88.50/rest/appliance/monitoring/query?item.interval=MINUTES5&item.function=MAX&item.start_time="$start_time"&item.end_time="$end_time"&item.names.1=cpu.util"  | python3 -m json.tool
#get min value CPU Usage
curl -k -X GET -H 'Accept: application/json' -H "vmware-api-session-id: $token" "https://192.168.88.50/rest/appliance/monitoring/query?item.interval=MINUTES5&item.function=MIN&item.start_time="$start_time"&item.end_time="$end_time"&item.names.1=cpu.util"  | python3 -m json.tool
#get average value CPU Usage 
curl -k -X GET -H 'Accept: application/json' -H "vmware-api-session-id: $token" "https://192.168.88.50/rest/appliance/monitoring/query?item.interval=MINUTES5&item.function=AVG&item.start_time="$start_time"&item.end_time="$end_time"&item.names.1=cpu.util"  | python3 -m json.tool

#Get max value RAM Usage
curl -k -X GET -H 'Accept: application/json' -H "vmware-api-session-id: $token" "https://192.168.88.50/rest/appliance/monitoring/query?item.interval=MINUTES5&item.function=MAX&item.start_time="$start_time"&item.end_time="$end_time"&item.names.1=mem.util"  | python3 -m json.tool
#Get min value RAM Usage
curl -k -X GET -H 'Accept: application/json' -H "vmware-api-session-id: $token" "https://192.168.88.50/rest/appliance/monitoring/query?item.interval=MINUTES5&item.function=MIN&item.start_time="$start_time"&item.end_time="$end_time"&item.names.1=mem.util"  | python3 -m json.tool
#get average value RAM Usage
curl -k -X GET -H 'Accept: application/json' -H "vmware-api-session-id: $token" "https://192.168.88.50/rest/appliance/monitoring/query?item.interval=MINUTES5&item.function=AVG&item.start_time="$start_time"&item.end_time="$end_time"&item.names.1=mem.util"  | python3 -m json.tool

#Get max value TX/RX Packets
curl -k -X GET -H 'Accept: application/json' -H "vmware-api-session-id: $token" "https://192.168.88.50/rest/appliance/monitoring/query?item.interval=MINUTES5&item.function=COUNT&item.start_time="$start_time"&item.end_time="$end_time"&item.names.1=net.tx.packetRate.eth0"  | python3 -m json.tool
curl -k -X GET -H 'Accept: application/json' -H "vmware-api-session-id: $token" "https://192.168.88.50/rest/appliance/monitoring/query?item.interval=MINUTES5&item.function=COUNT&item.start_time="$start_time"&item.end_time="$end_time"&item.names.1=net.rx.packetRate.eth0"  | python3 -m json.tool