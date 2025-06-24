import { useParams } from 'react-router-dom';
import { FiCopy } from "react-icons/fi";
import { dataCntxt, dataCntxt2 } from '../context/BookContext';
import { useContext, useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaManatSign } from "react-icons/fa6";
import { RiShoppingBag4Line } from "react-icons/ri";
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { FaCircleCheck } from "react-icons/fa6";
import { MdOutlineAnnouncement } from "react-icons/md";
import { getBookByTitle } from '../service/BookService';

const Details = () => {
  const { idofb } = useParams();
  const [obj, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('tesvir');
  const [basketList, setBasket] = useState([]);
  const [favList, setFavList] = useState([]);
  const [isFav, setIsFav] = useState(false);
  const [show, setShow] = useState(false);

  const { allData = [], setData } = useContext(dataCntxt) || {};
  const { data2 = [] } = useContext(dataCntxt2) || {};

  // Load initial data
  useEffect(() => {
    const loadBookData = async () => {
      try {
        setLoading(true);
        setError(null);
        const bookData = await getBookByTitle(idofb);
        setBook(bookData);
      } catch (err) {
        console.error('Error loading book:', err);
        setError('Failed to load book details');
      } finally {
        setLoading(false);
      }
    };

    if (idofb) {
      loadBookData();
    }
  }, [idofb]);

  useEffect(() => {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    setBasket(products);
  }, []);

  useEffect(() => {
    if (!obj) return;
    
    const storedFavList = JSON.parse(localStorage.getItem('favlist')) || [];
    setFavList(storedFavList);
    setIsFav(storedFavList.some(item => item.id === obj.id));
  }, [obj]);

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => setShow(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [show]);

  const addBasket = useCallback((id) => {
    const buyItem = allData.find(item => item.id === id);
    if (!buyItem) return;

    // Update stock in context
    const updatedItem = {
      ...buyItem,
      stockCount: Math.max(0, buyItem.stockCount - 1),
      soldCount: buyItem.soldCount + 1
    };
    
    if (setData) {
      setData(allData.map(item =>
        item.id === updatedItem.id ? updatedItem : item
      ));
    }

    // Add to basket if not already there
    const currentBasketList = JSON.parse(localStorage.getItem('products')) || [];
    const inBasket = currentBasketList.some(item => item.id === id);
    if (inBasket) {
      setShow(true); // Show notification that item is already in basket
      return;
    }

    const newBasketList = [...currentBasketList, buyItem];
    localStorage.setItem('products', JSON.stringify(newBasketList));
    setBasket(newBasketList);
    setShow(true); // Show success notification
  }, [allData, setData]);

  const toggleFavorite = useCallback(() => {
    if (!obj) return;
    
    let updatedList;
    if (isFav) {
      updatedList = favList.filter(item => item.id !== obj.id);
    } else {
      updatedList = [...favList, obj];
    }
    
    localStorage.setItem('favlist', JSON.stringify(updatedList));
    setFavList(updatedList);
    setIsFav(!isFav);
  }, [obj, isFav, favList]);

  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }, []);

  if (loading) {
    return (
      <div className="max-w-[1320px] mx-auto flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#ef3340]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-[1320px] mx-auto flex justify-center items-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Error</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!obj) {
    return (
      <div className="max-w-[1320px] mx-auto flex justify-center items-center h-64">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Book Not Found</h2>
          <p className="text-gray-600">The requested book could not be found.</p>
        </div>
      </div>
    );
  }

  const rey = data2.find(item => item.id === obj.id);
  const inBasket = basketList.some(item => item.id === obj.id);

  return (
    <div className="max-w-[1320px] mx-auto flex flex-col gap-8 px-4 py-6">
      <div className="text-gray-600 text-sm sm:text-base tracking-wide font-light break-words">
        {`Əsas səhifə / Kitab / ${obj.category || ''} / ${obj.altCateg || ''} / ${obj.title}`}
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-[55%] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[60vh] bg-[#F6F6F8] rounded-2xl flex justify-center items-center">
          <img 
            src={obj.img} 
            alt={obj.title} 
            className="object-cover max-h-full rounded-2xl p-4"
            loading="lazy"
          />
        </div>

        <div className="flex flex-col gap-4 w-full lg:w-[45%]">
          <p className="text-sm text-gray-400 flex items-center gap-2">
            Kod: 
            <FiCopy 
              className="cursor-pointer hover:text-gray-600 transition-colors" 
              onClick={() => copyToClipboard(obj.code)} 
              title="Kodu kopyala" 
            />
            {obj.code}
          </p>

          <h2 className="text-xl sm:text-2xl font-semibold mt-2">{obj.title}</h2>

          <Link 
            to={`/author/${obj.author}`} 
            className="text-[#64748b] text-base underline font-light hover:text-[#374151] transition-colors"
          >
            {obj.author}
          </Link>

          <h3 className="text-2xl font-bold flex items-center mt-4 mb-6">
            {obj.price}<FaManatSign />
          </h3>

          <button
            onClick={() => addBasket(obj.id)}
            disabled={obj.stockCount === 0}
            className={`h-12 rounded-full font-semibold relative flex items-center justify-center gap-3 w-full transition-colors ${
              obj.stockCount === 0 
                ? 'bg-gray-400 cursor-not-allowed text-white' 
                : 'bg-[#ef3340] hover:bg-[#d62835] text-white'
            }`}
          >
            <RiShoppingBag4Line />
            {obj.stockCount === 0 ? 'Stokda yoxdur' : 'Səbətə əlavə et'}
            {inBasket && (
              <FaCircleCheck className="text-[#374151] border-2 border-white rounded-full absolute bg-white text-[20px] right-2 -top-2" />
            )}
          </button>

          <div className="flex justify-between items-center flex-wrap text-sm mt-4">
            <p 
              className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" 
              onClick={toggleFavorite}
            >
              {isFav ? 
                <IoMdHeart className="text-red-600 text-lg" /> : 
                <IoMdHeartEmpty className="text-red-600 text-lg" />
              }
              Seçilmiş
            </p>
            <div className="text-[#64748b] flex gap-2 items-center mt-2 sm:mt-0">
              <MdOutlineAnnouncement />
              Sizə necə kömək edə bilərik?
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-center gap-6 flex-wrap w-full mb-4">
          {['tesvir', 'xususiyyet', 'reyler'].map(tab => (
            <h3
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`text-base sm:text-lg cursor-pointer transition-colors pb-2 ${
                activeTab === tab 
                  ? 'text-black border-b-2 border-black' 
                  : 'text-[#767676] hover:text-black'
              }`}
            >
              {tab === 'tesvir' ? 'Təsvir' : tab === 'xususiyyet' ? 'Xüsusiyyəti' : 'İstifadəçi rəyləri'}
            </h3>
          ))}
        </div>
        <hr className="border-gray-200" />
      </div>

      <div className="mt-4">
        {activeTab === 'tesvir' && (
          <div className="p-4">
            <p className="text-[#767676] text-base leading-relaxed">
              {obj.description || 'Təsvir mövcud deyil.'}
            </p>
          </div>
        )}

        {activeTab === 'xususiyyet' && (
          <div className="p-4 space-y-4 max-w-[800px] mx-auto grid sm:grid-cols-2 gap-4">
            {obj.lang && (
              <div className="flex items-end">
                <h2 className="pr-3 text-gray-500">Dil <span className="text-gray-300">..................</span></h2>
                <div className="flex gap-1">
                  {obj.lang.map((lang, index) => (
                    <p key={index} className="text-[#767676] text-sm bg-gray-200 px-2 py-0.5 rounded">{lang}</p>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-end">
              <h2 className="pr-3 text-gray-500">Müəllif <span className="text-gray-300">..................</span></h2>
              <p className="text-sm">{obj.author || 'N/A'}</p>
            </div>
            <div className="flex items-end">
              <h2 className="pr-3 text-gray-500">Nəşriyyat <span className="text-gray-300">..................</span></h2>
              <p className="text-sm">{obj.publisher || 'N/A'}</p>
            </div>
            <div className="flex items-end">
              <h2 className="pr-3 text-gray-500">Səhifə sayı <span className="text-gray-300">..................</span></h2>
              <p className="text-sm">{obj.pageCount || 'N/A'}</p>
            </div>
            <div className="flex items-end">
              <h2 className="pr-3 text-gray-500">Cild <span className="text-gray-300">..................</span></h2>
              <p className="text-sm">{obj.cover || 'N/A'}</p>
            </div>
          </div>
        )}

        {activeTab === 'reyler' && (
          <div className="p-4 space-y-4">
            {rey && rey.comments && rey.comments.length > 0 ? (
              rey.comments.map((comment, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-[#767676] text-base">{comment}</p>
                </div>
              ))
            ) : (
              <p className="text-[#767676] text-base">Hələ ki rəy yoxdur.</p>
            )}
          </div>
        )}
      </div>

      {show && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50">
          {inBasket ? 'Məhsul artıq səbətdədir' : 'Məhsul səbətə əlavə edildi'}
        </div>
      )}
    </div>
  );
};

export default Details;