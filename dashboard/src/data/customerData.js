import {HiOutlineCpuChip} from 'react-icons/hi2'
import {CgSmartphoneRam} from 'react-icons/cg'
import {CiHardDrive} from 'react-icons/ci'
import {FiHardDrive} from 'react-icons/fi'
import {TfiHarddrive} from 'react-icons/tfi'
import {GrVirtualMachine} from 'react-icons/gr'
import {IoDocumentText} from 'react-icons/io5'
import {BsCalendarDate} from 'react-icons/bs'
import {TooltipComponent} from '@syncfusion/ej2-react-popups';
import moment from 'moment';

const gridContractProfile = (props) => {
  if (props.contract){
    if (!props.contract.cpu && !props.contract.ram && !props.contract.ssd && !props.contract.nl && !props.contract.fc){
      return (  
        <div className="text-gray-300">No contract values</div>
      )
    }
    return (
    <div className="grid grid-cols-1 divide-y " >
      <div className="hover:font-extrabold flex justify-between">
        <div className="flex gap-1">
          <a><HiOutlineCpuChip/></a>
          <a>vCPU:</a> 
        </div>
        <a className="">{props.contract.cpu}</a>
      </div>
      <div className="hover:font-extrabold flex justify-between">
        <div className="flex gap-1">
          <a><CgSmartphoneRam/></a>
          <a>RAM:</a> 
        </div>
        <a>{props.contract.ram}</a>
      </div>
      <div className="hover:font-extrabold flex justify-between">
        <div className="flex gap-1">
          <a><TfiHarddrive/></a>
          <a>SSD:</a> 
        </div>
        <a>{props.contract.ssd}</a>
      </div>
      <div className="hover:font-extrabold flex justify-between">
        <div className="flex gap-1">
          <a><FiHardDrive/></a>
          <a>FC:</a> 
        </div>
        <a>{props.contract.fc}</a>
      </div>
      <div className="hover:font-extrabold flex justify-between">
        <div className="flex gap-1">
          <a><CiHardDrive/></a>
          <a>NL:</a> 
        </div>
        <a>{props.contract.nl}</a>
      </div>
      <div className="hover:font-extrabold flex justify-between">
        <div className="flex gap-1">
          <a><GrVirtualMachine/></a>
          <a>VM: </a> 
        </div>
        <a>{props.contract.vm}</a>
      </div>
      
    </div>)
  }
  return <div className="text-gray-300">Not specified</div>
};
const gridUsedProfile = (props) => {
  if (props.used){
    return (
    <div className="grid grid-cols-1 divide-y">
      <div className="hover:font-extrabold flex justify-between">
        <div className="flex gap-1">
          <a><HiOutlineCpuChip/></a>
          <a>vCPU:</a> 
        </div>
        <a className="">{props.used.cpu}</a>
      </div>
      <div className="hover:font-extrabold flex justify-between">
        <div className="flex gap-1">
          <a><CgSmartphoneRam/></a>
          <a>RAM:</a> 
        </div>
        <a>{props.used.ram/1024}</a>
      </div>
      <div className="hover:font-extrabold flex justify-between">
        <div className="flex gap-1">
          <a><TfiHarddrive/></a>
          <a>SSD:</a> 
        </div>
        <a>{props.used.ssd}</a>
      </div>
      <div className="hover:font-extrabold flex justify-between">
        <div className="flex gap-1">
          <a><FiHardDrive/></a>
          <a>FC:</a> 
        </div>
        <a>{props.used.fc}</a>
      </div>
      <div className="hover:font-extrabold flex justify-between">
        <div className="flex gap-1">
          <a><CiHardDrive/></a>
          <a>NL:</a> 
        </div>
        <a>{props.used.nl}</a>
      </div>
      <div className="hover:font-extrabold flex justify-between">
      <div className="flex gap-1">
          <a><GrVirtualMachine/></a>
          <a>VM: </a> 
        </div>
        <a>{props.used.vm}</a>
      </div>
    </div>)
  }
  return <div className="text-gray-300">No such client in vmWare</div>
};
const gridDocumentProfile = (props) => {
  if (props.document){
    return (
      <div className="flex justify-start items-center gap-4">
        <a className=""><IoDocumentText/></a>
        <a className="">{props.document}</a>

      </div>
    )
  }else {
    return (
      <div>
        <a className="text-gray-300">Not specified</a>
      </div>
    )
  }
};

const gridTagsProfile = (props) => {
  if (props.tags){
    const tagArray = props.tags.split(",");
    // {tagArray.map(tag => {
    //   <a key={tagArray.indexOf(tag)}>tag</a>
    // })}
    return (
      <div className="gap-2">
        <div className="grid grid-cols-1 divide-y">{tagArray.map(tag => <a key={tagArray.indexOf(tag)}>{tag}<br/></a>)}</div >
      </div>
    )
  }else {
    return (
      <div>
        <a className="text-gray-300">Not specified</a>
      </div>
    )
  }
};

const gridDateProfile = (props) => {
  if (props.date){
    const formattedDate = moment.utc(props.date).format('MM/DD/YY');
    const fromNow = moment.utc(props.date).fromNow();   
    return (
      <div className="place-content-center">
        <TooltipComponent content={fromNow}
            position={"TopLeft"}
            tabIndex={0} className="">
          <div className="flex gap-1 items-center">
            <a><BsCalendarDate/></a>
            <a>{formattedDate}</a>
          </div>
          </TooltipComponent>
        </div>
    )
  }else {
    return (
      <div>
        <a className="text-gray-300">Not specified</a>
      </div>
    )
  }
};
const gridTypeProfile = (props) => {
  if (props.type) {
    if (props.type.toLowerCase() === "active") {
      return (
      <div className="">
        <button
        type="button"
        className="text-white py-1 px-2 capitalize rounded-2xl text-md bg-green-400">
        Active
        </button>
      </div>)
    }
    if (props.type.toLowerCase() === "inactive") {
      return (
      <div className="">
        <button
        type="button"
        className="text-white py-1 px-2 capitalize rounded-2xl text-md bg-red-400">
        Inactive
        </button>
      </div>)
    }
    if (props.type.toLowerCase() === "reserv") {
      return (
      <div className="">
        <button
        type="button"
        className="text-white py-1 px-2 capitalize rounded-2xl text-md bg-yellow-400">
        Reserv
        </button>
      </div>)
    }
    return ( 
    <div className="">
      <button
      type="button"
      className="text-white py-1 px-2 capitalize rounded-2xl text-md bg-gray-300">
      Unknown
      </button>
    </div>)
  }
  else {
    return (
        <div className="">
          <button
          type="button"
          className="text-white py-1 px-2 capitalize rounded-2xl text-md bg-gray-300">
          Unknown
          </button>
        </div>
    )
  }
  
};
export const customerGrid = [
    { headerText: '  Customer',
      width: '120',
      field: 'client',
      allowEditing: false,
    },
    {
      headerText: '  Project Document Number',
      width: '80',
      field: 'document',
      template: gridDocumentProfile,
    },

    { headerText: '  Status',
      width: '60',
      field: 'type',
      template: gridTypeProfile,
    },
    { headerText: '  Contract Values',
      field: 'contract',   
      width: '100',
      template: gridContractProfile,
      allowEditing: false,
      },
      
    { headerText: '  Used Values',
      field: 'used',
      width: '100',
      template: gridUsedProfile,
      allowEditing: false,
    },
    { headerText: '   Tags',
      field: 'tags',
      template: gridTagsProfile,
      width: '80',
      },
    { field: 'date',
      headerText: '  Dates',
      width: '100',
      template: gridDateProfile,
      },
  ];