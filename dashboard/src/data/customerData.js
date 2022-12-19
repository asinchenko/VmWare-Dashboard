//client,document, type, contract, used,rate,date
const gridCustomerProfile = (props) => {
  const {column, foreignKeyData, index, ...company} = props;
  return <div className=""><p>{Object.keys(company)[0]}</p></div>
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
      //field: 'customer',
      template: gridCustomerProfile,
    },
    {
      headerText: '  Project Document Number',
      width: '120',
      template: gridDocumentProfile,
    },

    { headerText: '  Type',
      width: '110',
      template: gridTypeProfile,
    },
    { headerText: '  Contract Values',
      field: 'cpu',   
      width: '60',
      },
      
    { headerText: '  Used Values',
      field: 'ram',
      width: '60',},
    
    { headerText: '  Rate',
      field: 'storage',
      //template: gridStorageProfile,
      width: '100',
      },
    { field: 'details',
      //template: gridDetailsProfile,
      headerText: '  Dates',
      width: '100',
      },
  ];