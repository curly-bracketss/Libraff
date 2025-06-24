import { useContext, useState } from "react";
import { dataCntxt } from "../context/BookContext";
import { FaManatSign } from "react-icons/fa6";
import { deleteBooksById } from "../service/BookService";
import AdminModal from "./AdminModal";
import toast from 'react-hot-toast';

export default function AdminPanel() {
    const { allData, setData } = useContext(dataCntxt);
    const [status, setStatus] = useState({
        show: false,
        method: 'create'
    });

    const [newBook, setNewBook] = useState({
        title: "",
        author: "",
        price: "",
        saleRate: "",
        img: "",
        soldCount: "",
        stockCount: "",
        description: ""
    });

    function handleDelete(id) {
        setData(allData.filter(item => item.id !== id));
        deleteBooksById(id)
            .then(() => {
                toast.success('Book is deleted successfully');
            })
            .catch(err => toast.error('Error deleting book'));
    }

    function handleEdit(book) {
        setNewBook(book); // fill form with book info
        setStatus({
            show: true,
            method: 'edit',
            book: book
        });
    }

    return (
        <div className="max-w-[1300px] mx-auto p-4">
            <AdminModal
                status={status}
                setStatus={setStatus}
                setData={setData}
                allData={allData}
                newBook={newBook}
                setNewBook={setNewBook}
            />

            <div className="flex justify-end mb-4">
                <button
                    onClick={() => {
                        setNewBook({
                            title: "",
                            author: "",
                            price: "",
                            saleRate: "",
                            img: "",
                            soldCount: "",
                            stockCount: "",
                            description: ""
                        });
                        setStatus({ show: true, method: "create" });
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                    + Yeni Kitab Əlavə Et
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm border">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-2 border">Şəkil</th>
                            <th className="p-2 border">Şəkil URL</th>
                            <th className="p-2 border">Başlıq</th>
                            <th className="p-2 border">Müəllif</th>
                            <th className="p-2 border">Qiymət</th>
                            <th className="p-2 border">Satış</th>
                            <th className="p-2 border">Endirim (%)</th>
                            <th className="p-2 border">Stok</th>
                            <th className="p-2 border">Əməliyyat</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(allData) && allData.length > 0 && allData.map((book) => (
                            <tr key={book.id} className="text-center border-b hover:bg-gray-50">
                                <td className="p-2 border">
                                    <img
                                        src={book.img}
                                        alt={book.title}
                                        className="h-12 w-12 object-cover mx-auto rounded"
                                    />
                                </td>
                                <td className="p-2 border text-blue-600 break-all max-w-[200px]">
                                    {book.img}
                                </td>
                                <td className="p-2 border">{book.title}</td>
                                <td className="p-2 border">{book.author}</td>
                                <td className="flex items-center h-12 justify-center pt-4">{book.price} <FaManatSign /></td>
                                <td className="p-2 border">{book.soldCount}</td>
                                <td className="p-2 border">{book.saleRate}%</td>
                                <td className="p-2 border">{book.stockCount}</td>
                                <td className="p-2 border space-x-2">
                                    <button
                                        onClick={() => handleEdit(book)}
                                        className="bg-yellow-400 px-2 py-1 text-xs rounded hover:bg-yellow-500"
                                    >
                                        Redaktə Et
                                    </button>
                                    <button
                                        onClick={() => handleDelete(book.id)}
                                        className="bg-red-500 px-2 py-1 text-xs text-white rounded hover:bg-red-600"
                                    >
                                        Sil
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
