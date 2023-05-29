#!/bin/sh

token=`cat token.txt`

curl -k -X GET -H 'Accept: application/json' -H "vmware-api-session-id: $token" https://192.168.88.50/rest/vcenter/datacenter/datacenter-3   | python3 -m json.tool