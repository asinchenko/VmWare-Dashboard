import React, {useEffect} from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import { Link } from "react-router-dom";
import {RiNotification3Line} from 'react-icons/ri'; 
import {TooltipComponent} from '@syncfusion/ej2-react-popups';
import {Cart, Chat, Notification, UserProfile} from '.';
import {useStateContext} from '../contexts/ContextProvider';
import {useAuthContext} from '../services/useAuthContext'

const NavButton = ({title, customFunc, icon, color, dotColor}) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button type="button" onClick={customFunc} style={{color}}
    className="relative text-xl rounded-full p-3 hover:bg-light-gray">
      <span style={{background:dotColor}} className="absolute inline-flex rounded-full
      h-2 w-2 right-2 top-2"></span>
        {icon}
    </button>
  </TooltipComponent>
)

const Navbar = () => {
  const {user} = useAuthContext();
  const {activeMenu, setActiveMenu, isClicked, setIsClicked,
  handleClick, screenSize, setScreenSize, currentColor} = useStateContext();
  useEffect(()=> {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener
    ('resize', handleResize);
  },[]);
  useEffect(() => {
    if(screenSize <= 900){
      setActiveMenu(false);
    }else if(activeMenu === false){
      //
    }else {
      setActiveMenu(true);
    }
  }, [screenSize])
 if (!user){
  return (
    <div className="flex gap-4">
      <Link to="/login">
        <button 
        color={currentColor}
        >Sign In</button>
      </Link>
      <Link to="/signup">
        <button 
        color={currentColor}
        >Sign Up</button>
      </Link>
    </div>)
 }
  return (
    <div className="flex justify-between mt-2 p-2 md:mx-6 relative">
      <NavButton title="Menu" customFunc={() => 
        setActiveMenu((prevActiveMenu) => 
        !prevActiveMenu)} 
        color={currentColor}  icon={<AiOutlineMenu/>}/>
        {user && (<div className="flex">
          {/* <NavButton 
          title="Cart" 
          customFunc={() => handleClick('cart')} 
          color={currentColor} 
          icon={<FiShoppingCart/>}/>

          <NavButton 
          title="Chat"
          dotColor="#03C9D7" 
          customFunc={() => handleClick('chat')} 
          color={currentColor} 
          icon={<BsChatLeft/>}/>    */}

          <NavButton 
          title="Notifications" 
          customFunc={() => handleClick('notification')} 
          color={currentColor}  
          icon={<RiNotification3Line/>}/>
          <UserProfile/>
          {isClicked.cart && <Cart/>}
          {isClicked.chat && <Chat/>}  
          {isClicked.notification && <Notification/>}  
            
        </div>)}       
    </div>
  )
}

export default Navbar