import { Link } from "react-router-dom"
const LoginDash = () => {
    return (
        <div className=' flex items-center justify-center h-[100vh] '>
            <div className="flex flex-col max-w-md p-6 rounded-lg sm:p-10 dark:bg-gray-50 dark:text-gray-800 border border-gray-300">
                <div className="mb-8 text-center">
                    <h1 className="my-3 text-4xl font-bold">Daxil Ol</h1>
                </div>
                <form noValidate="" action="" className="space-y-12">
                    <div className="space-y-4">
                        
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm">E-poçt</label>
                            <input type="email" name="email" id="email" placeholder="leroy@jenkins.com" className="w-full px-3 py-2 border rounded-md border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                        </div>
                        <div>
                            <div className="flex justify-between mb-2">
                                <label htmlFor="password" className="text-sm">Şifrə</label>
                                <a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-[red] font-medium">Sifreni unutdun?</a>
                            </div>
                            <input type="password" name="password" id="password" placeholder="*****" className="w-full px-3 py-2 border rounded-md border-gray-300 dark:bg-gray-50 dark:text-gray-800" />
                        </div>
                    </div>
                    <div className="space-y-2 ">
                        <div className='flex justify-center items-center'>
                           <Link to='/'><button type="button" className="w-[80%] bg-[red] py-2 px-3 font-bold text-white rounded-4xl" onClick={logIn}>Daxil ol</button></Link> 
                        </div>
                        <p className="px-6 text-sm text-center dark:text-gray-600">Hesabin yoxdur?
                            <Link to='/auth/register' className="hover:underline text-[red] font-medium"> Qeydiyyatdan kecin</Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginDash