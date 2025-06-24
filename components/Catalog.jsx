import Liste from './Liste.jsx';
import CatalogSign from './CatalogSign.jsx';
import { useState, useRef, useEffect } from 'react';
import { IoMdArrowDropup } from "react-icons/io";
function Catalog() {
    const catalogRef = useRef(null);
    const [show, setShow] = useState(false);

    const objProps = {
        show,
        setShow
    };
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (catalogRef.current && !catalogRef.current.contains(event.target)) {
                setShow(false);
            }
        };

        if (show) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [show]);

    return (
        <>
            {show && (
                <div
                    className="fixed inset-0 bg-[#000] opacity-50 z-30"
                    onClick={() => setShow(false)}
                />
            )}
            <div ref={catalogRef} className='transition delay-150 duration-300 ease-in-out '>
                <div>
                    <CatalogSign {...objProps} />
                    <div className=' flex items-center justify-center'>
                        {show && <IoMdArrowDropup className='z-50 text-white absolute text-4xl top-18' />}
                    </div>
                </div>

                <div className='absolute z-50 pt-10 left-0'>

                    {show && <Liste {...objProps} />}
                </div>
            </div>
        </>
    );
}

export { Catalog };