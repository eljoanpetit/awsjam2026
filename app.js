const { useState, useEffect } = React;

const translations = {
  es: {
    challenge: "¿Te lo vas a perder?",
    what: "Qué",
    who: "Quién",
    how: "Cómo",
    when: "Cuándo",
    what_desc: "Hasta 100 equipos de 2 a 4 personas demostrando sus habilidades en AWS",
    who_desc: "Alumnado matriculado en centros incorporados al programa AWS ACADEMY con una ",
    who_highlight: "suscripción a AWS SkillBuilder activa",
    how_desc: "La persona responsable (tutora/tutor) debe realizar el registro del equipo o equipos que participan.",
    how_btn: "Inscribirse ahora",
    days: "Días",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
    what_is_jam: "¿Qué es un AWS JAM?",
    organizes: "Organiza"
  },
  ca: {
    challenge: "T'ho vas a perdre?",
    what: "Què",
    who: "Qui",
    how: "Com",
    when: "Quan",
    what_desc: "Fins a 100 equips de 2 a 4 persones demostrant les seues habilitats en AWS",
    who_desc: "Alumnat matriculat en centres incorporats al programa AWS ACADEMY amb una ",
    who_highlight: "subscripció a AWS SkillBuilder activa",
    how_desc: "La persona responsable (tutora/tutor) ha de fer el registre de l'equip o equips que participen.",
    how_btn: "Inscriure's ara",
    days: "Dies",
    hours: "Hores",
    minutes: "Minuts",
    seconds: "Segons",
    what_is_jam: "Què és un AWS JAM?",
    organizes: "Organitza"
  },
  gl: {
    challenge: "Vas botalo de menos?",
    what: "Que",
    who: "Quen",
    how: "Como",
    when: "Cando",
    what_desc: "Ata 100 equipos de 2 a 4 persoas demostrando as súas habilidades en AWS",
    who_desc: "Alumnado matriculado en centros incorporados ao programa AWS ACADEMY cunha ",
    who_highlight: "subscrición a AWS SkillBuilder activa",
    how_desc: "A persoa responsable (titora/titor) debe realizar o rexistro do equipo ou equipos que participan.",
    how_btn: "Inscribirse agora",
    days: "Días",
    hours: "Horas",
    minutes: "Minutos",
    seconds: "Segundos",
    what_is_jam: "Que é un AWS JAM?",
    organizes: "Organiza"
  },
  eu: {
    challenge: "Galduko al duzu?",
    what: "Zer",
    who: "Nor",
    how: "Nola",
    when: "Noiz",
    what_desc: "2-4 pertsonaz osatutako 100 talde arte AWSko trebetasunak erakusten",
    who_desc: "AWS ACADEMY programan sartuta dauden zentroetan matrikulatutako ikasleak, ",
    who_highlight: "AWS SkillBuilder harpidetza aktiboa dutenak",
    how_desc: "Arduradunak (tutoreak) eman behar du izena parte hartzen duen taldearen edo taldeen izenean.",
    how_btn: "Eman izena orain",
    days: "Egunak",
    hours: "Orduak",
    minutes: "Minutuak",
    seconds: "Segundoak",
    what_is_jam: "Zer da AWS JAM bat?",
    organizes: "Antolatzaileak"
  }
};

const Countdown = ({ targetDate, lang }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const t = translations[lang];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      {['days', 'hours', 'minutes', 'seconds'].map(unit => (
        <div key={unit} className="glass p-4 rounded-xl">
          <div className="text-4xl md:text-6xl font-black text-orange-500">{timeLeft[unit]}</div>
          <div className="text-xs uppercase tracking-widest">{t[unit]}</div>
        </div>
      ))}
    </div>
  );
};

const App = () => {
  const [lang, setLang] = useState('es');
  const targetDate = new Date('2026-03-25T17:00:00').getTime();
  const t = translations[lang];

  const scrollTo = (id) => {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-barcelona min-h-screen font-sans selection:bg-orange-500 selection:text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <img src="https://itb.cat/wp-content/uploads/2021/04/Logo-ITB-blanc.png" alt="Institut TIC" className="h-10 hidden md:block" />
             <span className="font-black text-xl tracking-tighter italic">AWS JAM <span className="text-orange-500">2026</span></span>
          </div>
          <div className="hidden md:flex gap-8 font-bold uppercase text-sm tracking-widest">
            <button onClick={() => scrollTo('que')} className="hover:text-orange-500 transition-colors">{t.what}</button>
            <button onClick={() => scrollTo('qui')} className="hover:text-orange-500 transition-colors">{t.who}</button>
            <button onClick={() => scrollTo('com')} className="hover:text-orange-500 transition-colors">{t.how}</button>
            <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-orange-500 transition-colors">{t.when}</button>
          </div>
          <div className="flex gap-2">
            {['es', 'ca', 'gl', 'eu'].map(l => (
              <button 
                key={l} 
                onClick={() => setLang(l)}
                className={`px-2 py-1 rounded text-xs font-bold uppercase transition-all ${lang === l ? 'bg-orange-500 text-white' : 'hover:bg-white/10'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex flex-col items-center justify-center px-6 pt-20">
        <div className="text-center space-y-8 max-w-4xl">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-none">
            {t.challenge}
          </h1>
          <div className="inline-block glass px-6 py-2 rounded-full border border-orange-500/50 text-orange-400 font-bold mb-8">
             25 MARZO 2026 @ 17:00
          </div>
          <Countdown targetDate={targetDate} lang={lang} />
        </div>
      </section>

      {/* Secciones */}
      <div className="max-w-5xl mx-auto px-6 space-y-24 pb-32">
        {/* Qué */}
        <section id="que" className="glass p-8 md:p-12 rounded-3xl grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black mb-6 uppercase text-orange-500">{t.what}</h2>
            <p className="text-xl md:text-2xl leading-relaxed font-medium">
              {t.what_desc}
            </p>
          </div>
          <div className="flex justify-center">
            <img src="https://d1.awsstatic.com/training-and-certification/Certification%20Badges/AWS-Certified-Cloud-Practitioner_badge.634f8a21f78e34c31aa2c77d611639350c9b2ac4.png" alt="AWS JAM" className="h-48 drop-shadow-[0_0_30px_rgba(255,153,0,0.3)]" />
          </div>
        </section>

        {/* Quién */}
        <section id="qui" className="glass p-8 md:p-12 rounded-3xl border-r-4 border-orange-500">
          <h2 className="text-4xl font-black mb-6 uppercase text-orange-500">{t.who}</h2>
          <p className="text-xl md:text-3xl leading-relaxed">
            {t.who_desc}
            <span className="bg-orange-500 text-white px-2 py-1 rounded font-black inline-block mt-2 md:mt-0">
              {t.who_highlight}
            </span>
          </p>
        </section>

        {/* Cómo */}
        <section id="com" className="glass p-8 md:p-12 rounded-3xl text-center space-y-8">
          <h2 className="text-4xl font-black mb-6 uppercase text-orange-500">{t.how}</h2>
          <p className="text-xl md:text-2xl max-w-2xl mx-auto">
            {t.how_desc}
          </p>
          <a 
            href="https://forms.gle/pouSbVobFFxwHsC86" 
            target="_blank" 
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-black text-xl px-10 py-5 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-orange-500/20"
          >
            {t.how_btn}
          </a>
        </section>
      </div>

      <footer className="py-12 text-center text-white/40 text-sm">
        <div className="flex justify-center gap-8 mb-4">
           <img src="https://itb.cat/wp-content/uploads/2021/04/Logo-ITB-blanc.png" alt="ITB" className="h-8 grayscale opacity-50" />
        </div>
        <p>© 2026 AWS JAM State Competition - Barcelona Edition</p>
      </footer>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
