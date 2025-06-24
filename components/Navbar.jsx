import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/libraff.png';
import { Catalog } from './Catalog';
import Search from './Search';
import { FaRegHeart } from "react-icons/fa6";
import { RiShoppingBag4Line } from "react-icons/ri";
import { ChevronDown } from "lucide-react";
const Navbar = () => {
  const productCount = (JSON.parse(localStorage.getItem('products')) || []).length;
  const favCount = (JSON.parse(localStorage.getItem('favlist')) || []).length;
  const [selectedLanguage, setSelectedLanguage] = useState('AZ');
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    setIsOpen(false);
  };

  const openCart = () => {
  };

  return (
    <nav className='hidden md:flex md:flex-col md:items-center gap-10 max-w-[1320px] relative mx-auto py-10 px-4 sm:px-6 lg:px-8'>
      <div className=' md:flex md:flex-row items-center md:justify-between gap-6 sm:gap-30 w-full'>
        <Link to="/">
          <div className="w-[120px] sm:w-[140px] md:w-[160px] lg:w-[180px] xl:w-[200px]">
            <img src={logo} alt="Logo" className="w-full h-auto object-contain" />
          </div>

        </Link>
        <div className='flex items-center gap-3'>
          <Catalog />
          <Search />
        </div>

        <div className='flex gap-3 relative'>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 px-3 py-2 text-sm text-gray-700 bg-white rounded focus:outline-none font-light"
          >
            <span>{selectedLanguage}</span>
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isOpen && (
            <div className='bg-white rounded-2xl p-1.5 text-[red] flex flex-col gap-1 absolute shadow-lg shadow-gray-500/50 font-light left-0 top-10 z-30'>
              <span
                onClick={() => handleLanguageChange('AZ')}
                className='hover:bg-gray-300 hover:text-black rounded-xl px-2 py-1 cursor-pointer'
              >
                AZ
              </span>
              <span
                onClick={() => handleLanguageChange('RU')}
                className='hover:bg-gray-300 hover:text-black rounded-xl px-2 py-1 cursor-pointer'
              >
                RU
              </span>
            </div>
          )}

          <div className='relative'>
            <Link to='/wishlist-view'><FaRegHeart className='font-extrabold text-[24px] sm:text-[28px]' /></Link>
            <p className='bg-[red] rounded-full absolute -top-1 -right-2 min-w-5 w-max h-5 text-sm leading-5 text-white border-2 border-white flex items-center justify-center'>{favCount}</p>
          </div>
          <div className='relative'>
            <RiShoppingBag4Line className='font-extrabold text-[24px] sm:text-[28px]' onClick={openCart} />
            <p className='bg-[red] rounded-full absolute -top-1 -right-2 min-w-5 w-max h-5 text-sm leading-5 text-white border-2 border-white flex items-center justify-center'>{productCount}</p>
          </div>
        </div>
      </div>
      <div className='flex flex-wrap justify-center sm:justify-between w-full gap-3 mt-6'>
        <div className='flex flex-wrap justify-center sm:justify-start gap-3 text-[#334155] font-medium text-[15px]'>
          <Link to='/bestseller-may'>Bestseller – May</Link>
          <Link to='/endirimler'>Endirimlər</Link>
          <Link to='/muellifler'>Müəlliflər</Link>
          <Link to='/detektiv'>Detektiv</Link>
        </div>
        <div className='flex flex-wrap justify-center sm:justify-end gap-3 text-[#334155] font-light text-[15px]'>
          <Link to='/odenis-ve-catdirilma'>Ödəniş və çatdırılma</Link>
          <Link to='/loyalty-card'>Loyallıq Kartı</Link>
          <Link to='/faq-az'>FAQ</Link>
          <Link to='/biziml-laq'>Əlaqə</Link>
        </div>
      </div>
    </nav>

  );
};

export default Navbar;
