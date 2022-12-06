import React, {useState, useEffect} from "react";
import {useStateContext} from '../../contexts/ContextProvider';
import {Header} from '..';


const VirtualMachinesHeader = props => {
    const {
        searchLatestVM, setLatestVM, 
        latestTimeUpdate, setlatestTimeUpdate} = useStateContext();
    const time = latestTimeUpdate ? new Date(latestTimeUpdate).toUTCString() : "Перезагрузите старницу";
    const headerText = `Latest Update:`;
    const headerTime = `${time}`;
    //TODO Create Update Button to trigger retrieveLatestVMs manually
    return (
        <Header category={headerText} 
                date={headerTime} >
        </Header>
    )
}

export default VirtualMachinesHeader;