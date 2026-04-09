import logo from '../assets/logo.png'
import { MdDashboard } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { IoIosSettings } from "react-icons/io";
import { MdOutlineMiscellaneousServices } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsCashStack } from "react-icons/bs";

import Button from './Button';
import { useRef } from 'react';
const Sidebar = () => {
    // const {color} = useRef("white")
    return (
        <div className='h-screen w-3/14 flex flex-col items-center py-5 px-4 gap-12'>
            <div className='flex flex-col items-center gap-2'>
                <img src={logo} width={100} alt="" />
                <h1 className='text-gray-600 text-sm font-semibold'>SERVICES MANAGEMENT</h1>
            </div>
            <div className='flex flex-col gap-3'>
                <Button dashoborIcon={MdDashboard} name="Dashboard" />
                <Button dashoborIcon={TbBrandBooking} name="Booking" />
                <Button dashoborIcon={MdOutlineMiscellaneousServices} name="Service provider" />
                <Button dashoborIcon={BsCashStack} name="Revenue" />
                <Button dashoborIcon={FaUsers} name="Clients" />
                <Button dashoborIcon={IoIosSettings} name="Setting" />
            </div>
        </div>
    )
}

export default Sidebar