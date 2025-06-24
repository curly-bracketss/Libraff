import React from 'react';
import { Carousel } from 'antd';

const swiperImages = [
  "https://www.libraff.az/images/abt__ut2/banners/all/1305/martin-iden-desktop.webp",
  "https://www.libraff.az/images/abt__ut2/banners/all/1310/3-web-3840x1000_7h5s-r9.webp",
  "https://www.libraff.az/images/abt__ut2/banners/all/1313/Banner_Desktop_v2.webp",
  "https://www.libraff.az/images/abt__ut2/banners/all/1313/Banner_Desktop.webp",
  "https://www.libraff.az/images/abt__ut2/banners/all/1305/Hero-banner-desktop-20_-discount.webp",
  "https://www.libraff.az/images/abt__ut2/banners/all/1310/01-web-3840x1000.webp"
];

const imageStyle = {
  height: '500px',
  objectFit: 'cover',
  width: '100%'
};

function Swiper() {
  return (
    <Carousel autoplay className='custom-carousel'>
      {swiperImages.map((image, index) => (
        <div key={index}>
          <div style={{ paddingBottom: '50px' }}>
            <img style={imageStyle} src={image} alt={`slide-${index}`} />
          </div>
        </div>
      ))}
    </Carousel>
  );
}


export default Swiper;
