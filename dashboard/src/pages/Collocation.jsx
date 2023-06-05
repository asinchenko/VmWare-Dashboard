import React, {useRef, useState, useEffect} from 'react'
import axios from 'axios';
import {ColumnsDirective, ColumnDirective,} from '@syncfusion/ej2-react-grids'
import {useStateContext} from '../contexts/ContextProvider';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-spreadsheet';
import {useAuthContext} from './../services/useAuthContext'
import moment from 'moment';
import CollocationModal from '../components/Collocation/CollocationModal';
import CollocationFreeModal from '../components/Collocation/CollocationFree';
const Collocation = () => {
  const {currentColor} = useStateContext();
  const [openModalReserv, setOpenModalReserv] = useState(false);
  const [openModalFree, setOpenModalFree] = useState(false);
  const [racksModal, setRacksModal] = useState([]);
  const [racksPositionModal, setRacksPositionModal] = useState([]);
  const [savePushed, setSavePushed] = useState(false);
  const [saveText, setSaveText] = useState("Save")
  const [saveSuccess, setSaveSuccess] = useState(null)
  const [collcationaNewFIle, setCollcationaNewFIle] = useState(null)
  const [rackAction, setRackAction] = useState(null)
  const spreadsheetRef = useRef(null);
  const {user} = useAuthContext();
  const dataSourceChanged = async (args) => {
    setSavePushed(true);
    setSaveText("Loading")
    const collocationPreview = await spreadsheetRef.current.saveAsJson();
    const collocationOld = collocationPreview.jsonObject;
    const file = collocationPreview.jsonObject;
    const allEqual = arr => arr.every( v => v === arr[0] )
    let rackNumbers = [];
    let rackPosition = [];
    let rackActions = [];
    const columns = [3,4,6,7,9,10]
    for (let i = 6; i < 51; i++) {
      for (let y = 0; y < columns.length; y++) {
          if(file.Workbook.sheets[0].rows[i].cells[columns[y]].value == "Резерв" && (file.Workbook.sheets[0].rows[i].cells[columns[y]].style.backgroundColor == '#E3F0D9' || file.Workbook.sheets[0].rows[i].cells[columns[y]].style.backgroundColor == '#F4B184' ) ){
              file.Workbook.sheets[0].rows[i-1].cells[columns[y]].style.backgroundColor = '#FFF2CC';
              file.Workbook.sheets[0].rows[i].cells[columns[y]].style.backgroundColor = '#FFF2CC';
              file.Workbook.sheets[0].rows[i].cells[columns[y]].value = "Резерв";
              file.Workbook.sheets[0].rows[i+1].cells[columns[y]].style.backgroundColor = '#FFF2CC';
              file.Workbook.sheets[0].rows[i+2].cells[columns[y]].style.backgroundColor = '#FFF2CC';
              rackNumbers.push(file.Workbook.sheets[0].rows[i-1].cells[columns[y]].value)
              rackActions.push("Резерв")
              rackPosition.push([i, columns[y]])
          }
          if(file.Workbook.sheets[0].rows[i].cells[columns[y]].value == "Свободно" && file.Workbook.sheets[0].rows[i].cells[columns[y]].format == "@" && (file.Workbook.sheets[0].rows[i].cells[columns[y]].style.backgroundColor == '#FFF2CC' || file.Workbook.sheets[0].rows[i].cells[columns[y]].style.backgroundColor == '#F4B184')){
              file.Workbook.sheets[0].rows[i-1].cells[columns[y]].style.backgroundColor = '#E3F0D9'
              file.Workbook.sheets[0].rows[i].cells[columns[y]].style.backgroundColor = '#E3F0D9'
              file.Workbook.sheets[0].rows[i].cells[columns[y]].value = "Свободно";
              file.Workbook.sheets[0].rows[i+1].cells[columns[y]].style.backgroundColor = '#E3F0D9'
              file.Workbook.sheets[0].rows[i+1].cells[columns[y]].value = undefined;
              file.Workbook.sheets[0].rows[i+2].cells[columns[y]].style.backgroundColor = '#E3F0D9'
              file.Workbook.sheets[0].rows[i+2].cells[columns[y]].value = undefined;
              rackNumbers.push(file.Workbook.sheets[0].rows[i-1].cells[columns[y]].value)
              rackActions.push("Свободно")
              rackPosition.push([i, columns[y]])
            }
          if(file.Workbook.sheets[0].rows[i].cells[columns[y]].value == "Занято" && (file.Workbook.sheets[0].rows[i].cells[columns[y]].style.backgroundColor == '#E3F0D9' || file.Workbook.sheets[0].rows[i].cells[columns[y]].style.backgroundColor == '#FFF2CC' ) ){
              file.Workbook.sheets[0].rows[i-1].cells[columns[y]].style.backgroundColor = '#F4B184';
              file.Workbook.sheets[0].rows[i].cells[columns[y]].style.backgroundColor = '#F4B184';
              file.Workbook.sheets[0].rows[i].cells[columns[y]].value = "Занято";
              file.Workbook.sheets[0].rows[i+1].cells[columns[y]].style.backgroundColor = '#F4B184';
              file.Workbook.sheets[0].rows[i+2].cells[columns[y]].style.backgroundColor = '#F4B184';
              rackNumbers.push(file.Workbook.sheets[0].rows[i-1].cells[columns[y]].value)
              rackActions.push("Занято")
              rackPosition.push([i, columns[y]])
          }
        }
    }
    if (rackActions.length > 0 && allEqual(rackActions)){
      setRacksModal(String(rackNumbers))
      setRacksPositionModal(rackPosition)
      setRackAction(rackActions[0])
      if (rackActions[0] === "Резерв" || rackActions[0] === "Занято") {
        setOpenModalReserv(true)
      }
      if (rackActions[0] === "Свободно") {
        setOpenModalFree(true)
      }
    }else {
      setSavePushed(false);
      setSaveText("Недопустимое действие")
    }
    setCollcationaNewFIle(file)
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://${process.env.REACT_APP_BACKEND_API}:4000/api/collocation/latest`); // fetch the remote url
      const file = response.data[0].collocationFile; // fetch
      const version = response.data[0].index;
      const modifiedBy = response.data[0].modifiedBy;
      const modifiedDate = moment.utc(response.data[0].date).utcOffset(6).format('HH:mm:ss, MM.D.YY');
      const modifiedFromNow = moment.utc(response.data[0].date).fromNow();
      file.Workbook.sheets[0].rows[0].cells[0].value = "Version " + version;
      file.Workbook.sheets[0].rows[0].cells[3].value = "Last Modified by " + modifiedBy;
      file.Workbook.sheets[0].rows[0].cells[9].value = modifiedDate;    
      file.Workbook.sheets[0].rows[0].cells[11].value = modifiedFromNow;
      const columns = [3,4,6,7,9,10]
    for (let i = 6; i < 51; i++) {
      for (let y = 0; y < columns.length; y++) {
        if (file.Workbook.sheets[0].rows[i].cells[columns[y]].value != undefined && file.Workbook.sheets[0].rows[i].cells[columns[y]].value.length > 4 && moment(file.Workbook.sheets[0].rows[i].cells[columns[y]].value, 'HH:mm, MM.D.YY').isValid()){
          console.log(file.Workbook.sheets[0].rows[i].cells[columns[y]].value)
          if (moment(file.Workbook.sheets[0].rows[i].cells[columns[y]].value, 'HH:mm, MM.D.YY').format('MM.D.YY') < moment(new Date).format('MM.D.YY'))
            file.Workbook.sheets[0].rows[i].cells[columns[y]].style.backgroundColor = '#FF0F2F';
        }
      }
    }
      let spreadsheet = spreadsheetRef.current;
      spreadsheet?.openFromJson({ file }); // open the file into Spreadsheet
    };
    fetchData();
}, []);
useEffect(() => {

}, saveSuccess)
  return (
    <div className="ml-12">
    <CollocationFreeModal openModalFree={openModalFree} setOpenModalFree={setOpenModalFree} 
      setSavePushed={setSavePushed} setSaveText={setSaveText}  rackAction={rackAction}
      setSaveSuccess={setSaveSuccess} spreadsheetRef={spreadsheetRef} collcationaNewFIle={collcationaNewFIle} racksModal={racksModal} racksPositionModal={racksPositionModal}/>
    <CollocationModal 
      openModalReserv={openModalReserv} setOpenModalReserv={setOpenModalReserv}
      setSavePushed={setSavePushed} setSaveText={setSaveText}  rackAction={rackAction}
      setSaveSuccess={setSaveSuccess} spreadsheetRef={spreadsheetRef} collcationaNewFIle={collcationaNewFIle} racksModal={racksModal} racksPositionModal={racksPositionModal}
    />
    <div className="flex gap-2 items-center"> 
      <button
          data-ripple="true"
          disabled={savePushed}
          className="hover:bg-blue-700 text-white font-bold py-2 px-40 rounded"
          style={
              {backgroundColor: savePushed ? "rgba(189, 195, 199)":currentColor}
          }
          onClick={dataSourceChanged}>
          {saveText}
      </button>
      
      <div className="flex items-center gap-2">
        {saveSuccess == null ? <></> :
        <div>
          {saveSuccess == true ? 
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-green-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <a className="text-2xl text-green-600">Saved!</a> <a className="text-gray-400">Reload Page to See Changes</a>
          </div>
          :
          <div className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-red-600">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <a className="text-2xl text-red-600">Error!</a> <a className="text-gray-400">Try again, or ask administrator</a>
          </div>
          }
        </div>
      }
      </div>
    </div>
      <SpreadsheetComponent allowSave={true} saveUrl={`https://services.syncfusion.com/react/production/api/spreadsheet/save`} height={"90vh"} ref={spreadsheetRef}  openUrl='https://services.syncfusion.com/react/production/api/spreadsheet/open' allowOpen={true}>
        <SheetsDirective>
                <SheetDirective>
                    <RangesDirective>
                        <RangeDirective></RangeDirective>
                    </RangesDirective>
                    <ColumnsDirective>
                        <ColumnDirective width={100}></ColumnDirective>
                        <ColumnDirective width={110}></ColumnDirective>
                        <ColumnDirective width={100}></ColumnDirective>
                        <ColumnDirective width={180}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective>
                        <ColumnDirective width={130}></ColumnDirective>
                    </ColumnsDirective>
                </SheetDirective>
            </SheetsDirective>
      </SpreadsheetComponent>
      </div>
  );
}
export default Collocation