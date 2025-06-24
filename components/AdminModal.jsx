import { useEffect } from "react";
import toast from "react-hot-toast";
import { postNewBook, editBook } from "../service/BookService";

function AdminModal({ status, setStatus, setData, allData, newBook, setNewBook }) {
   
    function handleInp(e) {
        setNewBook({ ...newBook, [e.target.name]: e.target.value });
    }

    function handlePost() {
        const { title, author, description, price, saleRate, stockCount, soldCount, img } = newBook;

        if (!title || !author || !price || !saleRate || !img) {
            toast.error("Bütün məlumatları doldurun");
            return;
        }

        const payload = {
            ...newBook,
            price: parseInt(price),
            saleRate: parseInt(saleRate),
            stockCount: parseInt(stockCount),
            soldCount: parseInt(soldCount),
        };

        if (status.method === "create") {
            postNewBook(payload)
                .then((res) => {
                    toast.success("Kitab uğurla əlavə edildi");
                    setData([...allData, res]);
                    setStatus({ ...status, show: false });
                })
                .catch(() => {
                    toast.error("Xəta baş verdi");
                });
        } else if (status.method === "edit") {
            editBook(newBook.id, payload)
                .then((res) => {
                    toast.success("Kitab uğurla redaktə edildi");
                    setData(allData.map(book => book.id === res.id ? res : book));
                    setStatus({ ...status, show: false });
                })
                .catch(() => {
                    toast.error("Xəta baş verdi");
                });
        }
    }

    return (
        <div
            id="default-modal"
            tabIndex="-1"
            aria-hidden="true"
            className={`${status.show ? 'flex' : 'hidden'} overflow-y-auto overflow-x-hidden fixed top-0 inset-0 bg-[#000]/50 z-50 justify-center items-center w-full`}
        >
            <div className="relative p-4 w-full max-w-2xl max-h-full">
                <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t border-gray-200 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            {status.method === 'create' ? 'Yeni kitab əlavə et' : 'Kitabı redaktə et'}
                        </h3>
                        <button
                            type="button"
                            onClick={() => setStatus({ ...status, show: false })}
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>

                    <div className="p-4 md:p-5 space-y-4 flex flex-col">
                        <input name='title' value={newBook.title} onChange={handleInp} placeholder="Title" type="text" className="border p-[5px_10px] w-full rounded-lg" />
                        <input name='author' value={newBook.author} onChange={handleInp} placeholder="Author" type="text" className="border p-[5px_10px] w-full rounded-lg" />
                        <input name='description' value={newBook.description} onChange={handleInp} placeholder="Description" type="text" className="border p-[5px_10px] w-full rounded-lg" />
                        <input name='price' value={newBook.price} onChange={handleInp} placeholder="Price" type="number" className="border p-[5px_10px] w-full rounded-lg" />
                        <input name='soldCount' value={newBook.soldCount} onChange={handleInp} placeholder="Sold Count" type="number" className="border p-[5px_10px] w-full rounded-lg" />
                        <input name='stockCount' value={newBook.stockCount} onChange={handleInp} placeholder="Stock Count" type="number" className="border p-[5px_10px] w-full rounded-lg" />
                        <input name='saleRate' value={newBook.saleRate} onChange={handleInp} placeholder="Sale rate" type="number" className="border p-[5px_10px] w-full rounded-lg" />
                        <input name='img' value={newBook.img} onChange={handleInp} placeholder="URL of image" className="border p-[5px_10px] w-full rounded-lg" />
                    </div>

                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                        <button
                            onClick={handlePost}
                            type="button"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            {status.method === 'create' ? 'Əlavə et' : 'Redaktə et'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminModal;
