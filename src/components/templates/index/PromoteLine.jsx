import React from 'react'

const promoteLine = () => {
  return (
    <>
      <div className="bg-white w-full h-[120px]">
        <div className="flex container">
          <div className="flex justify-between basis-1/2">
            <div className="flex">
              <div className="icon">
                <FaPhoneVolume />
              </div>
              <div className="flex flex-col">
                <p>تلفن تماس</p>
                <p>021-66955683</p>
              </div>
            </div>
            <div className=""></div>
          </div>
          <div className="basis-1/2"></div>
        </div>
      </div>
    </>
  )
}

export default promoteLine
