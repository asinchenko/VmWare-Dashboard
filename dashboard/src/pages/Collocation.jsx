import React, {useRef, useState, useEffect} from 'react'
import axios from 'axios';
import {ColumnsDirective, ColumnDirective,} from '@syncfusion/ej2-react-grids'
import {useStateContext} from '../contexts/ContextProvider';
import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-spreadsheet';
import {useAuthContext} from './../services/useAuthContext'
import moment from 'moment';

const Collocation = () => {
  const {currentColor} = useStateContext();
  const [savePushed, setSavePushed] = useState(false);
  const [saveText, setSaveText] = useState("Save")
  const [saveSuccess, setSaveSuccess] = useState(null)
  const spreadsheetRef = useRef(null);
  const {user} = useAuthContext();
  const dataSourceChanged = async (args) => {
    setSavePushed(true);
    setSaveText("Loading")
    const collocation = await spreadsheetRef.current.saveAsJson();
    const title = 'Collocation_DC_Astana.xlsx';
    const modifiedBy = user.description;
    const updateDatabase = await axios.post(`http://${process.env.REACT_APP_BACKEND_API}:4000/api/collocation/`, {
        collocation, title, modifiedBy
        }).then(res => {
            setSavePushed(false)
            setSaveText("Save")
            setSaveSuccess(true)
        }).catch(e => {
            console.log(e.response.data.error)
            setSavePushed(false)
            setSaveText("Save")
            setSaveSuccess(false)
        })
  }
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`http://${process.env.REACT_APP_BACKEND_API}:4000/api/collocation/latest`); // fetch the remote url
      const file = response.data[0].collocationFile.jsonObject; // fetch
      const version = response.data[0].index;
      const modifiedBy = response.data[0].modifiedBy;
      const modifiedDate = moment.utc(response.data[0].date).utcOffset(6).format('HH:mm:ss, MM.D.YY');
      const modifiedFromNow = moment.utc(response.data[0].date).fromNow();  
      file.Workbook.sheets[0].rows[0].cells[0].value = "Version " + version;
      file.Workbook.sheets[0].rows[0].cells[3].value = "Last Modified by " + modifiedBy;
      file.Workbook.sheets[0].rows[0].cells[9].value = modifiedDate;
      file.Workbook.sheets[0].rows[0].cells[11].value = modifiedFromNow;
    console.log(file.Workbook.sheets[0].rows[0])
      let spreadsheet = spreadsheetRef.current;
      spreadsheet?.openFromJson({ file }); // open the file into Spreadsheet
    };
    fetchData();
}, []);
  return (
    <div className="ml-12">
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