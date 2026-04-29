import Navbar from './Navbar'
import { useState } from 'react';
import { BsCalendarEvent, BsChevronDown  } from "react-icons/bs";
import DatePicker from "react-datepicker";
import Card from './Card'
const Main = () => {
    const [date, setDate] = useState(new Date());

    return (
        <div className='w-full h-screen'>
            <Navbar />
            <div className='p-4'>
                <h1 className='text-4xl font-bold mb-1'>Dashboard</h1>
                <div className='flex justify-between pr-4'>
                    <p className='text-gray-600'>Real-time performance metrics for peshawar central hub.</p>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full w-fit cursor-pointer border border-gray-200">

                        <BsCalendarEvent className="text-gray-600 text-[16px]" />

                        {/* Date Text */}
                        <DatePicker
                            selected={date}
                            onChange={(d) => setDate(d)}
                            dateFormat="dd MMM yyyy"
                            className="bg-transparent outline-none text-sm font-medium text-gray-700 cursor-pointer w-[110px]"
                        />

                        {/* Arrow */}
                        <BsChevronDown className="text-gray-500 text-[12px]" />
                    </div>
                </div>
                <div className='flex justify-between flex-wrap my-4'>
                    <Card />
                    <Card />
                    <Card />
                    <Card />
                </div>
            </div>
        </div>
    )
}

export default Main