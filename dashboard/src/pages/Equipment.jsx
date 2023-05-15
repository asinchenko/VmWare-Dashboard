import React, {useRef, useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import {HiSwitchVertical} from 'react-icons/hi'
import {CgServer} from 'react-icons/cg'
import {BsServer} from 'react-icons/bs'
import {CiRouter} from 'react-icons/ci'
import {GiFirewall} from 'react-icons/gi'
import {GrStatusUnknown} from 'react-icons/gr'
import {GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, 
  ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, Selection} from '@syncfusion/ej2-react-grids'
import {Header} from '../components';
import {useStateContext} from '../contexts/ContextProvider';
import {useUploadEquipment} from '../services/useUploadEquipment'
import { useNavigate } from "react-router-dom";
import { SpreadsheetComponent, SheetsDirective, SheetDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-spreadsheet';
import { read, utils } from 'xlsx';
import { data } from './../data/DC_HPE';

const Equipment = () => {
  const spreadsheetRef = useRef(null);
  useEffect(() => {
      const fetchData = async () => {
          const response = await fetch(`http://${process.env.REACT_APP_BACKEND_API}:4000/api/downloadHardware`); // fetch the remote url
          const fileBlob = await response.blob(); // convert the excel file to blob
          const file = new File([fileBlob], 'Sample.xlsx'); //convert the blob into file
          let spreadsheet = spreadsheetRef.current;
          spreadsheet?.open({ file }); // open the file into Spreadsheet
      };
      fetchData();
  }, []);

  return (
      <SpreadsheetComponent allowSave={true} saveUrl='https://services.syncfusion.com/react/production/api/spreadsheet/save' height={"90vh"} ref={spreadsheetRef}  openUrl='https://services.syncfusion.com/react/production/api/spreadsheet/open' allowOpen={true}>
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
  );
}
export default Equipment