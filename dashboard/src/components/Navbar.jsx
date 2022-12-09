import React, {useEffect} from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import {FiShoppingCart} from 'react-icons/fi';
import { Link } from "react-router-dom";
import {BsChatLeft} from 'react-icons/bs';
import {RiNotification3Line} from 'react-icons/ri'; 
import {MdKeyboardArrowDown} from 'react-icons/md';
import {TooltipComponent} from '@syncfusion/ej2-react-popups';
import avatar from '../data/avatar.jpg';
import {Cart, Chat, Notification, UserProfile} from '.';
import {useStateContext} from '../contexts/ContextProvider';
import {useLogout} from '../services/useLogout'

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
  const {logout} = useLogout();
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

  return (
    <div className="flex justify-between mt-2 p-2 md:mx-6 relative">
      <NavButton title="Menu" customFunc={() => 
        setActiveMenu((prevActiveMenu) => 
        !prevActiveMenu)} 
        color={currentColor}  icon={<AiOutlineMenu/>}/>
        <div className="flex">
          <Link to="/login">
            <NavButton 
            title="Sign In"
            color={currentColor}
            />
          </Link>
          <Link to="/signup">
            <NavButton 
            title="Sign Up"
            color={currentColor}
            />
          </Link>
          <NavButton 
          title="Cart" 
          customFunc={() => handleClick('cart')} 
          color={currentColor} 
          icon={<FiShoppingCart/>}/>

          <NavButton 
          title="Chat"
          dotColor="#03C9D7" 
          customFunc={() => handleClick('chat')} 
          color={currentColor} 
          icon={<BsChatLeft/>}/>   

          <NavButton 
          title="Notifications" 
          customFunc={() => handleClick('notification')} 
          color={currentColor}  
          icon={<RiNotification3Line/>}/>
          <TooltipComponent content="Profile" position="BottomCenter">
            <div className="flex items-center gap-2 
            cursor-pointer p-1 hover:bg-light-gray 
            rounded-1g"
            onClick={()=> handleClick('userProfile')}>
              <img src={avatar} className="rounded-full w-8 h-8"/>
              <p>
                <span className="text-gray-400 text-14">Hi, </span> {' '}
                <span className="text-gray-400 font-bold ml-1 text-4">Michael</span>
              </p>
              <MdKeyboardArrowDown className="text-gray-400 text-14"/>
            </div>
          </TooltipComponent>
          <div><button onClick={logout}>Logout</button></div>
          {isClicked.cart && <Cart/>}
          {isClicked.chat && <Chat/>}  
          {isClicked.notification && <Notification/>}  
          {isClicked.userProfile && <UserProfile/>}     
        </div>
    </div>
  )
}

export default Navbar