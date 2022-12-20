//client,document, type, contract, used,rate,date
const gridContractProfile = (props) => {
  if (props.contract){
    return (
    <div className="grid grid-cols-1 divide-y">
      <p className="hover:font-extrabold flex justify-between">
        <a>vCPU:</a> 
        <a className="">{props.contract.cpu}</a>
      </p>
      <p className="hover:font-extrabold flex justify-between">
        <a>RAM:</a>
        <a>{props.contract.ram}</a>
      </p>
      <p className="hover:font-extrabold flex justify-between">
        <a>SSD:</a> 
        <a>{props.contract.ssd}</a>
      </p>
      <p className="hover:font-extrabold flex justify-between">
        <a>FC: </a>
        <a>{props.contract.fc}</a>
      </p>
      <p className="hover:font-extrabold flex justify-between">
        <a>NL: </a>
        <a>{props.contract.nl}</a>
      </p>
    </div>)
  }
  return <div></div>
};
const gridUsedProfile = (props) => {
  if (props.used){
    return (
    <div className="grid grid-cols-1 divide-y">
      <p className="hover:font-extrabold flex justify-between">
        <a>vCPU:</a> 
        <a className="">{props.used.cpu}</a>
      </p>
      <p className="hover:font-extrabold flex justify-between">
        <a>RAM:</a>
        <a>{props.used.ram}</a>
      </p>
      <p className="hover:font-extrabold flex justify-between">
        <a>SSD:</a> 
        <a>{props.used.ssd}</a>
      </p>
      <p className="hover:font-extrabold flex justify-between">
        <a>FC: </a>
        <a>{props.used.fc}</a>
      </p>
      <p className="hover:font-extrabold flex justify-between">
        <a>NL: </a>
        <a>{props.used.nl}</a>
      </p>
      <p className="hover:font-extrabold flex justify-between">
        <a>VM: </a>
        <a>{props.used.vm}</a>
      </p>
    </div>)
  }
  return <div></div>
};
const gridDocumentProfile = (props) => {
  const {column, foreignKeyData, index, ...company} = props;
  let customer = Object.keys(company)[0];
  return <div className=""><p>{company[customer].document}</p></div>
};
const gridTypeProfile = (props) => {
  const {column, foreignKeyData, index, ...company} = props;
  let customer = Object.keys(company)[0];
  return <div className=""><p>{company[customer].document}</p></div>
};
export const customerGrid = [
    { headerText: '  Customer',
      width: '120',
      field: 'client',
    },
    {
      headerText: '  Project Document Number',
      width: '120',
      field: 'document',
    },

    { headerText: '  Type',
      width: '110',
      field: 'type',
    },
    { headerText: '  Contract Values',
      field: 'contract',   
      width: '60',
      template: gridContractProfile,
      },
      
    { headerText: '  Used Values',
      field: 'used',
      width: '60',
      template: gridUsedProfile,
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
      },
  ];