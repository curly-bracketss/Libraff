import React, { useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import Book from './Book.jsx';
import { dataCntxt } from '../context/BookContext.jsx';

const Section = () => {
  const { allData } = useContext(dataCntxt);
  const { sec, cat, id } = useParams();

  const data = [
    {
      name: 'Kitab',
      altCat: [
        { name: 'Fikir', altCat: ['Felsefe', 'Psikoloji', 'Sosiologiya', 'Etika', 'Metafizika', 'Epistemologiya'] },
        { name: 'Hikaye', altCat: ['Roman', 'Masal', 'Qisa Hekayələr', 'Əfsanələr', 'Nağıl'] },
        { name: 'Siyaset', altCat: ['Siyaset', 'Geosiyasət', 'Demokratiya', 'İdeologiyalar', 'Siyasi nəzəriyyələr', 'Seçki'] },
        { name: 'Tarih', altCat: ['Tarih', 'Antik Çağ', 'Orta Çağ', 'Müasir dövr', 'Azərbaycan tarixi', 'İslam tarixi'] },
        { name: 'Bilim', altCat: ['Bilim', 'Fizika', 'Kimya', 'Biologiya', 'Astronomiya', 'Riyaziyyat'] },
        { name: 'Edebiyat', altCat: ['Edebiyat', 'Şeir', 'Dram', 'Satira', 'Nəsr', 'Poema'] }
      ]
    },
    {
      name: 'Detektiv',
      altCat: ['Uşaq', 'Klassiklər', 'Müasir']
    },
    {
      name: 'Bədii ədəbiyyat',
      altCat: ['Roman', 'Gənclər', 'Klassiklər', 'Uşaqlar', 'Hikaye', 'Novel', 'Povest', 'Epopeya', 'Bəstək', 'Uşaq', 'Gənclər', 'Klassiklər', 'Klassik poemalar', 'Esse', 'Drama', 'Fantastika', 'Detektiv', 'Macəra', 'Tarixi roman']
    },
    {
      name: 'Qeyri-bədii ədəbiyyat',
      altCat: ['Bioqrafiya', 'Tarixi əsərlər', 'Elmi-populyar', 'Siyasi ədəbiyyat', 'Psixologiya', 'İqtisadiyyat', 'Sosiologiya', 'Fəlsəfə', 'Araşdırma', 'Motivasiya']
    }
  ];

  const normalizeUrl = (str) => str.toLowerCase().replace(/\s+/g, '-');

  const category = data.find(item => normalizeUrl(item.name) === sec);
  if (!category) return <div className='p-4'>Category not found</div>;

  const subCategory = cat ? category.altCat.find(item =>
    normalizeUrl(typeof item === 'object' ? item.name : item) === cat
  ) : null;

  let filteredBooks = [];

  if (allData) {
    if (id && subCategory && typeof subCategory === 'object') {
      const targetCategory = subCategory.altCat.find(sub => normalizeUrl(sub) === id);
      filteredBooks = allData.filter(book => book.altCateg === targetCategory);
    } else if (cat) {
      const categoryName = typeof subCategory === 'object' ? subCategory.name : subCategory;
      filteredBooks = allData.filter(book => book.altCateg === categoryName);
    } else {
      filteredBooks = allData.filter(book => book.category === category.name);
    }
  }
  console.log(filteredBooks)
  return (
    <div className='flex justify-between mx-auto max-w-[1320px] py-5'>
      <div className='flex flex-col gap-5'>
        <div>
          <h2 className='text-3xl font-medium mb-2'>Kitablar</h2>
          <div className='text-[#767676] text-[14px]'>
            <Link to='/'>Əsas səhifə / </Link>
            <Link to={`/${sec}`}>{category.name}</Link>
            {cat && (
              <Link to={`/${sec}/${cat}`}>
                / {subCategory?.name || subCategory}
              </Link>
            )}
            {id && subCategory && typeof subCategory === 'object' && (
              <Link to={`/${sec}/${cat}/${id}`}>
                / {subCategory.altCat.find(sub => normalizeUrl(sub) === id)}
              </Link>
            )}
          </div>
        </div>

        <div className='flex flex-col gap-2 p-2 w-[250px] border border-gray-200 rounded-2xl'>
          <h3 className='text-md font-medium mb-2'>Kateqoriyalar</h3>
          <h4 className='text-md font-medium mb-2'>
            <Link to={`/${normalizeUrl(category.name)}`}>{category.name}</Link>
          </h4>

          {category.altCat.map((item, index) => {
            const itemName = typeof item === 'object' ? item.name : item;
            const itemSlug = normalizeUrl(itemName);
            const isActive = itemSlug === cat;

            return (
              <div key={index} className='flex flex-col'>
                <Link
                  to={`/${normalizeUrl(category.name)}/${itemSlug}`}
                  className={`pl-4 py-1 text-sm border-l-4 ${isActive
                    ? 'border-red-500 font-medium'
                    : 'border-transparent text-gray-700 hover:bg-gray-100 hover:text-red-600 rounded-xl'
                  }`}
                >
                  {itemName}
                </Link>

                {isActive && typeof item === 'object' && item.altCat && (
                  <div className='ml-6 mt-1 flex flex-col gap-1'>
                    {item.altCat.map((subItem, subIndex) => {
                      const isSubActive = normalizeUrl(subItem) === id;
                      return (
                        <Link
                          key={subIndex}
                          to={`/${normalizeUrl(category.name)}/${itemSlug}/${normalizeUrl(subItem)}`}
                          className={`pl-4 py-1 text-sm border-l-2 ${isSubActive
                            ? 'border-red-500 text-red-600 font-medium'
                            : 'border-transparent text-gray-600 hover:text-red-600 hover:bg-gray-50 rounded-xl'
                          }`}
                        >
                          {subItem}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className='flex-1 grid grid-cols-3 gap-6 p-4'>
        {filteredBooks.length > 0 ? (
          filteredBooks.map(book => (
            <Book key={book.id} {...book} data={allData} />
          ))
        ) : (
          <div className='col-span-3 text-center py-8 text-gray-500'>
            Bu kateqoriyada hələ kitab yoxdur
          </div>
        )}
      </div>
    </div>
  );
};

export default Section;