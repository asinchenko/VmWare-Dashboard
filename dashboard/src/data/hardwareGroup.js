import React from 'react';
import { BsHddFill} from 'react-icons/bs';
import { BsServer} from 'react-icons/bs';
import { VscServerEnvironment } from 'react-icons/vsc';
import { CiRouter } from 'react-icons/ci';
import { FaNetworkWired } from 'react-icons/fa';
import { GiFirewall } from 'react-icons/gi';


export const hardwareEquipmentData = [
    {
      icon: <VscServerEnvironment />,
      amount: '16',
      title: 'Серверы',
      filter: 'server',
      iconColor: '#03C9D7',
      iconBg: '#E5FAFB',
      pcColor: 'red-600',
    },
    {
      icon: <BsServer />,
      amount: '1',
      title: 'Системы Хранения Данных',
      filter: 'storage',
      iconColor: 'rgb(255, 244, 229)',
      iconBg: 'rgb(254, 201, 15)',
      pcColor: 'green-600',
    },
    {
      icon: <BsHddFill />,
      amount: '53',
      percentage: '48',
      filter: 'disk',
      title: 'Soft / Hard Диски',
      iconColor: 'rgb(228, 106, 118)',
      iconBg: 'rgb(255, 244, 229)',
  
      pcColor: 'green-600',
    },
    {
      icon: <CiRouter />,
      amount: '2',
      title: 'Маршрутизаторы',
      filter: 'router',
      iconColor: 'rgb(0, 194, 146)',
      iconBg: 'rgb(235, 250, 242)',
      pcColor: 'red-600',
    },
    {
        icon: <FaNetworkWired />,
        amount: '7',
        title: 'Коммутаторы',
        filter: 'switch',
        iconColor: 'rgb(150, 100, 150)',
        iconBg: 'rgb(230, 223, 255)',
        pcColor: 'red-600',
      },
      {
        icon: <GiFirewall />,
        amount: '1',
        title: 'FireWall',
        filter: 'firewall',
        iconColor: 'rgb(152, 229, 255)',
        iconBg: 'rgb(225, 244, 249)',
        pcColor: 'red-600',
      },
  ];