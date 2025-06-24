
import {AxiosInstance} from './AxiosInstance';

export async function getAllBooks() {
    try {
        const res = await AxiosInstance.get('/books');
        return res.data;
    } catch (err) {
        console.error('Error fetching books:', err);
        throw err;
    }
}
export async function getBookByTitle(id) {
    try {
        const res = await AxiosInstance.get(`/books/${id}`);
        console.log(res)
        return res.data;
    } catch (err) {
        console.error('Error fetching books:', err);
        throw err;
    }
    
}

export async function deleteBooksById(id) {
    try {
        const res = await AxiosInstance.delete(`/books/${id}`);
        return res.data;
    } catch (err) {
        console.error('Error deleting book:', err);
        throw err;
    }
}

export async function getAllComments() {
    try {
        const res = await AxiosInstance.get('/comments');
        return res.data;
    } catch (err) {
        console.error('Error fetching comments:', err);
        throw err;
    }
}

export async function postNewBook(newBook) {
    try {
        const res = await AxiosInstance.post('/books', newBook);
        return res.data;
    } catch (err) {
        console.error('Error adding book:', err);
        throw err;
    }
}

export async function editBook(id, updatedBook) {
    try {
        const res = await AxiosInstance.patch(`/books/${id}`, updatedBook);
        return res.data;
    } catch (err) {
        console.error('Error updating book:', err);
        throw err;
    }
}


