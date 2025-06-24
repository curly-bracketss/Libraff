import FavBook from './FavBook'
import { dataCntxt } from '../context/BookContext';
import { TbTrashXFilled } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { useContext } from 'react';
const WishList = () => {
    const currentFavlist = JSON.parse(localStorage.getItem('favlist')) || [];
    const { data } = useContext(dataCntxt)
    function emptyFav() {
        localStorage.removeItem("favlist");
    }
    return (

        <div className='max-w-[1320px]  mx-auto flex flex-col gap-5'>
            <p className='text-gray-600 text-[14px] tracking-wider font-light'>Əsas səhifə/Əlavə edilmişlər</p>
            <h2 className='font-bold text-[30px]'>Əlavə edilmişlər</h2>
            <div >
                {

                    currentFavlist.length != 0 ?
                        <div className='grid xl:grid-cols-5 lg:grid-cols-4  md:grid-cols-2 grid-cols-1 '>
                            {currentFavlist.map(item => {

                                return (
                                    <FavBook {...item} key={item.id} data={data} />
                                )

                            })}</div>
                        : (
                            <div className='flex justify-between w-full gap-5'>
                                <div className='bg-[#f6f6f6] w-1/4 p-20 flex items-center justify-center'>Boş</div>
                                <div className='bg-[#f6f6f6] w-1/4 p-20 flex items-center justify-center'>Boş</div>
                                <div className='bg-[#f6f6f6] w-1/4 p-20 flex items-center justify-center'>Boş</div>
                                <div className='bg-[#f6f6f6] w-1/4 p-20 flex items-center justify-center'>Boş</div>
                            </div>
                        )
                }
            </div>
            <div className='bg-[#f6f6f6] p-3 rounded-xl flex justify-between my-10'>
                {currentFavlist.length != 0 ? <button className='border-2 border-[red] w-max p-2 rounded-4xl gap-1 flex items-center' onClick={emptyFav}><TbTrashXFilled /><span className='text-[14px]'>Siyahını sıfırla</span></button> : ''}
                <button className='bg-black w-max py-2 px-3 text-[14px] font-bold rounded-4xl text-white'><Link to='/'>Alış-verişə davam et</Link></button>
            </div>
        </div>
    )
}

export default WishList