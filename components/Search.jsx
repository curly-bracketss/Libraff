import { IoSearchSharp } from "react-icons/io5";
const Search = () => {

    return (
        <div className='relative flex items-center'>
            <input placeholder='Növbəti kitabınızı axtarın' className='rounded-3xl border-2  w-[550px] focus:bg-[#FFFFFF]  border-[#cbd5e1] bg-[#f8fafc] px-3 p-1.5 text-[14px] ' />
            <IoSearchSharp className='absolute right-3  '/>
        </div>
    )
}

export default Search