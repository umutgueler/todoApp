import React from 'react'







const Navbar = () => {
    return (
        <header className='bg-u-blue p-6 text-u-red uppercase h-100 lg:h-40 pt-10'>
            <div className='container flex flex-col lg:flex-row items-center justify-between '>
                <h1 className=' text-6xl font-bold tracking-wide text-transparent bg-gradient-to-r bg-clip-text from-u-red to-u-gred font-ubebas  ' >TODO-APP</h1>
                <div className='mt-5 lg:mt-0 flex flex-col lg:flex-row justify-center items-center text-center'>
                    <img className="w-10 lg:w-20 rounded-full" src="src/img/albert-einstein.png"></img>
                    <h2 className='text-u-gred italic lg:text-sm text-xs p-2'>The only source of knowledge is experience</h2>
                </div>
                <h1 className='mt-5 lg:mt-0 text-6xl font-bold tracking-wide text-transparent bg-gradient-to-r bg-clip-text from-u-gred to-u-red font-ubebas  ' >JUST DO IT</h1>
            </div>
        </header>
    )
}


export default Navbar;
