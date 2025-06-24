import React, { useEffect, useState } from 'react';
import { FaManatSign } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const Book = ({ title, img, price, saleRate, data, id }) => {
	const discountedPrice = (price * (1 - saleRate / 100)).toFixed(2);

	const [favlist, setFav] = useState([]);
	const [show, setShow] = useState(false);

	useEffect(() => {
		const fav = JSON.parse(localStorage.getItem('favlist')) || [];
		setFav(fav);
	}, []);

	useEffect(() => {
		if (show) {
			const timer = setTimeout(() => setShow(false), 4000);
			return () => clearTimeout(timer);
		}
	}, [show]);

	function handleFav(id) {
		const favItem = data.find(item => item.id === id);
		if (!favItem) return;

		const currentFavlist = JSON.parse(localStorage.getItem('favlist')) || [];
		const isFav = currentFavlist.some(item => item.id === id);

		let newFavlist;
		if (isFav) {
			newFavlist = currentFavlist.filter(item => item.id !== id);
		} else {
			newFavlist = [...currentFavlist, favItem];
			setShow(true);
		}
		localStorage.setItem('favlist', JSON.stringify(newFavlist));
		setFav(newFavlist);
	}

	const getCurrentFavlist = () => {
		return JSON.parse(localStorage.getItem('favlist')) || [];
	};

	const isFav = getCurrentFavlist().some(item => item.id === id);

	return (
		<article className="hover:shadow-2xl group rounded-xl p-5 sm:p-5 relative w-full max-w-[92vw] sm:max-w-[240px] md:max-w-[280px] lg:max-w-[300px]">
			<div className="absolute top-1 right-1 text-[#9999] text-xl sm:text-2xl cursor-pointer z-10">
				{isFav ? (
					<IoMdHeart onClick={() => handleFav(id)} className="text-[red]" />
				) : (
					<IoMdHeartEmpty onClick={() => handleFav(id)} className="group-hover:block hidden hover:text-[red]" />
				)}
			</div>
			{show && (
				<>
					<div className="fixed inset-0 bg-black opacity-50 z-30 pointer-events-none" />
					<div className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 w-[95vw] max-w-[600px] rounded-lg bg-gray-100 shadow-lg flex flex-col items-center text-center overflow-hidden">
						<div className="flex flex-col sm:flex-row p-4 justify-between items-start sm:items-center w-full">
							<h3 className="text-sm sm:text-base">Məhsul seçilmişlər siyahısına əlavə edildi</h3>
							<IoClose onClick={() => setShow(false)} className="cursor-pointer text-lg mt-2 sm:mt-0 sm:ml-auto" />
						</div>
						<div className="flex justify-between items-center bg-white w-full p-4 gap-4 flex-wrap sm:flex-nowrap">
							<div className="flex items-center gap-3">
								<img src={img} alt="Book" className="h-14 sm:h-20 object-cover rounded-md" />
								<p className="text-[red] text-sm sm:text-base max-w-[60vw] truncate">{title}</p>
							</div>
							<p className="flex items-center text-sm sm:text-base">{discountedPrice}<FaManatSign /></p>
						</div>
						<hr className="w-full" />
						<div className="p-4 w-full text-center">
							<Link to="/wishlist-view" className="inline-block bg-black px-4 py-2 sm:px-5 sm:py-3 rounded-full text-white text-[10px] sm:text-[12px] font-bold">
								Seçilmiş məhsulların siyahısına baxın
							</Link>
						</div>
					</div>
				</>
			)}

			<Link to={`/book/${id}`} className="bg-gray-200 rounded-xl w-full min-h-[250px] sm:h-[300px] block overflow-hidden">
				<img src={img} alt="book" className="object-cover h-full w-full rounded-xl" />
			</Link>
			<h4 className="pt-3 text-xs sm:text-sm md:text-base min-h-[50px] line-clamp-2">{title}</h4>
			<div className="flex gap-2 items-center mt-1">
				<span className="flex items-center">
					<h3 className="font-medium text-sm sm:text-base">{saleRate === 0 ? price : discountedPrice}</h3>
					<FaManatSign />
				</span>

				{saleRate > 0 && (
					<span className="text-gray-500 flex items-center line-through text-xs sm:text-sm font-light">
						{price}<FaManatSign />
					</span>
				)}
			</div>
		</article>

	);
};

export default Book;
