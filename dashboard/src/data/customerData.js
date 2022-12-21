import {HiOutlineCpuChip} from 'react-icons/hi2'
import {CgSmartphoneRam} from 'react-icons/cg'
import {CiHardDrive} from 'react-icons/ci'
import {FiHardDrive} from 'react-icons/fi'
import {TfiHarddrive} from 'react-icons/tfi'
import {GrVirtualMachine} from 'react-icons/gr'
import {IoDocumentText} from 'react-icons/io5'
import {BsCalendarDate} from 'react-icons/bs'
const gridContractProfile = (props) => {
  if (props.contract){
    return (
    <div className="grid grid-cols-1 divide-y">
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
    </div>)
  }
  return <div></div>
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
  return <div></div>
};
const gridDocumentProfile = (props) => {
  if (props.document){
    return (
      <div className="flex gap-2">
        <a><IoDocumentText/></a>
        <a>{props.document}</a>
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
    return (
      <div className="flex gap-2">
        <a><BsCalendarDate/></a>
        <a>{props.date}</a>
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
    if (props.type.toLowerCase() === "request") {
      return (
      <div className="">
        <button
        type="button"
        className="text-white py-1 px-2 capitalize rounded-2xl text-md bg-yellow-400">
        Request
        </button>
      </div>)
    }
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
      width: '120',
      field: 'document',
      template: gridDocumentProfile,
    },

    { headerText: '  Status',
      width: '110',
      field: 'type',
      template: gridTypeProfile,
    },
    { headerText: '  Contract Values',
      field: 'contract',   
      width: '60',
      template: gridContractProfile,
      allowEditing: false,
      },
      
    { headerText: '  Used Values',
      field: 'used',
      width: '60',
      template: gridUsedProfile,
      allowEditing: false,
    },
    { headerText: '  Rate',
      field: 'rate',
      //template: gridStorageProfile,
      width: '100',
      },
    { field: 'date',
      //template: gridDetailsProfile,
      headerText: '  Dates',
      width: '100',
      template: gridDateProfile,
      },
  ];