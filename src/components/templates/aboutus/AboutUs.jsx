'use client'
import React from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
const AboutUs = ({ ourTeam }) => {
  const { t, i18n } = useTranslation('aboutus')
  return (
    <>
      <div className="mb-20 h-auto">
        {/* image and text */}
        <div className="mt-7 w-full h-auto">
          <div className="container">
            <div className="relative mt-10 h-[300px]">
              <div className={`flex ${i18n.language ==='fa' ? "mr-auto":"ml-auto"} flex-start  ml-[30px] w-full lg:w-[750px] h-[500px]`}>
                <Image
                  alt="pic"
                  src="/images/Ginger-Autumn-Just-Living-Photo-Collage-Facebook-Cover-1024x443.webp"
                  width={800}
                  height={250}
                  className="rounded-[20px]"
                />
              </div>
              <div className="top-[520px] lg:top-[95px] absolute flex flex-col justify-start bg-gray-800 lg:mr-[20px] px-8 pb-5 rounded-[20px] w-full lg:w-2/4 h-auto">
                <h1 className="mt-5 mb-3 font-bold text-white text-sm sm:text-xl">
                  {t('historyTitle')}
                </h1>
                <p className="mt-2 text-white text-sm sm:text-base text-justify">
                  {/* {' '}
                  صنعت جوش و اتصالات در کشورهای صنعتی از جایگاه ویژه ای برخوردار
                  است. در تولیدات صنعتی که از کیفیت بسیار بالایی برخوردار هستند،
                  از فرآیندهای متنوع جوشکاری که از کیفیت تضمین شده برخوردار
                  هستند، استفاده گسترده ای می‌شود و حتی فرایند های ساخت افزایشی
                  نیز در این حوزه منظور می گردند. در این ارتباط در کشورهای
                  صنعتی، نهادی علمی و فنی به عنوان مرجع جوش کشور تعیین می شود که
                  متولی و هدایتگر امور مهارت افزایی، تاییدیه ها، بازرسی،
                  استاندارد سازی، توسعه کاربردی و تحقیق و مشاوره می باشد. همچنین
                  با توجه به کاربرد روزافزون چسب های پیشرفته در تولیدات صنعتی،
                  توجه ویژه ای به صنعت چسب و مهندسی آن معطوف شده است. */}

                  {t('historyDesc')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/*  text1 */}
        <div className="mt-[210px] lg:mt-0 container">
          <h1 className="mt-[620px] sm:mt-[540px] lg:mt-[210px] mb-5 font-bold text-red-800 text-xl">
           {t('introTitle')}
          </h1>
          <p className="sm:mt-0">
               {t('historyDesc')}
          </p>
          <p className="mt-5">
            {/* نظر به ضرورت ایجاد چنین مرجعی در ایران، موسسه جوش و چسب ایرانیان
            (IWJI) به عنوان مرجع ملی فعالیت های مرتبط با صنایع جوش و اتصالات
            کشور ایجاد شده است. در این ارتباط عضویت انحصاری ایران در موسسه بین
            المللی جوش( IIW) نیز اخذ شده است. موسسه جوش و چسب ایرانیان (IWJI) با
            حمایت همه جانبه دانشگاه صنعتی امیرکبیر و معاونت فناوری ریاست جمهوری
            ایجاد شده است. شایان ذکر می باشد که موسسه جوش و چسب ایرانیان یک نهاد
            ملی غیردولتی و غیرانتفاعی می باشد و لازم است کلیه هزینه های خود از
            جمله هزینه های مربوط به حق عضویت سالیانه در موسسه بین المللی جوش
            (IIW) و مجوز ANB (مجوز صدور گواهینامه های بین المللی) را با فعالیت
            های تخصصی خود تامین نماید. */}
            {t('introDesc1')}
          </p>
        </div>

        {/* image and text 2*/}
        <div className="mt-7 w-full h-[550px]">
          <div className="container">
            <div className="relative grid grid-cols-2 mt-10 h-[300px]">
              <div className={`flex flex-start   lg:mr-[35px] w-[200%] lg:w-[700px] xl:w-[750px] h-[500px]`}>
                <Image
                  alt="pic"
                  src="/images/pete-wright-n1RJ7pXgGTE-unsplash.jpg"
                  width={800}
                  height={250}
                  className="rounded-[20px]"
                />
              </div>
              <div className={`lg:top-[70px] ${i18n.language==='fa' ? " lg:left-10" :" lg:right-10"} xl:top-[90px] absolute flex flex-col justify-start bg-red-800 mt-[550px] lg:mt-0 px-8 pb-5 rounded-[10px] w-full lg:w-[450px] xl:w-[600px] h-auto`}>
                <h1 className="mt-5 mb-3 font-bold text-white text-sm sm:text-xl">
                 {t('historyTitle')}
                </h1>
                <p className="mt-2 text-white text-sm sm:text-xl text-justify">
                  {' '}
                     {t('introDesc1')}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* text2 */}
        <div className="container">
          <p className="mt-[420px] sm:mt-[320px] lg:mt-0 mb-10">
               {t('introDesc1')}
          </p>
        </div>

        {ourTeam.map((team) => {
          return (
            <div className="flex md:flex-row flex-col bg-gray-800 pb-5 rounded-bl-[74px] h-auto container">
              <div className="flex flex-col justify-start items-center rounded-[20px] md:w-[600px] lg:w-[400px]">
                <Image
                  alt="pic"
                  src={team.img}
                  width={200}
                  height={170}
                  className={`${i18n.language === 'fa' ? "pr-5" :"pl-5"} pt-5  rounded-[20px] w-[200px] h-[170px] overflow-hidden`}
                />
                <h1 className="mt-2 font-bold text-red-700 md:text-lg lg:text-xl">
                  {team.username}
                </h1>
                <p className="mt-3 text-white">{t('founder')}</p>
              </div>

              <div className="flex justify-center items-center p-8 text-white md:text-sm lg:text-base md:leading-[2rem] lg:leading-[3rem]">
                {/* لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله
                در ستون و سطرآنچنان که لازم استلورم ایپسوم متن ساختگی با تولید
                سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.
                چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                است */}
                {t('teamDesc')}
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default AboutUs
