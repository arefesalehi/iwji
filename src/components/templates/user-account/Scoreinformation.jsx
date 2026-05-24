import React from 'react'

const Scoreinformation = () => {
  return (
    <div className="">
      <div>
        {' '}
        <h1 className="mb-3 font-bold">اگر نمره‌ای نمایش داده نمی‌شود: </h1>
        <ul className="mb-5">
          <li>
            <a href="">
             1- امکان دارد استاد هنوز نمره شما را در سیستم ثبت نکرده باشد.{' '}
            </a>
          </li>
          <li>
            <a href="">
            2-  در صورت اعتراض به نمره، حتماً با استاد یا مسئول مربوطه مستقیم تماس
              بگیرید.{' '}
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Scoreinformation
