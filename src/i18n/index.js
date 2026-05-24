import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import navbarfa from '../i18n/navbar/fa'
import navbaren from '../i18n/navbar/en'
import mainsectionen from '../i18n//mainsection/en'
import mainsectionfa from '../i18n//mainsection/fa'
import coorporationen from '../i18n/coorporation/en'
import coorporationfa from '../i18n/coorporation/fa'
import servicesen from '../i18n/services/en'
import servicesfa from '../i18n/services/fa'
import ourteamen from '../i18n/ourteam/en'
import ourteamfa from '../i18n/ourteam/fa'
import featuresen from '../i18n/features/en'
import featuresfa from '../i18n/features/fa'
import newcourseen from '../i18n/newcourse/en'
import newcoursefa from '../i18n/newcourse/fa'
import articleen from '../i18n/article/en'
import articlefa from '../i18n/article/fa'
import customercommenten from '../i18n/customercomment/en'
import customercommentfa from '../i18n/customercomment/fa'
import adslineen from '../i18n/adsline/en'
import adslinefa from '../i18n/adsline/fa'
import topbaren from '../i18n/topbar/en'
import topbarfa from '../i18n/topbar/fa'
import footeren from '../i18n/footer/en'
import footerfa from '../i18n/footer/fa'
import topbarcourseen from '../i18n/courses/international-courses/iwe/topbarcourse/en'
import topbarcoursefa from '../i18n/courses/international-courses/iwe/topbarcourse/fa'
import courseinfoen from '../i18n/courses/international-courses/iwe/topbarcourse/courseinfo/en'
import courseinfofa from '../i18n/courses/international-courses/iwe/topbarcourse/courseinfo/fa'
import coursedetailsen from '../i18n/courses/international-courses/iwe/topbarcourse/coursedetails/en'
import coursedetailsfa from '../i18n/courses/international-courses/iwe/topbarcourse/coursedetails/fa'
import coursesupporten from '../i18n/courses/international-courses/iwe/topbarcourse/coursesupport/en'
import coursesupportfa from '../i18n/courses/international-courses/iwe/topbarcourse/coursesupport/fa'
import commentformen from '../i18n/courses/international-courses/iwe/topbarcourse/commentform/en'
import commentformfa from '../i18n/courses/international-courses/iwe/topbarcourse/commentform/fa'
import registercourseen from '../i18n/courses/registercourse/en'
import registercoursefa from '../i18n/courses/registercourse/fa'
import certificatesen from '../i18n/courses/certificates/en'
import certificatesfa from '../i18n/courses/certificates/fa'
import webinaren from '../i18n/webinar/en'
import webinarfa from '../i18n/webinar/fa'
import educationalserviceen from '../i18n/services/educationalservices/en'
import educationalservicefa from '../i18n/services/educationalservices/fa'
import technicalserviceen from '../i18n/services/technicalservices/en'
import technicalservicefa from '../i18n/services/technicalservices/fa'
import consultingserviceen from '../i18n/services/consultingservices/en'
import consultingservicefa from '../i18n/services/consultingservices/fa'
import energyen from '../i18n/activities/energy/en'
import energyfa from '../i18n/activities/energy/fa'
import automotiveen from '../i18n/activities/automotive/en'
import automotivefa from '../i18n/activities/automotive/fa'
import railen from '../i18n/activities/rail/en'
import railfa from '../i18n/activities/rail/fa'
import membershipen from '../i18n/membership/en'
import membershipfa from '../i18n/membership/fa'
import contactusen from '../i18n/contactus/en'
import contactusfa from '../i18n/contactus/fa'
import helpen from '../i18n/aboutus/help/en'
import helpfa from '../i18n/aboutus/help/fa'
import galleryen from '../i18n/gallery/en'
import galleryfa from '../i18n/gallery/fa'
import aboutusen from '../i18n/aboutus/en'
import aboutusfa from '../i18n/aboutus/fa'
import leftsideen from '../i18n/courses/leftside/en'
import leftsidefa from '../i18n/courses/leftside/fa'

import catalogen from '../i18n/catalog/en'
import catalogfa from '../i18n/catalog/fa'
import paginationen from '../i18n/pagination/en'
import paginationfa from '../i18n/pagination/fa'
import courseboxen from '../i18n/courses/coursebox/en'
import courseboxfa from '../i18n/courses/coursebox/fa'
import webinarboxen from '../i18n/courses/webinarbox/en'
import webinarboxfa from '../i18n/courses/webinarbox/fa'
// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: {
    // translation: en,
    navbar: navbaren,
    mainsection: mainsectionen,
    coorporation: coorporationen,
    services: servicesen,
    ourteam: ourteamen,
    features: featuresen,
    newcourse: newcourseen,
    article: articleen,
    adsline: adslineen,
    customercomment: customercommenten,
    topbar: topbaren,
    footer: footeren,
    topbarcourse: topbarcourseen,
    courseinfo: courseinfoen,
    coursedetails: coursedetailsen,
    coursesupport: coursesupporten,
    commentform: commentformen,
    registercourse: registercourseen,
    certificates: certificatesen,
    webinar: webinaren,
    educationalservice: educationalserviceen,
    technicalservice: technicalserviceen,
    consultingservice: consultingserviceen,
    energy: energyen,
    automotive: automotiveen,
    rail: railen,
    membership: membershipen,
    contactus: contactusen,
    help: helpen,
    gallery: galleryen,
    aboutus: aboutusen,
    leftside:leftsideen,
    catalog:catalogen,
pagination:paginationen,
coursebox:courseboxen,
webinarbox:webinarboxen
  },
  fa: {
    // translation: fa,
    navbar: navbarfa,
    mainsection: mainsectionfa,
    coorporation: coorporationfa,
    services: servicesfa,
    ourteam: ourteamfa,
    features: featuresfa,
    newcourse: newcoursefa,
    article: articlefa,
    customercomment: customercommentfa,
    adsline: adslinefa,
    topbar: topbarfa,
    footer: footerfa,
    topbarcourse: topbarcoursefa,
    courseinfo: courseinfofa,
    coursedetails: coursedetailsfa,
    coursesupporte: coursesupportfa,
    commentform: commentformfa,
    registercourse: registercoursefa,
    certificates: certificatesfa,
    webinar: webinarfa,
    educationalservice: educationalservicefa,
    technicalservice: technicalservicefa,
    consultingservice: consultingservicefa,
    energy: energyfa,
    automotive: automotivefa,
    rail: railfa,
    membership: membershipfa,
    contactus: contactusfa,
    help: helpfa,
    gallery: galleryfa,
    aboutus: aboutusfa,
    leftside:leftsidefa,
    catalog:catalogfa,
    pagination:paginationfa,
    coursebox:courseboxfa,
    webinarbox:webinarboxfa
  },

};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "fa", // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });




export default i18n;
