import { GrLocation } from 'react-icons/gr';
const gridStorageProfile = (props) => (
  <div className="grid gap-2 grid-cols-1 grid-rows-3 divide-y divide-gray-300">
      <p className="">SSD: {props.storage.ssd}</p>
      <p>FC: {props.storage.fc}</p>
      <p>NL: {props.storage.nl}</p>
  </div>
);
const customerGridStatus = (props) => (
  props.state === "POWERED_ON" ? <div>
    <button
    type="button"
    className="text-white py-1 px-2 capitalize rounded-2xl text-md bg-green-400"
  >
    ON
  </button>
  </div> : <div>
  <button
    type="button"
    className="text-white py-1 px-2 capitalize rounded-2xl text-md bg-red-400"
  >
    Off
  </button>
  </div>)

export const vmGrid = [
    { headerText: '  Customer',
      width: '120',
      
      field: 'customer',},
    { field: 'name',
      headerText: '  VM Name',
      width: '120',
      
    },
    { headerText: '  State',
      width: '120',
      template: customerGridStatus,
      field: 'state'
    },
    { field: 'cpu',
      headerText: '  CPU',
      width: '40',
      },
  
    { field: 'ram',
      headerText: '  RAM',
      width: '80',
      textAlign: 'Center' },
    
    { field: 'storage',
      template: gridStorageProfile,
      headerText: '  Storage',
      width: '80',
      },
    { field: 'details',
      headerText: '  Details',
      width: '80',
      },
  ];



const gridVMProfile = (props) => (
    <div className="flex items-center gap-2">
        <p>{props.Name}</p>
    </div>
);

const gridVMCountry = (props) => (
    <div className="flex items-center justify-center gap-2">
        <GrLocation />
        <span>{props.Country}</span>
    </div>
);