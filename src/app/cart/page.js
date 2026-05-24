import CartBox from '@/components/templates/cart/CartBox'
import React from 'react'

const page = () => {
    return (
        <>

            <div className='w-full h-auto flex container '>
                <div className='w-2/3  p-10  '>
                    <h1 className='p-10 font-bold text-lg'>لیست دوره ها و وبینارها</h1>
                    <div className='flex flex-col gap-2 rounded-xl justify-center items-center'>
                        <CartBox />
                        <CartBox />
                        <CartBox />

                    </div>


                </div>
                <div className='w-1/3  p-10'>
                    <h1 className='p-10 text-lg font-bold'>هزینه دوره ها و وبینارها</h1>
                    <div className='flex  flex-col gap-2 rounded-xl justify-center items-center'>
                        <div className="flex flex-col justify-between rounded-lg items-center border-gray-300 border-1 p-3 w-[90%] h-auto">
                            <div className=' w-full flex h-[50px] justify-between items-center border-b-1 border-gray-400'>
                                <span>جمع کل: </span>
                                <span>20000 تومان</span>
                            </div>
                            <div className='flex mt-10 gap-2'> <input type="text" className='rounded-lg border-1 border-gray-400' />
                            <span className='p-2 rounded-lg bg-green-600 text-white'>اعمال</span></div>

                            <div className=' w-full flex justify-between mt-20  mb-5 items-center '>
                                <span>  قابل پرداخت</span>
                                <span>200000 تومان</span>
                            </div>

                            <button className='bg-green-600 text-white w-full rounded-xl py-2'>تکمیل سفارش</button>

                        </div>






                    </div>
                </div>


            </div>



        </>
    )
}

export default page