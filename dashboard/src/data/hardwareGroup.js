import React from 'react'
import { BsHddFill, BsServer } from 'react-icons/bs'
import { CiRouter } from 'react-icons/ci'
import { FaNetworkWired } from 'react-icons/fa'
import { GiFirewall } from 'react-icons/gi'
import { VscServerEnvironment } from 'react-icons/vsc'

export const hardwareEquipmentData = [
	{
		icon: <VscServerEnvironment />,
		amount: '114',
		title: 'Серверы',
		filter: 'server',
		iconColor: '#03C9D7',
		iconBg: '#E5FAFB',
		pcColor: 'red-600',
	},
	{
		icon: <BsServer />,
		amount: '6',
		title: 'Системы Хранения Данных',
		filter: 'storage',
		iconColor: 'rgb(255, 244, 229)',
		iconBg: 'rgb(254, 201, 15)',
		pcColor: 'green-600',
	},
	{
		icon: <BsHddFill />,
		amount: '488',
		percentage: '1432',
		filter: 'disk',
		title: 'Soft / Hard Диски',
		iconColor: 'rgb(228, 106, 118)',
		iconBg: 'rgb(255, 244, 229)',

		pcColor: 'green-600',
	},
	{
		icon: <CiRouter />,
		amount: '6',
		title: 'Маршрутизаторы',
		filter: 'router',
		iconColor: 'rgb(0, 194, 146)',
		iconBg: 'rgb(235, 250, 242)',
		pcColor: 'red-600',
	},
	{
		icon: <FaNetworkWired />,
		amount: '12',
		title: 'Коммутаторы',
		filter: 'switch',
		iconColor: 'rgb(150, 100, 150)',
		iconBg: 'rgb(230, 223, 255)',
		pcColor: 'red-600',
	},
	{
		icon: <GiFirewall />,
		amount: '3',
		title: 'FireWall',
		filter: 'firewall',
		iconColor: 'rgb(152, 229, 255)',
		iconBg: 'rgb(225, 244, 249)',
		pcColor: 'red-600',
	},
]
