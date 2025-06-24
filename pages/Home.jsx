import { useContext } from 'react';
import Book from '../components/Book.jsx';
import Swiper from '../components/Swiper.jsx';
import { dataCntxt } from '../context/BookContext.jsx';

const Home = () => {
  const { allData } = useContext(dataCntxt);

  return (
    <div>
      <Swiper />
      <div className="grid gap-6
                      grid-cols-1
                      sm:grid-cols-2
                      md:grid-cols-3
                      lg:grid-cols-4
                      xl:grid-cols-5
                      max-w-[1320px]
                      mx-auto
                      my-10">
        {Array.isArray(allData) && allData.length > 0 && allData.map(item => (
          <Book key={item.id} {...item} data={allData} />
        ))}
      </div>
    </div>
  );
};

export default Home;