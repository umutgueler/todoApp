import React from 'react'







const Main = () => {
    return (
        <div className='h-96 group relative'>
            <img src="src/img/sea.jpg" alt="Main Image" className="h-full w-full object-cover" />
            <div className="absolute bottom-0 w-full bg-gradient-to-b from-transparent to-u-blue">
                <div className="container pl-10 lg:pl-0">
                    <h3 className="hidden text-u-yellow tracking-wider group-hover:mb-2 group-hover:block duration-500 font-ubebas uppercase">
                        No pain, No gain
                    </h3>
                    <h1 className="text-4xl lg:text-6xl text-u-yellow group-hover:mb-5 duration-500 font-ucrimson">
                        Time is flying
                    </h1>
                    <p className="text-u-gred opacity-0 group-hover:opacity-100 group-hover:mb-10 lg:group-hover:mb-20 duration-1000 font-ucrimson">
                        Enjoy the inexorable pain
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main