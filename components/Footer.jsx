import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <div className=" bg-[#f6f6f6] ">
      <div className=" max-w-[1320px] mx-auto flex flex-col text-[#454444]">
        <div className="flex justify-between py-10 ">
          <div className="flex flex-col gap-3 ">
            <h2>Hesabım</h2>
            <ul className="text-[14px] font-light">
              <li><Link>Daxil ol</Link></li>
              <li><Link>Qeydiyyatdan keç</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 ">
            <h2>Şirkət</h2>
            <ul className="text-[14px] font-light">
              <li><Link>Haqqımızda</Link></li>
              <li><Link>Əlaqə</Link></li>
              <li><Link>Vakansiyalar</Link></li>
              <li><Link>Sayt Xəritəsi</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 ">
            <h2>Müştəri Xidməti</h2>
            <ul className="text-[14px] font-light ">
              <li><Link>Dəyişdirilmə və qaytarılma</Link></li>
              <li><Link>Ödəniş və çatdırırlma</Link></li>
              <li><Link>Sifarişiniz haqqında</Link></li>
              <li><Link>Seçilmişlər</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 ">
            <h2>Əlaqə</h2>
            <ul className="text-[14px] font-light">
              <li>Bakı, Badamdar qəs., Mikayıl Müşfiq küç. 1c (Badamdar Estates)</li>
              <li>+994-50-290-44-96</li>
              <li>B.e.-B. 9.00 - 18.00</li>
              <li className='underline'><Link>online@libraff.az</Link></li>
              <li className='underline'><Link>Xəritədə bax</Link></li>
            </ul>
          </div>
        </div>
        <p className="text-[14px]">© 2017 - 2025 Libraff.</p>

      </div>
    </div>
  )
}

export default Footer