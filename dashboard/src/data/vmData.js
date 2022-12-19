
const gridStorageProfile = (props) => (
  <div className="grid gap-2 grid-cols-1 grid-rows-3 divide-y divide-gray-300">
      <p className="">SSD: {props.storage.ssd}</p>
      <p>FC: {props.storage.fc}</p>
      <p>NL: {props.storage.nl}</p>
  </div>
);
const gridDetailsProfile = (props) => (
  <div className="">
      <p className="">{props.details.value.guest_OS}</p>
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
      width: '110',
      template: customerGridStatus,
      field: 'state'
    },
    { field: 'cpu',
      headerText: '  CPU',
      width: '60',
      },
  
    { field: 'ram',
      headerText: '  RAM',
      width: '60',},
    
    { field: 'storage',
      template: gridStorageProfile,
      headerText: '  Storage',
      width: '100',
      },
    { field: 'details',
      template: gridDetailsProfile,
      headerText: '  Details',
      width: '100',
      },
  ];



