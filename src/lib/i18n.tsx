import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "ka" | "en";

type Dict = Record<string, { ka: string; en: string }>;

export const t: Dict = {
  navServices: { ka: "სერვისები", en: "Services" },
  navAbout: { ka: "ჩვენ შესახებ", en: "About" },
  navTeam: { ka: "გუნდი", en: "Team" },
  navReviews: { ka: "შეფასებები", en: "Reviews" },
  navContact: { ka: "კონტაქტი", en: "Contact" },
  book: { ka: "ჩაწერა ვიზიტზე", en: "Book Appointment" },
  call: { ka: "დარეკვა", en: "Call Now" },

  heroTitle: { ka: "თანამედროვე სტომატოლოგია, რომელსაც ენდობით", en: "Modern Dentistry You Can Trust" },
  heroSub: {
    ka: "უმტკივნეულო, ზუსტი და პაციენტზე მორგებული მკურნალობა თბილისის გულში.",
    en: "Painless, precise, patient-first care in the heart of Tbilisi.",
  },
  trustBadge: { ka: "4.8 ★ · 54 შეფასება Google-ზე", en: "4.8 ★ · 54 Google reviews" },

  tbRating: { ka: "4.8★ Google რეიტინგი", en: "4.8★ Google Rating" },
  tbEquip: { ka: "თანამედროვე აღჭურვილობა", en: "Modern Equipment" },
  tbPainless: { ka: "უმტკივნეულო მკურნალობა", en: "Painless Treatment" },
  tbFamily: { ka: "ოჯახური გარემო", en: "Family-Friendly" },

  servicesTitle: { ka: "სერვისები", en: "Our Services" },
  servicesSub: {
    ka: "სრული სპექტრი სტომატოლოგიური სერვისებისა — ერთ სივრცეში.",
    en: "A full range of dental services — all under one roof.",
  },

  whyTitle: { ka: "რატომ ჩვენ", en: "Why Choose Us" },
  whySub: {
    ka: "ჩვენი პაციენტების გამოცდილება — თქვენი ნდობის საფუძველი.",
    en: "What our patients love — the foundation of your trust.",
  },

  teamTitle: { ka: "ჩვენი გუნდი", en: "Meet the Team" },
  teamSub: {
    ka: "გამოცდილი ექიმები, თბილი დამოკიდებულებით.",
    en: "Experienced doctors with warm, personal care.",
  },

  reviewsTitle: { ka: "შეფასებები", en: "Patient Reviews" },
  reviewsSub: { ka: "54 შეფასება", en: "54 reviews" },
  reviewsLink: { ka: "იხილეთ ყველა შეფასება Google-ზე", en: "Read all reviews on Google" },

  contactTitle: { ka: "ჩაწერა და კონტაქტი", en: "Book & Contact" },
  contactSub: {
    ka: "დაგვიტოვეთ მოთხოვნა — მალე დაგიკავშირდებით.",
    en: "Send us a request — we'll be in touch shortly.",
  },
  formName: { ka: "სახელი", en: "Name" },
  formPhone: { ka: "ტელეფონი", en: "Phone" },
  formEmail: { ka: "ელფოსტა", en: "Email" },
  formService: { ka: "სერვისი", en: "Service" },
  formDate: { ka: "სასურველი თარიღი", en: "Preferred Date" },
  formMessage: { ka: "შეტყობინება", en: "Message" },
  formSubmit: { ka: "ჩაწერის მოთხოვნა", en: "Request Appointment" },
  formSuccess: {
    ka: "მადლობა! თქვენს ვიზიტს დავადასტურებთ მალე.",
    en: "Thank you! We'll confirm your appointment soon.",
  },
  addressLabel: { ka: "მისამართი", en: "Address" },
  address: {
    ka: "19/21 პავლე ასლანიდის ქუჩა, თბილისი 0171",
    en: "19/21 Pavle Aslanidi St, Tbilisi 0171",
  },
  hoursLabel: { ka: "სამუშაო საათები", en: "Opening Hours" },
  hoursWeek: { ka: "ორშ – პარ: 10:00 – 20:00", en: "Mon – Fri: 10:00 – 20:00" },
  hoursSat: { ka: "შაბ: 11:00 – 18:00", en: "Sat: 11:00 – 18:00" },
  hoursSun: { ka: "კვი: დახურულია", en: "Sun: Closed" },

  footerRights: { ka: "ყველა უფლება დაცულია", en: "All rights reserved" },
  quickLinks: { ka: "სწრაფი ბმულები", en: "Quick Links" },
};

const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({
  lang: "ka",
  setLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ka");
  return <LangCtx.Provider value={{ lang, setLang }}>{children}</LangCtx.Provider>;
}

export const useLang = () => useContext(LangCtx);
export const tr = (key: keyof typeof t, lang: Lang) => t[key][lang];
