import { createContext, useEffect, useState } from "react";
import { getAllBooks, getAllComments } from "../service/BookService";
import Error from "../components/Error";
import Loader from "../components/Loader";

export const dataCntxt = createContext();
export const dataCntxt2 = createContext();

const BookContext = ({ children }) => {
  const [booksLoading, setBooksLoading] = useState(true);
  const [commentsLoading, setCommentsLoading] = useState(true);

  const [allData, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAllBooks()
      .then(item => setData(item))
      .catch(err => setError(err))
      .finally(() => setBooksLoading(false));
  }, []);

  useEffect(() => {
    getAllComments()
      .then(item => setData2(item))
      .catch(err => setError(err))
      .finally(() => setCommentsLoading(false));
  }, []);

  if (booksLoading || commentsLoading) return <Loader />;
  if (error) return <Error err={error} />;

  return (
    <dataCntxt.Provider value={{ allData,setData }}>
      <dataCntxt2.Provider value={{ data2 }}>
        {children}
      </dataCntxt2.Provider>
    </dataCntxt.Provider>
  );
};

export default BookContext;
