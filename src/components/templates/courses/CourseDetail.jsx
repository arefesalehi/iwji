import i18n from '@/i18n'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CourseDetail = ({ course }) => {
  const { t } = useTranslation('coursedetails')
  return (
    <>
      <h1 className="flex mt-8">
        <div className="border-red-800 border-b-8 rounded-[10px] w-[40px] h-[15px]"></div>
        <p className={` ${i18n.language === 'fa' ? 'mr-3' : 'ml-3'} text-xl`}>
          {' '}
          {t('courseDetail')}
        </p>
      </h1>
      <div className="bg-white [box-shadow:rgba(60,_64,_67,_0.3)_0px_1px_2px_0px,_rgba(60,_64,_67,_0.15)_0px_1px_3px_1px] mt-10 mb-20 p-10 rounded-[20px] w-full h-auto text-md text-justify">
        {course.shortName == 'IWE' && (
          <>
            {' '}
            <div className="p-3 w-full h-auto text-md text-justify">
              <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
                {t('IWEroleTitle')}
              </h1>
              <p className="py-2">{t('IWEroleText')}</p>
              <ul>
                <li>- {t('IWEroleList1')}</li>
                <li>- {t('IWEroleList2')}</li>
                <li>- {t('IWEroleList3')}</li>
                <li>- {t('IWEroleList4')}</li>
                <li>- {t('IWEroleList5')}</li>
                <li>- {t('IWEroleList6')}</li>
              </ul>
            </div>
            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              🎯 {t('IWEaudienceTitle')}
            </h1>
            <p className="py-2">
              {/* این دوره برای تمام مهندسان، کارشناسان، ناظران فنی و فعالان حوزه
              جوش، چسب و اتصالات طراحی شده است. تمامی واحدهای صنعتی و تولیدی که
              به نوعی با فرآیندهای جوشکاری درگیر هستند، نیاز به مهندسان ناظر
              دارند تا اطمینان حاصل شود فرآیندهای جوشکاری به درستی اجرا شده و
              محصول نهایی با بالاترین سطح دقت، کیفیت و ایمنی تولید می‌شود. */}
              {t('IWEaudienceText')}
            </p>
            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              👨‍🔬 {t('IWSnecessityTitle')}
            </h1>
            <p className="py-2">{t('advantageDesc1')}</p>
            <ul>
              <li>{t('advantageList1')}</li>
              <li>{t('advantageList2')}</li>
              <li>{t('advantageList3')}</li>
            </ul>
            <p className="py-2">{t('advantageDesc2')}</p>
            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              {' '}
              {t('certificateTitle')}
            </h1>
            <h3 className="mt-5 mb-2 font-semibold text-md text-red-800">
              {t('certificateSubTitle')}
            </h3>
            <p className="py-2">{t('certificateDesc1')}</p>
            <p className="py-2">{t('certificateDesc2')}</p>
            <ul>
              <li> {t('certificateList1')} </li>
              <li> {t('certificateList2')} </li>
              <li> {t('certificateList3')} </li>
              <li> {t('certificateList4')} </li>
              <li> {t('certificateList5')} </li>
            </ul>
            <p className="py-2">{t('certificateDesc3')}</p>
            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              {t('requirementTitle')}
            </h1>
            <p className="py-2">{t('requirementText')}</p>
            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              {t('jobTitle')}
            </h1>
            <p className="py-2">
              {/* در بسیاری از زمینه های طراحی، ساخت، محاسبه سازه های جوش، گواهینامه
              مهندسی بین المللی جوش (IWE) مدرکی جذاب است که براساس استانداردهای
              روز دنیا اجباری است. این گواهینامه شما را قادر می سازد به عنوان
              مهندس ناظر در صنایع مرتبط به فرایند جوشکاری فعالیت نمایید. */}

              {t('jobText')}
            </p>
            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              {t('examTitle')}
            </h1>
            <p className="py-2">{t('examText')}</p>
            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              {t('finalCertificateTitle')}
            </h1>
            <p className="py-2">{t('finalCertificateText')}</p>{' '}
          </>
        )}

        {course.shortName == 'IWS' && (
          <>
            {' '}
            <div className="p-3 w-full h-auto text-md text-justify">
              <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
                {t('supervisorTitle')}
              </h1>
              <p className="py-2">{t('supervisorDesc')}</p>
            </div>
            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              {t('audienceTitle')}
            </h1>
            <p className="py-2">{t('audienceDesc')}</p>
            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              {' '}
              {t('iweCertificateTitle')}
            </h1>
            <h3 className="mt-5 mb-2 font-semibold text-md text-red-800">
              {t('iweCertificateSubtitle')}
            </h3>
            <p className="py-2">{t('iweCertificateDesc')}</p>
            <p className="py-2">
              این گواهینامه در بسیاری از رشته‌های فنی و مهندسی از جمله:
            </p>
            <ul>
              <li>🔹 {t('iwsFields1')}</li>
              <li>🔹 {t('iwsFields2')}</li>
              <li>🔹 {t('iwsFields3')}</li>
              <li>🔹{t('iwsFields4')}</li>
              <li> 🔹{t('iwsFields5')} </li>
            </ul>
            <p className="py-2">{t('iweFieldsDesc')}</p>
            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              {t('requirementsTitle')}
            </h1>
            <p className="py-2">{t('requirement1')}</p>
            <p className="py-2">{t('requirement2')}</p>
            <p className="py-2">{t('requirement3')}</p>
            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              {t('careerOpportunitiesTitle')}
            </h1>
            <p className="py-2">{t('careerOpportunitiesDesc')}</p>
            <ul>
              <li>{t('careerOpportunitiesList1')}</li>
              <li>{t('careerOpportunitiesList2')}</li>
              <li> {t('careerOpportunitiesList3')}</li>
              <li>{t('careerOpportunitiesList4')}</li>
            </ul>
            <p className="py-2">{t('careerOpportunitiesExtra')}</p>
            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              {t('examsTitle')}
            </h1>
            <p className="py-2">{t('examsDesc')}</p>
            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              {t('certificateTitle')}
            </h1>
            <p className="py-2">{t('certificateDesc')}</p>
          </>
        )}

        {course.shortName == 'IWT' && (
          <>
            {' '}
            <div className="p-3 w-full h-auto text-md text-justify">
              <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
                {t('title')}
              </h1>
              <p className="py-2">{t('desc')}</p>
            </div>
            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              {t('requirementsTitle')}
            </h1>
            <p className="py-2">{t('requirement1')}</p>
            <p className="py-2">{t('requirement2')}</p>
            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              {t('careerTitle')}
            </h1>
            <p className="py-2">{t('careerDesc')}</p>
            <ul>
              <li>{t('careerList1')}</li>
              <li>{t('careerList2')}</li>
              <li> {t('careerList3')}</li>
              <li>{t('careerList4')}</li>
            </ul>
            <p className="py-2">{t('careerExtra')}</p>
            <h1 className="mt-5 mb-2 font-semibold text-red-800 text-base lg:text-lg">
              {t('examsTitle')}
            </h1>
            <p className="py-2">
              {t('examsDesc')}
              <ul>
                <li>{t('examsList1')}</li>
                <li>{t('examsList2')}</li>
              </ul>
            </p>
          </>
        )}
      </div>
    </>
  )
}

export default CourseDetail
