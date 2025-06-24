import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-hot-toast";
import signUp from "../service/AuthService";
const RegisterDash = () => {
    const navigate = useNavigate();
    const [phoneNumber, setPhoneNumber] = useState('+994 ');
    const [password2, setPassword2] = useState('');

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: ''
    });

    const handlePhoneChange = (e) => {
        const value = e.target.value;
        if (!value.startsWith('+994')) {
            setPhoneNumber('+994 ');
            return;
        }
        const afterCode = value.substring(4);
        const cleaned = afterCode.replace(/[^\d\s\-\(\)]/g, '');
        setPhoneNumber('+994' + cleaned);

        setUser(prev => ({ ...prev, phone: '+994' + cleaned }));
    };

    const handleInps = (e) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSignUp = () => {
        if (!user.firstName || !user.lastName || !user.email || !user.password || !user.phone) {
            toast.error('Bütün məlumatları duzgun doldurun!');
            return;
        }
        if (user.password.length < 8) {
            toast.error('Parolun uzunluğu 8 simvol olmalıdır!');
            return;
        }
        if (user.password !== password2) {
            toast.error('Parolu iki dəfə düzgün daxil edin!');
            return;
        }

        const postUser = {
            ...user,
            role: 'user',
            createdAt: new Date().toISOString(), 
            isActive: true,
            lastLogin: null
        };

        signUp(postUser) 
            .then((newUser) => {
                if (newUser) {
                    navigate('/');
                    toast.success('Uğurla qeydiyyatdan keçdiniz!');
                }
                else{
                    toast.error('Bu e-poct unvanina aid hesab var')
                }
            })
            .catch(() => {
                toast.error('Qeydiyyat zamanı xəta baş verdi!');
            });
    };

    return (
        <div className="flex justify-between max-w-[1320px] mx-auto">
            <div className="flex flex-col p-6 rounded-lg sm:p-10 dark:bg-gray-50 dark:text-gray-80 w-lg">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Hesab yaradın</h1>
                </div>
                <form noValidate className="space-y-12">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="phone">Telefon <span className="text-red-600">*</span></label>
                            <input
                                name="phone"
                                type="tel"
                                value={phoneNumber}
                                onChange={handlePhoneChange}
                                placeholder="+994 XX XXX XX XX"
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="firstName" className="block mb-2 text-sm">Ad <span className="text-red-600">*</span></label>
                            <input
                                onChange={handleInps}
                                type="text"
                                name="firstName"
                                id="firstName"
                                placeholder="Leroy"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300 focus:ring-1 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block mb-2 text-sm">Soyad <span className="text-red-600">*</span></label>
                            <input
                                onChange={handleInps}
                                type="text"
                                name="lastName"
                                id="lastName"
                                placeholder="Jenkins"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300 focus:ring-1 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">E-poçt <span className="text-red-600">*</span></label>
                            <input
                                onChange={handleInps}
                                type="email"
                                name="email"
                                id="email"
                                placeholder="leroy@jenkins.com"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300 focus:ring-1 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm">Şifrə <span className="text-red-600">*</span></label>
                            <input
                                onChange={handleInps}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="********"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300 focus:ring-1 focus:ring-red-500"
                            />
                        </div>
                        <div>
                            <label htmlFor="password2" className="block mb-2 text-sm">Şifrə təkrarı <span className="text-red-600">*</span></label>
                            <input
                                onChange={(e) => setPassword2(e.target.value)}
                                type="password"
                                name="password2"
                                id="password2"
                                placeholder="********"
                                className="w-full px-3 py-2 border rounded-md focus:outline-none border-gray-300 focus:ring-1 focus:ring-red-500"
                            />
                        </div>
                    </div>
                    <div className="space-y-2 w-full">
                        <button
                            type="button"
                            className="w-full bg-red-600 py-2 px-3 font-bold text-white rounded-xl hover:bg-red-700 transition"
                            onClick={handleSignUp}
                        >
                            Qeydiyyatdan keç
                        </button>
                        <p className="px-6 text-sm text-center text-gray-600">
                            Hesabınız var?{" "}
                            <Link to="/auth/login" className="hover:underline text-red-600 font-medium">
                                Daxil olun
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
            <div>
                <img
                    src="https://www.libraff.az/images/custom_uploads/misc/reading-time_gcvc.svg"
                    alt="Register illustration"
                    className="-rotate-180 rotate-x-180"
                />
            </div>
        </div>
    );
};

export default RegisterDash;
