import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { MdOutlineAccountCircle  } from "react-icons/md";
const Account = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (

        <div className='flex gap-3 relative'>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-1 px-3 py-2  bg-[#F3F5FB] rounded-4xl font-medium focus:outline-none "
            >
                <div className="group flex gap-1 items-center">
                    <MdOutlineAccountCircle className={`${isOpen ? 'text-[red]' :''} text-[1.55rem] font-bold`} />
                    <p className="text-[1rem]">Hesabim</p>
                </div>
                <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {isOpen && (
                <div className='bg-white rounded-2xl  gap-1 flex justify-between absolute shadow-lg shadow-gray-500/50 font-light -left-50 top-10 z-30 w-xs m-5  p-5'>
                   <Link to='/auth/login'><button className="bg-black py-2 px-3 font-bold text-white rounded-4xl" onClick={() => setIsOpen(!isOpen)}>Daxil ol</button></Link>
                 <Link to='/auth/register'>  <button className="bg-[red] py-2 px-3 font-bold text-white rounded-4xl" onClick={() => setIsOpen(!isOpen)}>Qeydiyyat</button></Link>

                </div>
            )}
        </div>
    )
}

export default Account