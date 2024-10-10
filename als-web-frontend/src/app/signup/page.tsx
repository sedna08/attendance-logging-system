import Head from 'next/head'

export default function Login() {
    return (
        <div>
            <main className="flex justify-center items-center h-screen bg-indigo-600">
                <div className="w-auto p-6 shadow-lg bg-white rounded-md">
                    <h1 className="text-3xl block text-center font-semibold"><i className="fa-solid fa-user"></i> Sign Up</h1>
                    <hr className = "mt-3"></hr>
                    <form className ="mt-3 mb-3">
                        <label className = "block w-full text-base mt-3">
                            ID Number
                            <label className="text-red-600">*</label>
                        </label>
                        <input placeholder="Enter ID Number"
                            //value={searchParcel.parcel_id}
                            //onChange={(e) => {setSearchParcel({ ...searchParcel, parcel_id: e.target.value })}}
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                        />
                        <div className="flex justify-between items-center">
                            <div className="w-full">
                                <label className = "block w-full mr-2 text-base mt-3">
                                    First Name
                                    <label className="text-red-600">*</label>
                                </label>
                            </div>
                            <div className="w-full">
                                <label className = "block w-full ml-2 text-base mt-3">
                                    Last Name
                                    <label className="text-red-600">*</label>
                                </label>
                            </div>
                        </div>
                        <div className="flex justify-between items-center ">
                            <input placeholder="Enter First Name"
                                //value={searchParcel.parcel_id}
                                //onChange={(e) => {setSearchParcel({ ...searchParcel, parcel_id: e.target.value })}}
                                className="border w-6/12 mr-2 text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            />
                            <input placeholder="Enter Last Name"
                                //value={searchParcel.parcel_id}
                                //onChange={(e) => {setSearchParcel({ ...searchParcel, parcel_id: e.target.value })}}
                                className="border w-6/12 ml-2 text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                            />
                        </div>
                        <label className = "block w-full text-base mt-3">
                            Email
                            <label className="text-red-600">*</label>
                        </label>
                        <input placeholder="Enter Email"
                            //value={searchParcel.parcel_id}
                            //onChange={(e) => {setSearchParcel({ ...searchParcel, parcel_id: e.target.value })}}
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                        />
                        <label className = "block w-full text-base mt-3">
                            Password
                            <label className="text-red-600">*</label>
                        </label>
                        <input placeholder="Enter Password"
                            //value={searchParcel.parcel_id}
                            //onChange={(e) => {setSearchParcel({ ...searchParcel, parcel_id: e.target.value })}}
                            className="border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600"
                        />
                        <div className = "mt-3 flex justify-between items-center">
                            <div>
                                <a href="/login" className="text-sm text-indigo-700 font-semibold">Already have an account? Log in here</a>
                            </div>
                        </div>
                        <div className="mt-5">
                            <button 
                                type="submit" 
                                className = "border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"
                            >
                            Sign up
                            </button>
                        </div>
                        
                    </form>
                    
                </div>
            </main>
            
        </div>
    )
}