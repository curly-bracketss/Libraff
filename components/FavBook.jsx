import React, { useEffect, useState } from 'react';
import { FaManatSign } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";

const FavBook = ({ title, img, price, saleRate, id}) => {
    const discountedPrice = (price * (1 - saleRate / 100)).toFixed(2);
   const [favlist, setFav] = useState([]);

    useEffect(() => {
        const fav = JSON.parse(localStorage.getItem('favlist')) || [];
        setFav(fav);
    }, []);

    function handleRemove(id) {
        const currentFavlist = JSON.parse(localStorage.getItem('favlist')) || [];
        const newFavlist = currentFavlist.filter(item => item.id !== id);
        
        localStorage.setItem('favlist', JSON.stringify(newFavlist));
        setFav(newFavlist);
    }
    return (
        <article className="hover:shadow-2xl group rounded-xl p-5 relative">
            <div className="absolute top-2 right-2 text-xl cursor-pointer">
                <IoClose className='text-[red]  group-hover:block hidden border-2 border[red] rounded-[50%] bg-transparent' onClick={() => handleRemove(id)}/>
            </div>

            <Link to={`/${title}`} className='bg-gray-200 rounded-xl w-full h-[300px] block overflow-hidden'>
                <img src={img} alt="book" className="object-cover h-full w-full rounded-xl" />
            </Link>

            <h4 className='pt-3 text-[14px] h-[50px]'>{title}</h4>

            <div className="flex gap-2 items-center">
                <span className='flex items-center'>
                    <h3 className='font-medium text-[18px]'>{saleRate === 0 ? price : discountedPrice}</h3>
                    <FaManatSign />
                </span>

                {saleRate > 0 && (
                    <span className='text-gray-500 flex items-center line-through text-[14px] font-light'>
                        {price}<FaManatSign />
                    </span>
                )}
            </div>
        </article>
    );
};

export default FavBook;