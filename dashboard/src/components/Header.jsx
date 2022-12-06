import React from 'react'
import {useStateContext} from '../contexts/ContextProvider';
const Header = ({category, date, title, lastUpdate}) => {
  const {latestTimeUpdate} = useStateContext();
  const time = latestTimeUpdate ? new Date(latestTimeUpdate).toUTCString() : "Перезагрузите старницу";
  const headerTime = `${time}`;
  return (
    <div className="mb-10">
      <p className="text-gray-400">
        {category}
      </p>
      <p className="text-gray-400">
        {date}
      </p>
      <p className="text-3xl font-extrabold tracking-tight text-slate-900">
        {title}
      </p>
      {lastUpdate ? 
        <p className="text-gray-400">
          {headerTime}
        </p>
        
      : <div/>}
      
    </div>
  )
}

export default Header