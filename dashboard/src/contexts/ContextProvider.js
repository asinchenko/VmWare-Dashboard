import React, {createContext, useContext, useState} from 'react';

const StateContext = createContext();
const initialState = {
    chat: false,
    cart: false,
    userProfile: false,
    notification: false,
}
export const ContextProvider = ({children}) => {
    const [activeMenu, setActiveMenu] = useState(true);
    const [isClicked, setIsClicked] = useState(initialState);
    const handleClick = (clicked) => {
        setIsClicked({...initialState, [clicked]:true});
    };
    const [screenSize, setScreenSize] = useState(undefined);
    const [currentColor, setCurrentColor] = useState('#03C9D7');
    const [currentMode, setCurrentMode] = useState('Light');
    const setMode = (e) => {
        setCurrentMode(e.target.value);
        localStorage.setItem('themeMode', e.target.value);
        setThemeSettings(false); 
    };
    const setColor = (color) => {
        setCurrentColor(color);
        localStorage.setItem('colorMode', color);
        setThemeSettings(false);
    };
    const [themeSettings, setThemeSettings] = useState(false)


    const [searchLatestVM, setSearchLatestVM] = useState([]);
    const setLatestVM = (vm) => {
            setSearchLatestVM(vm);
            localStorage.setItem('latestVM', vm);
    };
    const [latestTimeUpdate, setlatestTimeUpdate] = useState(0)
    const [resourcesToCustomers, setResourcesToCustomers] = useState({})

    //values in GB
    const [cpuTotalAmount, setCPUTotalAmount] = useState(0)
    const [ramTotalAmount, setRAMTotalAmount] = useState(0)
    const [storageTotalSSDAmount , setStoragaTotalSSDAmount] = useState(0)
    const [storageTotalFCAmount, setStorageTotalFCAmount] = useState(0)
    const [storageTotalNLAmount, setStorageTotalNLAmount] = useState(0)

    const [hardWareDevices, setHardWareDevices] = useState([]);

    const [postImage, setPostImage] = useState({myFile : ""});

    return (
        <StateContext.Provider
        value={{
            activeMenu, setActiveMenu,
            isClicked,  setIsClicked,
            handleClick,
            screenSize, setScreenSize,
            currentColor, currentMode,
            themeSettings, setThemeSettings,
            setMode, setColor,

            searchLatestVM, setSearchLatestVM, setLatestVM,
            latestTimeUpdate, setlatestTimeUpdate,
            resourcesToCustomers, setResourcesToCustomers,

            cpuTotalAmount, setCPUTotalAmount,
            ramTotalAmount, setRAMTotalAmount,
            storageTotalSSDAmount , setStoragaTotalSSDAmount,
            storageTotalFCAmount, setStorageTotalFCAmount,
            storageTotalNLAmount, setStorageTotalNLAmount,

            hardWareDevices, setHardWareDevices,

            postImage, setPostImage
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);