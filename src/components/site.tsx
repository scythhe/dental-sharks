import { useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";
import {
  Phone, Calendar, Star, ShieldCheck, Sparkles, Baby, Stethoscope, Smile,
  Wrench, Sun, Users, Heart, MessageCircleHeart, Award, ChevronLeft, ChevronRight,
  MapPin, Clock, Mail, ImageIcon, Menu, X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLang, tr, type Lang } from "@/lib/i18n";

const PHONE = "522 22 19 11";
const PHONE_HREF = "tel:+995522221911";

/* ---------- Reveal on scroll ---------- */
function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShow(true), io.disconnect()),
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Placeholder image block ---------- */
function Placeholder({ className = "", label = true, ratio = "aspect-[4/3]" }: { className?: string; label?: boolean; ratio?: string }) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-muted to-secondary ${ratio} ${className}`}
    >
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-muted-foreground/70">
        <ImageIcon className="h-8 w-8" strokeWidth={1.4} />
        {label && <span className="text-xs tracking-wide">Image / სურათი</span>}
      </div>
    </div>
  );
}

/* ---------- Header ---------- */
function Header() {
  const { lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav: { href: string; key: Parameters<typeof tr>[0] }[] = [
    { href: "#services", key: "navServices" },
    { href: "#about", key: "navAbout" },
    { href: "#team", key: "navTeam" },
    { href: "#reviews", key: "navReviews" },
    { href: "#contact", key: "navContact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <a href="#top" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="h-4.5 w-4.5" strokeWidth={2.2} />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-[15px] font-semibold tracking-tight text-foreground">
              Dental Sharks
            </span>
            <span className="block truncate text-[11px] text-muted-foreground">დენტალ შარკსი</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-foreground/75 transition-colors hover:text-primary"
            >
              {tr(n.key, lang)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={PHONE_HREF}
            className="hidden items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground transition hover:border-primary hover:text-primary md:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" /> {PHONE}
          </a>

          <div className="hidden items-center rounded-full border border-border bg-background p-0.5 text-xs font-medium sm:inline-flex">
            {(["ka", "en"] as Lang[]).map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                className={`rounded-full px-2.5 py-1 transition ${
                  lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {l === "ka" ? "ქარ" : "ENG"}
              </button>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-sm transition hover:opacity-90 md:inline-flex"
          >
            <Calendar className="h-3.5 w-3.5" /> {tr("book", lang)}
          </a>

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-background lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4 sm:px-6">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm text-foreground hover:bg-muted"
              >
                {tr(n.key, lang)}
              </a>
            ))}
            <div className="mt-2 flex items-center justify-between border-t border-border pt-3">
              <div className="inline-flex items-center rounded-full border border-border p-0.5 text-xs font-medium">
                {(["ka", "en"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLang(l)}
                    className={`rounded-full px-3 py-1 transition ${
                      lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {l === "ka" ? "ქარ" : "ENG"}
                  </button>
                ))}
              </div>
              <a href={PHONE_HREF} className="text-sm font-medium text-primary">
                {PHONE}
              </a>
            </div>
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground"
            >
              <Calendar className="h-4 w-4" /> {tr("book", lang)}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const { lang } = useLang();
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24">
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(60% 50% at 80% 20%, color-mix(in oklab, var(--mint) 45%, transparent), transparent 60%), radial-gradient(50% 40% at 15% 90%, color-mix(in oklab, var(--accent) 40%, transparent), transparent 60%)",
        }}
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-6">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs font-medium text-primary backdrop-blur">
              <Star className="h-3.5 w-3.5 fill-primary" /> {tr("trustBadge", lang)}
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {tr("heroTitle", lang)}
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              {tr("heroSub", lang)}
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[var(--shadow-elegant)] transition hover:opacity-90"
              >
                <Calendar className="h-4 w-4" /> {tr("book", lang)}
              </a>
              <a
                href={PHONE_HREF}
                className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-background px-6 py-3 text-sm font-medium text-primary transition hover:bg-primary/5"
              >
                <Phone className="h-4 w-4" /> {tr("call", lang)}
              </a>
            </div>
          </Reveal>
          <Reveal delay={320}>
            <div className="mt-8 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex -space-x-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background bg-gradient-to-br from-accent to-mint"
                  />
                ))}
              </div>
              <span>{lang === "ka" ? "ასობით კმაყოფილი პაციენტი" : "Hundreds of happy patients"}</span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6">
          <Reveal delay={200}>
            <div className="relative">
              <Placeholder ratio="aspect-[4/5] sm:aspect-[5/4]" className="shadow-[var(--shadow-elegant)]" />
              <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur sm:block">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-mint text-mint-foreground">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground">
                      {lang === "ka" ? "სტერილიზაცია" : "Sterilization"}
                    </div>
                    <div className="text-sm font-medium">{lang === "ka" ? "მკაცრი პროტოკოლი" : "Strict Protocol"}</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-5 -right-5 hidden rounded-2xl border border-border bg-background/95 p-4 shadow-lg backdrop-blur sm:block">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent text-accent-foreground">
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <div>
                    <div className="text-[11px] text-muted-foreground">Google</div>
                    <div className="text-sm font-medium">4.8 · 54</div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trust bar ---------- */
function TrustBar() {
  const { lang } = useLang();
  const items = [
    { icon: Star, key: "tbRating" as const },
    { icon: Wrench, key: "tbEquip" as const },
    { icon: Heart, key: "tbPainless" as const },
    { icon: Users, key: "tbFamily" as const },
  ];
  return (
    <section className="border-y border-border bg-secondary/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 sm:grid-cols-4 sm:px-6 lg:px-8">
        {items.map(({ icon: Icon, key }, i) => (
          <Reveal key={key} delay={i * 60}>
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-background text-primary shadow-sm">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <div className="min-w-0 text-sm font-medium text-foreground">{tr(key, lang)}</div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
function Services() {
  const { lang } = useLang();
  const services = [
    { icon: Stethoscope, ka: "ზოგადი სტომატოლოგია", en: "General Dentistry", dKa: "სრული დიაგნოსტიკა და პროფილაქტიკა.", dEn: "Full diagnostics and preventive care." },
    { icon: Sparkles, ka: "კბილის წმენდა და ჰიგიენა", en: "Cleaning & Hygiene", dKa: "პროფესიონალური წმენდა კომფორტში.", dEn: "Professional cleaning in comfort." },
    { icon: Wrench, ka: "კარიესის მკურნალობა", en: "Cavity Treatment", dKa: "ზუსტი და უმტკივნეულო რესტავრაცია.", dEn: "Precise, painless restoration." },
    { icon: Award, ka: "გვირგვინები", en: "Crowns", dKa: "ესთეტიური, გამძლე გვირგვინები.", dEn: "Aesthetic, durable crowns." },
    { icon: Sun, ka: "Zoom კბილების გათეთრება", en: "Zoom Teeth Whitening", dKa: "ღიმილი, რომელიც ბრწყინავს.", dEn: "A smile that truly shines." },
    { icon: Baby, ka: "ბავშვთა სტომატოლოგია", en: "Kids' Dentistry", dKa: "თბილი მიდგომა პატარებისთვის.", dEn: "A gentle touch for little ones." },
  ];
  return (
    <section id="services" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-widest text-primary">
              {lang === "ka" ? "სერვისები" : "Services"}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{tr("servicesTitle", lang)}</h2>
            <p className="mt-3 text-muted-foreground">{tr("servicesSub", lang)}</p>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: Icon, ...s }, i) => (
            <Reveal key={s.en} delay={i * 60}>
              <div className="group h-full rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-soft)]">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-mint/50 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 text-base font-semibold text-foreground">
                  {lang === "ka" ? s.ka : s.en}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {lang === "ka" ? s.dKa : s.dEn}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Why / About ---------- */
function Why() {
  const { lang } = useLang();
  const items = [
    { icon: Wrench, ka: "თანამედროვე აღჭურვილობა", en: "Modern Equipment", dKa: "უახლესი ტექნოლოგიები ზუსტი დიაგნოსტიკისთვის.", dEn: "The latest technology for precise diagnostics." },
    { icon: Heart, ka: "ნაზი და ზედმიწევნითი მოვლა", en: "Gentle, Detail-Oriented Care", dKa: "ყოველ პაციენტს — ინდივიდუალური ყურადღება.", dEn: "Individual attention for every patient." },
    { icon: MessageCircleHeart, ka: "ნათელი ახსნა-განმარტება", en: "Clear Explanations", dKa: "ვხსნით ყოველ ნაბიჯს — გადაწყვეტილება თქვენია.", dEn: "We explain every step — you stay in control." },
    { icon: Smile, ka: "კომფორტი სავარძელში", en: "Comfort in the Chair", dKa: "TV სავარძლის ზემოთ, დამამშვიდებელი გარემო.", dEn: "TVs above the chair, a calming environment." },
    { icon: ShieldCheck, ka: "სტერილიზაციის მკაცრი პროტოკოლი", en: "Strict Sterilization Protocol", dKa: "თქვენი უსაფრთხოება — უპირველესი პრიორიტეტი.", dEn: "Your safety is our top priority." },
  ];
  return (
    <section id="about" className="bg-secondary/40 py-24 sm:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="text-xs font-medium uppercase tracking-widest text-primary">
              {lang === "ka" ? "ჩვენ შესახებ" : "About"}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{tr("whyTitle", lang)}</h2>
            <p className="mt-3 text-muted-foreground">{tr("whySub", lang)}</p>
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-8">
              <Placeholder ratio="aspect-[4/5]" />
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-7">
          <div className="grid gap-4 sm:grid-cols-2">
            {items.map(({ icon: Icon, ...s }, i) => (
              <Reveal key={s.en} delay={i * 60}>
                <div className="h-full rounded-2xl border border-border bg-card p-6">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{lang === "ka" ? s.ka : s.en}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{lang === "ka" ? s.dKa : s.dEn}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Team ---------- */
function Team() {
  const { lang } = useLang();
  const team = [
    { ka: "დოქ. გვანცა სხულუხია", en: "Dr. Gvantsa Skhulukhia", rKa: "ჰიგიენა და ნაზი მოვლა", rEn: "Hygiene & Gentle Care" },
    { ka: "დოქ. შოთა ბოკუჩავა", en: "Dr. Shota Bokuchava", rKa: "რესტავრაცია და ბავშვთა სტომატოლოგია", rEn: "Restoration & Kids' Dentistry" },
    { ka: "დოქ. ანა", en: "Dr. Anna", rKa: "ზოგადი სტომატოლოგია", rEn: "General Dentistry" },
    { ka: "დოქ. გიორგი", en: "Dr. Georgi", rKa: "ესთეტიური სტომატოლოგია", rEn: "Aesthetic Dentistry" },
  ];
  return (
    <section id="team" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl">
            <span className="text-xs font-medium uppercase tracking-widest text-primary">
              {lang === "ka" ? "გუნდი" : "Team"}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{tr("teamTitle", lang)}</h2>
            <p className="mt-3 text-muted-foreground">{tr("teamSub", lang)}</p>
          </div>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((p, i) => (
            <Reveal key={p.en} delay={i * 60}>
              <div className="group">
                <Placeholder ratio="aspect-[4/5]" />
                <h3 className="mt-4 text-base font-semibold text-foreground">
                  {lang === "ka" ? p.ka : p.en}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {lang === "ka" ? p.rKa : p.rEn}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Reviews ---------- */
function Reviews() {
  const { lang } = useLang();
  const reviews = [
    {
      en: "She saved my tooth that was considered hopeless. The clinic is modern, clean, and the whole team is very welcoming.",
      ka: "მან გადაარჩინა ჩემი კბილი, რომელიც უიმედოდ ითვლებოდა. კლინიკა თანამედროვე და სუფთაა, გუნდი კი ძალიან თბილი.",
      name: "Ira B.",
    },
    {
      en: "Fast, painless, and the results are excellent. Definitely recommend!",
      ka: "სწრაფი, უმტკივნეულო და შესანიშნავი შედეგით. ნამდვილად გირჩევთ!",
      name: "Natia M.",
    },
    {
      en: "Incredibly gentle, careful, and truly detail-oriented.",
      ka: "წარმოუდგენლად ნაზი, ფრთხილი და ზედმიწევნით ყურადღებიანი.",
      name: "Giorgi S.",
    },
    {
      en: "Dr. Shota took his time on each tooth — amazing work and service!",
      ka: "დოქ. შოთა ყოველ კბილს დიდ დროს უთმობდა — საოცარი მუშაობა და მომსახურება!",
      name: "Steve G.",
    },
    {
      en: "The best dentists are here. My teeth are like new. Most modern equipment, highly qualified doctors.",
      ka: "საუკეთესო ექიმები აქ არიან. კბილები ახალივით მაქვს. უახლესი აღჭურვილობა, მაღალკვალიფიციური ექიმები.",
      name: "Alexander C.",
    },
    {
      en: "Zoom teeth whitening is crazy 😍 highly recommended!",
      ka: "Zoom გათეთრება ფანტასტიკურია 😍 ნამდვილად გირჩევთ!",
      name: "Lasha B.",
    },
  ];
  const [idx, setIdx] = useState(0);
  const perView = 3;
  const maxIdx = Math.max(0, reviews.length - perView);
  const prev = () => setIdx((i) => Math.max(0, i - 1));
  const next = () => setIdx((i) => Math.min(maxIdx, i + 1));

  return (
    <section id="reviews" className="bg-secondary/40 py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <div className="max-w-2xl">
              <span className="text-xs font-medium uppercase tracking-widest text-primary">
                {lang === "ka" ? "შეფასებები" : "Reviews"}
              </span>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
                {tr("reviewsTitle", lang)}
              </h2>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1 text-primary">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className="text-lg font-semibold">4.8</span>
                <span className="text-sm text-muted-foreground">· {tr("reviewsSub", lang)}</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="flex items-center gap-3">
              <a
                href="https://www.google.com/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary underline-offset-4 hover:underline"
              >
                {tr("reviewsLink", lang)} →
              </a>
              <div className="hidden gap-2 sm:flex">
                <button onClick={prev} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-foreground transition hover:border-primary hover:text-primary disabled:opacity-40" disabled={idx === 0} aria-label="Previous">
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button onClick={next} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-background text-foreground transition hover:border-primary hover:text-primary disabled:opacity-40" disabled={idx === maxIdx} aria-label="Next">
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-10 overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(calc(-${idx} * (100% / ${perView}) - ${idx} * 0px))` }}
          >
            {reviews.map((r, i) => (
              <div key={i} className="w-full shrink-0 sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]">
                <div className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-sm">
                  <div className="flex items-center gap-1 text-primary">
                    {[0, 1, 2, 3, 4].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-foreground">
                    &ldquo;{lang === "ka" ? r.ka : r.en}&rdquo;
                  </p>
                  {lang === "ka" && (
                    <p className="mt-3 text-xs italic text-muted-foreground">
                      ორიგინალი: &ldquo;{r.en}&rdquo;
                    </p>
                  )}
                  <div className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                    <div className="grid h-9 w-9 place-items-center rounded-full bg-mint text-mint-foreground text-sm font-semibold">
                      {r.name[0]}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{r.name}</div>
                      <div className="text-xs text-muted-foreground">Google</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const { lang } = useLang();
  const services = [
    { ka: "ზოგადი სტომატოლოგია", en: "General Dentistry" },
    { ka: "კბილის წმენდა და ჰიგიენა", en: "Cleaning & Hygiene" },
    { ka: "კარიესის მკურნალობა", en: "Cavity Treatment" },
    { ka: "გვირგვინები", en: "Crowns" },
    { ka: "Zoom კბილების გათეთრება", en: "Zoom Teeth Whitening" },
    { ka: "ბავშვთა სტომატოლოგია", en: "Kids' Dentistry" },
  ];
  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-medium uppercase tracking-widest text-primary">
              {lang === "ka" ? "კონტაქტი" : "Contact"}
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
              {tr("contactTitle", lang)}
            </h2>
            <p className="mt-3 text-muted-foreground">{tr("contactSub", lang)}</p>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                (e.currentTarget as HTMLFormElement).reset();
                toast.success(tr("formSuccess", lang));
              }}
              className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8"
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label={tr("formName", lang)}>
                  <input required className={inputCls} type="text" />
                </Field>
                <Field label={tr("formPhone", lang)}>
                  <input required className={inputCls} type="tel" />
                </Field>
                <Field label={tr("formEmail", lang)}>
                  <input className={inputCls} type="email" />
                </Field>
                <Field label={tr("formDate", lang)}>
                  <input className={inputCls} type="date" />
                </Field>
                <Field label={tr("formService", lang)} className="sm:col-span-2">
                  <select className={inputCls} defaultValue="">
                    <option value="" disabled>—</option>
                    {services.map((s) => (
                      <option key={s.en}>{lang === "ka" ? s.ka : s.en}</option>
                    ))}
                  </select>
                </Field>
                <Field label={tr("formMessage", lang)} className="sm:col-span-2">
                  <textarea rows={4} className={inputCls + " resize-none"} />
                </Field>
              </div>
              <Button
                type="submit"
                size="lg"
                className="mt-6 w-full rounded-full bg-primary text-primary-foreground hover:opacity-90 sm:w-auto"
              >
                <Calendar className="mr-2 h-4 w-4" /> {tr("formSubmit", lang)}
              </Button>
            </form>
          </Reveal>

          <Reveal delay={100} className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              <div className="rounded-3xl border border-border bg-card p-6">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mint/50 text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {tr("addressLabel", lang)}
                    </div>
                    <div className="mt-1 text-sm font-medium text-foreground">{tr("address", lang)}</div>
                  </div>
                </div>
                <div className="mt-5 flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mint/50 text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {lang === "ka" ? "ტელეფონი" : "Phone"}
                    </div>
                    <a href={PHONE_HREF} className="mt-1 block text-sm font-medium text-foreground hover:text-primary">
                      {PHONE}
                    </a>
                  </div>
                </div>
                <div className="mt-5 flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-mint/50 text-primary">
                    <Clock className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">
                      {tr("hoursLabel", lang)}
                    </div>
                    <div className="mt-1 space-y-0.5 text-sm text-foreground">
                      <div>{tr("hoursWeek", lang)}</div>
                      <div>{tr("hoursSat", lang)}</div>
                      <div className="text-muted-foreground">{tr("hoursSun", lang)}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden rounded-3xl border border-border">
                <iframe
                  title="Map"
                  className="h-72 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Pavle+Aslanidi+19,+Tbilisi&output=embed"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 transition";

function Field({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const { lang } = useLang();
  return (
    <footer className="border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-14 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary-foreground/10">
              <Sparkles className="h-4.5 w-4.5" />
            </span>
            <div className="leading-tight">
              <div className="text-sm font-semibold">Dental Sharks</div>
              <div className="text-[11px] text-primary-foreground/70">დენტალ შარკსი</div>
            </div>
          </div>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            {lang === "ka"
              ? "თანამედროვე სტომატოლოგია თბილისში — ნდობით, ზუსტად, კომფორტში."
              : "Modern dentistry in Tbilisi — trusted, precise, comfortable."}
          </p>
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-primary-foreground/60">
            {tr("quickLinks", lang)}
          </div>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              { href: "#services", key: "navServices" as const },
              { href: "#about", key: "navAbout" as const },
              { href: "#team", key: "navTeam" as const },
              { href: "#reviews", key: "navReviews" as const },
              { href: "#contact", key: "navContact" as const },
            ].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-primary-foreground/80 transition hover:text-primary-foreground">
                  {tr(l.key, lang)}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-primary-foreground/60">
            {tr("addressLabel", lang)}
          </div>
          <div className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <div className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 shrink-0" /> {tr("address", lang)}</div>
            <div className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /> <a href={PHONE_HREF} className="hover:text-primary-foreground">{PHONE}</a></div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4 shrink-0" /> info@dentalsharks.ge</div>
          </div>
        </div>
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-primary-foreground/60">
            {tr("hoursLabel", lang)}
          </div>
          <div className="mt-4 space-y-1 text-sm text-primary-foreground/80">
            <div>{tr("hoursWeek", lang)}</div>
            <div>{tr("hoursSat", lang)}</div>
            <div>{tr("hoursSun", lang)}</div>
          </div>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-primary-foreground/60 sm:flex-row sm:px-6 lg:px-8">
          <div>© {new Date().getFullYear()} Dental Sharks / დენტალ შარკსი — {tr("footerRights", lang)}.</div>
          <div>Tbilisi, Georgia</div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Root export ---------- */
export function Site() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <TrustBar />
        <Services />
        <Why />
        <Team />
        <Reviews />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
