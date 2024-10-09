import Head from 'next/head'

export default function Login() {
    return (
        <div>
            <main className="flex justify-center items-center h-screen bg-indigo-600">
                <div className="w-96 p-6 shadow-lg bg-white rounded-md">
                    <h1 className="text-3xl block text-center font-semibold"><i className="fa-solid fa-user"></i> Login</h1>
                    <hr className = "mt-3"></hr>
                    <form className ="mt-3">
                        <label className = "block text-base mb-2">Email</label>
                        <input placeholder="Enter Email..."
                            //value={searchParcel.parcel_id}
                            //onChange={(e) => {setSearchParcel({ ...searchParcel, parcel_id: e.target.value })}}
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                        />
                        <label className = "block text-base mb-2 mt-3">Password</label>
                        <input placeholder="Enter Password..."
                            //value={searchParcel.parcel_id}
                            //onChange={(e) => {setSearchParcel({ ...searchParcel, parcel_id: e.target.value })}}
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                        />
                        <div className = "mt-3 flex justify-between items-center">
                            <div>
                                <a href="#" className="text-sm text-indigo-700 font-semibold">Forgot Password?</a>
                            </div>
                            <div>
                                <a href="#" className="text-sm text-indigo-700 font-semibold">Sign up</a>
                            </div>
                        </div>
                        <div className="mt-5">
                            <button 
                                type="submit" 
                                className = "border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                            >
                            Login
                            </button>
                        </div>
                        
                    </form>
                    
                </div>
            </main>
            
        </div>
    )
}