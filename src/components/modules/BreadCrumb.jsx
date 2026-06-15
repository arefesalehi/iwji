import React from "react";

const BreadCrumb = ({ title, img }) => {
  return (
    <div className="relative bg-red-500 w-full overflow-hidden">
      {/* تصویر پس‌زمینه */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${img})` }}
      ></div>

      {/* لایه‌ی گرادینت */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900/70 to-red-800/70"></div>

      {/* محتوای مرکزی */}
      <div className="z-10 relative flex flex-col justify-center items-center h-[300px] md:h-[400px] text-white text-center">
        <h2 className="font-bold text-4xl md:text-6xl">{title}</h2>
      </div>

      {/* مثلث پایین */}
      <div className="relative w-full overflow-hidden leading-[0]">
        <svg
          className="block w-full h-[60px] md:h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {/* نکته‌ی مهم: fill با رنگ پس‌زمینه صفحه بعدی یکی باشه */}
          <polygon fill="#fff" points="0,100 100,100 50,0" />
        </svg>
      </div>
    </div>
  );
};

export default BreadCrumb;
