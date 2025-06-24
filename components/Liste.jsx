import { useState } from 'react'
import { IoIosArrowForward } from "react-icons/io";
import { Link } from 'react-router-dom'

function Liste({ show }) {
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
      altCat: ['Roman', 'Gənclər', 'Klassiklər',  'Uşaqlar', 'Hikaye', 'Novel', 'Povest', 'Epopeya', 'Bəstək', 'Uşaq', 'Gənclər', 'Klassiklər', 'Klassik poemalar', 'Esse', 'Drama', 'Fantastika', 'Detektiv', 'Macəra', 'Tarixi roman']
    },
    {
      name: 'Qeyri-bədii ədəbiyyat',
      altCat: ['Bioqrafiya', 'Tarixi əsərlər', 'Elmi-populyar', 'Siyasi ədəbiyyat', 'Psixologiya', 'İqtisadiyyat', 'Sosiologiya', 'Fəlsəfə', 'Araşdırma', 'Motivasiya']
    },
    {
      name: 'Elektronika & aksessuar',
      altCat: [
        { name: 'Elektronika', altCat: ['Telefon', 'Komputer', 'Televizor', 'Planşet', 'Kamera', 'Monitor', 'Smart saat', 'Printer'] },
        { name: 'Aksessuar', altCat: ['Qulaqlıq', 'Şarj cihazı', 'Qoruyucu', 'USB', 'Kabellər', 'Adapter', 'Mouse', 'Klavye'] }
      ]
    },
    {
      name: 'Oyuncaqlar & Oyunlar',
      altCat: [
        { name: 'Oyuncaqlar', altCat: ['Qadınlar', 'Qızlar', 'Uşaqlar', 'Əyləncə', 'Lego', 'Plastik oyuncaq', 'Təhsil oyuncaqları', 'Peluşlar'] },
        { name: 'Oyunlar', altCat: ['Kompyuter', 'Konsol', 'Mobil', 'Cədvəl oyunları', 'Bulmacalar', 'Karta oyunları', 'Strategiya', 'VR oyunları'] }
      ]
    },
    {
      name: 'Dəftərxana',
      altCat: [
        { name: 'Dəftərxana məhsulları', altCat: ['Qələm', 'Silgi', 'Dəftər', 'Xəritə', 'Pozan', 'Kağız', 'Qələmqabı', 'Lenta'] },
        { name: 'Dəftərxana avadanlıqları', altCat: ['Qovluq', 'Marker', 'Əlyazma kağızı', 'Stepler', 'Skotç', 'Qayçı', 'Cızıcı', 'Not kağızı'] }
      ]
    },
    {
      name: 'Hədiyyələr & Hobbi',
      altCat: [
        { name: 'Hədiyyələr', altCat: ['Hədiyye', 'Hədiyyə', 'Qablaşdırma', 'Açıqcalar', 'Bəzək əşyaları', 'Dekor', 'Təqvim', 'Əl işi hədiyyə'] },
        { name: 'Hobbi', altCat: ['Rəsm', 'Əl işləri', 'Musiqi alətləri', 'Maşın modelləri', 'Tikmə', 'Yapışqan sənətləri', 'Modelçilik', 'Fotoqrafiya'] }
      ]
    }
  ];
  const [filteredData, setFilteredData] = useState(data[0]);
  const [selectedSubCategory, setSelectedSubCategory] = useState(data[0].altCat[0]);

  const showAlt = (index) => {
    setFilteredData(data[index]);
    setSelectedSubCategory(data[index].altCat[0]);
  };

  const showSub = (index2) => {
    setSelectedSubCategory(filteredData.altCat[index2]);
  };

  return (
    <div className={`${show ? 'flex items-start' : ''} text-[#0f172a] font-[nunito serif] w-[1320px]`}>
      <div className="flex bg-white h-[60vh] m-1 rounded-2xl w-[1400px]">
 
        <ul className='pt-5 flex flex-col gap-1 w-1/4'>
          {data.map((item, index) => (
            <li key={item.name + index} onMouseOver={() => showAlt(index)}>
              <Link 
                to={`/${item.name.toLowerCase().replace(/\s+/g, '-')}`} 
                className='flex justify-between transition-all text-[13px] font-light group py-1 px-3 items-center hover:bg-gray-200'
              > 
                {item.name}
                <IoIosArrowForward className='group-hover:text-red-600 text-[14px] text-[#9C9C9C]' />
              </Link>
            </li>
          ))}
        </ul>

        {filteredData && (
          <ul className="bg-[#F5F5F7] p-0.5 flex flex-col gap-1 pt-5 w-1/4 overflow-y-scroll">
            {filteredData.altCat.map((altItem, index2) => {
              if (typeof altItem === 'object' && 'name' in altItem) {
                return (
                  <li key={altItem.name + '-' + index2} onMouseOver={() => showSub(index2)}>
                    <Link 
                      to={`/${filteredData.name.toLowerCase().replace(/\s+/g, '-')}/${altItem.name.toLowerCase().replace(/\s+/g, '-')}`} 
                      className='flex justify-between px-3 py-1 text-[13px] items-center hover:bg-white font-light transition-all hover:text-red-600'
                    >
                      {altItem.name}
                      <IoIosArrowForward className='text-[#9C9C9C] text-[14px]' />
                    </Link>
                  </li>
                );
              } else {
                return (
                  <li 
                    key={altItem + '-' + index2} 
                    onMouseOver={() => showSub(index2)} 
                    className='font-light py-2 px-3 transition-all text-[13px] hover:bg-white hover:text-red-600'
                  >
                    <Link to={`/${filteredData.name.toLowerCase().replace(/\s+/g, '-')}/${altItem.toLowerCase().replace(/\s+/g, '-')}`}>
                      {altItem}
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
        )}

        {/* Sub-subcategories */}
        {selectedSubCategory && typeof selectedSubCategory === 'object' && (
          <ul className='p-5 flex flex-col gap-1 w-1/2'>
            {selectedSubCategory.altCat.map((item, i) => (
              <li key={item + '-' + i} className='font-light transition-all text-[13px] hover:text-red-600'>
                <Link to={`/${filteredData.name.toLowerCase().replace(/\s+/g, '-')}/${selectedSubCategory.name.toLowerCase().replace(/\s+/g, '-')}/${item.toLowerCase().replace(/\s+/g, '-')}`}>
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Liste;