const Header = () => {
  return (
    <header className="bg-emerald-900 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold"><b>ALS Portal</b></h1>
        <div className="flex">
            <div className="text-lg font-semibold text-white mx-5">Login</div>
            <div className="text-lg font-semibold text-white mx-5">Sign Up</div>
        </div>
        
      </div>
    </header>
  )
}

export default Header