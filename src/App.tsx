import React, { useState, useEffect, useRef, type JSX } from "react";
import {
  Calendar,
  Music,
  VolumeX,
  MapPin,
  Gift,
  HandHeart,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const mainBgImage = "/assets/Main-bg.png";
const bgImage = "/assets/bg-image.png";

// Custom CSS untuk font, animasi, dan warna tema baru
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Nunito:wght@300;400;500;600;700&display=swap');

  /* Definisi Warna Tema Baru */
  :root {
    --color-primary: #8C8C8C;     /* Abu-abu tua lembut */
    --color-secondary: #FFF8FD;   /* Pink muda lembut */
    --color-text-dark: #4A4A4A;   /* Abu-abu gelap untuk teks utama */
    --color-text-light: #FFFFFF;  /* Putih untuk teks kontras */
    --frosted-blur-amount: 10px;
  }

  /* Definisi Keyframe Animasi */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes bounceIn {
    0% { transform: scale(0.3); opacity: 0; }
    50% { transform: scale(1.05); opacity: 1; }
    70% { transform: scale(0.9); }
    100% { transform: scale(1); }
  }

  /* Font Kustom */
  .font { font-family: 'Nunito', sans-serif; }
  .font-great-vibes { font-family: 'Great Vibes', cursive; }

  html {
    scroll-behavior: smooth; /* Untuk smooth scrolling saat navigasi */
  }

  /* Efek Frosted Glass untuk Card */
  .frosted-card {
    backdrop-filter: blur(var(--frosted-blur-amount));
    -webkit-backdrop-filter: blur(var(--frosted-blur-amount)); /* Untuk Safari compatibility */
  }

  @keyframes fadeOutScaleCenter {
    from { opacity: 1; transform: scale(1); }
    to   { opacity: 0; transform: scale(0.95); }
  }

  .animate-fadeOutScaleCenter {
    animation: fadeOutScaleCenter 0.6s ease-in-out forwards;
  }
`;

// Komponen Musik
const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (audioRef.current && !hasInteracted) {
      audioRef.current.muted = false;
      audioRef.current.volume = 1;
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => console.log("Autoplay dicegah:", error));
    }
  }, [hasInteracted]);

  const toggleMusic = () => {
    if (audioRef.current) {
      setHasInteracted(true);

      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.muted = true;
        setIsPlaying(false);
      } else {
        audioRef.current
          .play()
          .catch((error) => console.log("Gagal memutar:", error));
        audioRef.current.muted = false;
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="fixed top-4 right-4 z-50 flex space-x-2">
      <audio ref={audioRef} loop src="/assets/op-gamelan.mp3" />
      <button
        onClick={toggleMusic}
        className="p-3 rounded-full bg-[var(--color-primary)] text-white shadow-lg hover:bg-opacity-90 transition-all duration-200"
        aria-label={
          isPlaying && !audioRef.current?.muted
            ? "Jeda dan mute musik"
            : "Putar dan unmute musik"
        }
      >
        {isPlaying && !audioRef.current?.muted ? (
          <Music size={20} />
        ) : (
          <VolumeX size={20} />
        )}
      </button>
    </div>
  );
};

// Komponen Utama Undangan
interface MainInvitationProps {
  invitedName: string;
}

const MainInvitation: React.FC<MainInvitationProps> = ({ invitedName }) => {
  const [startZoom, setStartZoom] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const [activeSection, setActiveSection] = useState("home");
  const sections = [
    { id: "home", icon: <HandHeart size={20} />, label: "Home" },
    { id: "pengantin", icon: <HandHeart size={20} />, label: "Pengantin" },
    { id: "acara", icon: <Calendar size={20} />, label: "Acara" },
    { id: "lokasi", icon: <MapPin size={20} />, label: "Lokasi" },
    { id: "hadiah", icon: <Gift size={20} />, label: "Hadiah" },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* Background utama selalu ada */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${mainBgImage})` }}
      />

      {/* COVER */}
      <AnimatePresence>
        {!showContent && (
          <motion.div
            key="cover"
            className="fixed inset-0 z-50 flex items-center justify-center"
          >
            <motion.img
              src="assets/entrance.png"
              alt="Cover Window"
              className="absolute inset-0 w-screen h-screen object-cover"
              initial={{ scale: 1, opacity: 1 }}
              animate={
                startZoom ? { scale: 3, opacity: 0 } : { scale: 1, opacity: 1 }
              }
              transition={{ duration: 2, ease: "easeInOut" }}
              onAnimationComplete={() => {
                if (startZoom) setShowContent(true);
              }}
            />

            {!startZoom && (
              <button
                onClick={() => setStartZoom(true)}
                className="absolute bottom-24 z-20 px-6 py-3 bg-[var(--color-primary)] text-[var(--color-text-light)] rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105"
              >
                Buka Undangan
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      {startZoom && <MusicPlayer />}

      {/* MAIN CONTENT */}
      {showContent && (
        <div className="relative">
          {/* Background umum yang selalu fixed */}
          <div
            className="fixed inset-0 -z-10 bg-cover bg-center"
            style={{ backgroundImage: `url(${bgImage})` }}
          />

          {/* HOME / INTRO TEXT */}
          <section
            id="home"
            className="relative w-screen flex flex-col items-center justify-center text-[var(--color-text-light)] p-6 min-h-screen"
          >
            {/* Overlay khusus home */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${mainBgImage})` }}
            />

            <div className="relative z-20 flex flex-col items-center p-6 text-center max-w-lg mx-auto h-full">
              {/* Bagian Atas */}
              <div className="flex-1 flex flex-col justify-end">
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 drop-shadow-lg">
                  Perayaan Cinta
                </h1>
                <p className="text-6xl sm:text-7xl md:text-8xl font-great-vibes mb-4 drop-shadow-lg">
                  Feri & Usy
                </p>
              </div>

              {/* Spacer tengah */}
              <div className="h-[20rem] sm:h-[22rem] md:h-[28rem] lg:h-[30rem] xl:h-[34rem]"></div>

              {/* Bagian Bawah */}
              <div className="flex-1 flex flex-col items-center justify-start">
                <p className="text-base sm:text-lg md:text-xl mb-2 drop-shadow-md">
                  Kepada Yth. Bapak/Ibu/Saudara/i:
                </p>
                <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 drop-shadow-lg">
                  {invitedName}
                </p>
              </div>
            </div>
          </section>

          {/* SECTION PENGANTIN */}
          <div id="pengantin">
            <SectionPengantin />
          </div>
          <CountdownTimer targetDate="2025-09-01T10:00:00+07:00" />
          <div id="acara">
            <SectionAcara />
          </div>
          <div id="lokasi">
            <SectionLokasi />
          </div>
          <div id="hadiah">
            <SectionKirimHadiah />
          </div>
          <Footer />

          {/* NAVBAR */}
          <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[90%] max-w-md bg-[var(--color-primary)] text-white shadow-lg z-50 rounded-full py-1 px-4">
            <ul className="flex justify-evenly items-center w-full">
              {sections.map((section) => (
                <li key={section.id} className="flex-1 text-center">
                  <button
                    onClick={() => scrollToSection(section.id)}
                    className={`flex flex-col items-center justify-center p-2 gap-0.5 min-w-[60px] sm:min-w-[72px] rounded-full border transition-all duration-300 ${
                      activeSection === section.id
                        ? "bg-white text-[var(--color-primary)] border-[var(--color-primary)]"
                        : "text-white border-transparent"
                    }`}
                  >
                    <span className="w-5 h-5 flex items-center justify-center">
                      {section.icon}
                    </span>
                    <span className="mt-0.5 text-[11px] sm:text-xs h-5 overflow-hidden text-ellipsis whitespace-nowrap">
                      {section.label}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

// Komponen Bagian Mempelai
const SectionPengantin: React.FC = () => {
  return (
    <section
      id="pengantin"
      className="py-16 bg-white/1 frosted-card rounded-lg shadow-xl mb-12 px-4 animate-fade-in-up"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-great-vibes text-[var(--color-primary)] mb-4">
          ٱلسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللّٰهِ وَبَرَكَاتُهُ
        </h2>
        <p className="text-lg text-[var(--color-text-dark)] max-w-2xl mx-auto">
          Dengan hormat kami mengundang Bapak/Ibu/Saudara/i untuk hadir dalam
          acara perayaan pernikahan kami
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center gap-4">
        {/* Dewi */}
        <div className="flex flex-col items-center text-center p-6 bg-[var(--color-secondary)] rounded-lg shadow-md w-full md:w-auto">
          <h3 className="text-5xl font-great-vibes text-[var(--color-primary)] mb-2">
            Feri Ardiansa
          </h3>
          <p className="text-gray-600">
            Putra dari Bapak Sechudin & Ibu Supriatun
          </p>
        </div>

        <span className="text-5xl font-great-vibes text-[var(--color-primary)]">
          &
        </span>

        {/* Arya */}
        <div className="flex flex-col items-center text-center p-6 bg-[var(--color-secondary)] rounded-lg shadow-md w-full md:w-auto">
          <h3 className="text-5xl font-great-vibes text-[var(--color-primary)] mb-2">
            Amalia Usy Sarofi
          </h3>
          <p className="text-gray-600">
            Putri dari Bapak Sartono & Ibu Suswati
          </p>
        </div>
      </div>
    </section>
  );
};

// Komponen Hitung Mundur
interface CountdownTimerProps {
  targetDate: string;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ targetDate }) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(targetDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      // Use setInterval for continuous updates
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer); // Clear interval on component unmount
  }, [targetDate]); // Recalculate if targetDate changes

  const timerComponents: JSX.Element[] = [];

  Object.keys(timeLeft).forEach((interval) => {
    if ((timeLeft as any)[interval] !== undefined) {
      // Check for undefined, not just truthy
      timerComponents.push(
        <div
          key={interval}
          className="flex flex-col items-center mx-2 p-3 bg-[var(--color-secondary)] rounded-lg shadow-md"
        >
          <span className="text-2xl md:text-3xl font-bold text-[var(--color-primary)]">
            {(timeLeft as any)[interval] < 10 &&
            (timeLeft as any)[interval] >= 0
              ? "0" + (timeLeft as any)[interval]
              : (timeLeft as any)[interval]}
          </span>
          <span className="text-xs md:text-sm text-gray-600">
            {interval.charAt(0).toUpperCase() + interval.slice(1)}
          </span>
        </div>
      );
    }
  });

  return (
    <div className="text-center mb-8 animate-fade-in-up">
      <h3 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
        Hitung Mundur Menuju Hari-H
      </h3>
      <div className="flex justify-center">
        {timerComponents.length ? (
          timerComponents
        ) : (
          <span className="text-lg text-gray-700">Waktu telah tiba!</span>
        )}
      </div>
    </div>
  );
};

// Komponen Bagian Acara
const SectionAcara: React.FC = () => {
  return (
    <section
      id="acara"
      className="py-16 bg-white/1 frosted-card rounded-lg shadow-xl mb-12 px-4 animate-fade-in-up"
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-great-vibes text-[var(--color-primary)] mb-4">
          Waktu Acara Perayaan
        </h2>
        <p className="text-lg text-[var(--color-text-dark)] max-w-2xl mx-auto">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami, apabila
          Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
        <div className="flex-1 p-6 bg-[var(--color-secondary)] rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
            Tasyakuran
          </h3>
          <p className="text-gray-700 mb-2">Sabtu & Minggu</p>
          <p className="text-gray-700 mb-2 font-bold">30 & 31 Agustus 2025</p>
          <p className="text-gray-700 mb-2">Pukul 09:00 s.d Selesai</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
        <div className="flex-1 p-6 bg-[var(--color-secondary)] rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
            Akad & Resepsi
          </h3>
          <p className="text-gray-700 mb-2">Senin</p>
          <p className="text-gray-700 mb-2 font-bold">01 September 2025</p>
          <p className="text-gray-700 mb-2">Pukul 10:00 s.d Selesai</p>
        </div>
      </div>
    </section>
  );
};

// Komponen Bagian Lokasi (Google Maps Embed)
const SectionLokasi: React.FC = () => {
  return (
    <section
      id="lokasi"
      className="py-16 bg-white/1 frosted-card rounded-lg shadow-xl mb-12 px-4 animate-fade-in-up"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-great-vibes text-[var(--color-primary)] mb-4">
          Denah Lokasi
        </h2>
        <p className="text-lg text-[var(--color-text-dark)] max-w-2xl mx-auto">
          Kami menantikan kehadiran Anda di hari bahagia kami
        </p>
      </div>

      <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
        {/* Google Maps Embed untuk lokasi yang diminta */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d558.1292468430005!2d109.482945!3d-7.423466552284211!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMjUnMjQuNCJTIDEwOcKwMjgnNTguNiJF!5e0!3m2!1sid!2sid!4v1755925125307!5m2!1sid!2sid"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lokasi Perayaan"
        ></iframe>
      </div>
      <p className="text-center text-sm text-gray-600 mt-4">
        Jl. Wanasida, Dusun 3, Kebutuh, Bukateja
      </p>
      <div className="text-center mt-4">
        <a
          href="https://maps.app.goo.gl/MWkL5JNBcv4sp8q78"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block px-6 py-2 bg-[var(--color-primary)] text-white rounded-full hover:bg-opacity-90 duration-300"
        >
          Lihat Lokasi Perayaan
        </a>
      </div>
    </section>
  );
};

// Komponen Bagian Kirim Hadiah (Cashless)
const SectionKirimHadiah: React.FC = () => {
  const [copiedBNI1, setCopiedBNI1] = useState(false);
  const [copiedBNI2, setCopiedBNI2] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const copyToClipboard = async (text: string, message: string) => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
      } else {
        // Fallback for older browsers
        const el = document.createElement("textarea");
        el.value = text;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
    } catch (err) {
      // Optionally handle error
    }
    // Custom alert message
    const customAlert = document.createElement("div");
    customAlert.className =
      "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]";
    customAlert.innerHTML = `
      <div class="bg-white p-6 rounded-lg shadow-xl text-center max-w-sm mx-auto animate-fade-in-up">
        <p class="text-lg font-semibold text-gray-800 mb-4">${message}</p>
        <button class="px-6 py-2 bg-[var(--color-primary)] text-white rounded-full hover:bg-opacity-90 transition-colors duration-300" onclick="this.parentNode.parentNode.remove()">OK</button>
      </div>
    `;
    document.body.appendChild(customAlert);
  };

  const address = `
    Rumah Amalia Usy Sarofi
    Jl. Wanasida, Dusun 3
    Kebutuh, Bukateja
    Purbalingga, Jawa Tengah
    53382
  `.trim();

  return (
    <section
      id="hadiah"
      className="py-16 bg-white/1 frosted-card rounded-lg shadow-xl mb-4 px-4 animate-fade-in-up"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-great-vibes text-[var(--color-primary)] mb-4">
          Kirim Hadiah
        </h2>
        <p className="text-lg text-[var(--color-text-dark)] max-w-2xl mx-auto">
          Doa restu Anda adalah karunia terindah bagi kami. Namun jika Anda
          ingin berbagi kebahagiaan dalam bentuk lain, Anda dapat menggunakan
          opsi berikut:
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-stretch gap-8">
        {/* Transfer Bank */}
        <div className="bg-[var(--color-secondary)] flex-1 p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold text-[var(--color-primary)] mb-6 text-center">
            Cashless
          </h3>

          {/* Rekening Arya */}
          <div className="flex items-start gap-4 mb-8">
            <img
              src="/assets/Logo-BNI.png"
              alt="Logo BNI"
              className="h-24 w-24 object-contain border-2 border-[var(--color-primary)] p-1 rounded-full"
            />
            <div className="flex-1">
              <p className="text-gray-700 font-medium">A.N. Feri Ardiansa</p>
              <p className="text-gray-700 text-sm mb-2">No. Rek: 0841418578</p>
              <button
                onClick={() => {
                  copyToClipboard(
                    "0841418578",
                    "Nomor rekening BNI feri berhasil disalin!"
                  );
                  setCopiedBNI1(true);
                }}
                className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
                  copiedBNI1
                    ? "bg-white text-[var(--color-primary)] border-[var(--color-primary)]"
                    : "bg-[var(--color-primary)] text-white border-transparent"
                }`}
              >
                {copiedBNI1 ? "Tersalin!" : "Salin No. Rek"}
              </button>
            </div>
          </div>

          {/* Rekening Dewi */}
          <div className="flex items-start gap-4">
            <img
              src="/assets/Logo-BNI.png"
              alt="Logo BNI"
              className="h-24 w-24 object-contain border-2 border-[var(--color-primary)] p-1 rounded-full"
            />
            <div className="flex-1">
              <p className="text-gray-700 font-medium">
                A.N. Amalia Usy Sarofi
              </p>
              <p className="text-gray-700 text-sm mb-2">No. Rek: 1398471402</p>
              <button
                onClick={() => {
                  copyToClipboard(
                    "1398471402",
                    "Nomor rekening BNI Usy berhasil disalin!"
                  );
                  setCopiedBNI2(true);
                }}
                className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
                  copiedBNI2
                    ? "bg-white text-[var(--color-primary)] border-[var(--color-primary)]"
                    : "bg-[var(--color-primary)] text-white border-transparent"
                }`}
              >
                {copiedBNI2 ? "Tersalin!" : "Salin No. Rek"}
              </button>
            </div>
          </div>
        </div>
        <div className="bg-[var(--color-secondary)] p-6 rounded-lg shadow-md text-center max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
            Alamat Pengiriman Kado
          </h3>
          <p className="text-gray-700 text-lg whitespace-pre-line mb-4">
            {address}
          </p>
          <button
            onClick={() => {
              copyToClipboard(address, "Alamat berhasil disalin!");
              setCopiedAddress(true);
            }}
            className={`mt-4 inline-block px-6 py-2 rounded-full border transition-all duration-300 ${
              copiedAddress
                ? "bg-white text-[var(--color-primary)] border-[var(--color-primary)]"
                : "bg-[var(--color-primary)] text-white border-transparent"
            }`}
          >
            {copiedAddress ? "Tersalin!" : "Salin Alamat"}
          </button>
          <p className="text-gray-600 text-sm mt-4">
            Mohon konfirmasi pengiriman ke kontak mempelai jika sudah
            mengirimkan kado yaa
          </p>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <div className="flex justify-center">
      <div className="mb-28 w-fit item-center py-3 px-4 bg-white/1 frosted-card rounded-full shadow-xl text-center text-sm text-black animate-fade-in-up">
        Made with 🫶🏻 by <span className="text-black font-bold">Arya-Dewi</span>
      </div>
    </div>
  );
};

// Komponen Utama Aplikasi
function App() {
  const [invitedName, setInvitedName] = useState("Tamu Undangan");

  useEffect(() => {
    // Memuat Tailwind CSS dari CDN
    const tailwindScript = document.createElement("script");
    tailwindScript.src = "https://cdn.tailwindcss.com";
    tailwindScript.onload = () => {
      // Setelah Tailwind dimuat, tambahkan konfigurasi kustom jika diperlukan
      // Untuk kasus ini, kita mengandalkan kelas utilitas dan CSS global di atas
    };
    document.head.appendChild(tailwindScript);

    // Memuat nama tamu dari parameter URL
    const params = new URLSearchParams(window.location.search);
    const name = params.get("to");
    if (name) {
      setInvitedName(decodeURIComponent(name.replace(/\+/g, " ")));
    }
  }, []);

  return (
    <>
      {/* Menambahkan gaya global secara langsung */}
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div className="min-h-screen bg-gray-50 font-inter text-[var(--color-text-dark)] antialiased">
        <MainInvitation invitedName={invitedName} />
      </div>
    </>
  );
}

export default App;
