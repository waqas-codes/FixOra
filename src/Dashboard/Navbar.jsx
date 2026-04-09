import { FiSearch } from "react-icons/fi";
import { BsBell } from "react-icons/bs";
import { BsQuestionCircle } from "react-icons/bs";
import { BsPersonCircle } from "react-icons/bs";

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between px-8 py-2 bg-white rounded-md'>
        <div className="flex items-center w-sm gap-2 px-2 bg-gray-200 rounded-2xl">
           <FiSearch /> <input type="text" placeholder='Search operation, workers, tasks' className="py-3 px-8 w-full outline-0"/>
        </div>
        <div className='flex items-center gap-8 py-2'>
            <button className="text-xl hover:text-blue-400 hover:cursor-pointer">
                <BsBell />
            </button>
            <button className="text-xl hover:text-blue-400 hover:cursor-pointer">
                <BsQuestionCircle />
            </button>
            <button className="text-xl hover:text-blue-400 hover:cursor-pointer">
                <BsPersonCircle />
            </button>
        </div>
    </nav>
  )
}

export default Navbar