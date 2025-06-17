import React, { useState, useEffect, useRef, type JSX } from "react";
import {
  Calendar,
  BookOpen,
  Music,
  VolumeX,
  MapPin,
  Gift,
  HandHeart,
} from "lucide-react";

const mainBgImage = "/assets/Main-bg.png";

const images = [
  "/assets/foto-1.jpg",
  "/assets/foto-2.jpg",
  "/assets/foto-3.jpg",
];

const aryaImages = [
  "/assets/foto-7.jpg",
  "/assets/foto-6.jpg",
  "/assets/foto-10.jpg",
  "/assets/foto-11.jpg",
];

const dewiImages = [
  "/assets/foto-8.jpg",
  "/assets/foto-9.jpg",
  "/assets/foto-12.jpg",
  "/assets/foto-13.jpg",
];

// Custom CSS untuk font, animasi, dan warna tema baru
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@300;400;500;600;700&display=swap');

  /* Definisi Warna Tema */
  :root {
    --color-primary: #B76E79; /* Merah kecoklatan / Mawar */
    --color-secondary: #FFE9E9; /* Pink sangat terang */
    --color-text-dark: #333333;
    --color-text-light: #FFFFFF;
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
  .font-inter { font-family: 'Inter', sans-serif; }
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
      <audio ref={audioRef} loop src="/assets/puppy-love.mp3" />
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

// Komponen Halaman Sampul Awal
interface CoverPageProps {
  invitedName: string;
  onOpenInvitation: () => void;
}

const CoverPage: React.FC<CoverPageProps> = ({
  invitedName,
  onOpenInvitation,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`relative h-screen w-screen flex flex-col items-center justify-center bg-cover bg-center text-white p-4`}
    >
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-out-in ${
            index === currentIndex ? "opacity-100 z-10" : "opacity-40 z-0"
          }`}
          style={{
            backgroundImage: `url(${img})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black opacity-50"></div>
        </div>
      ))}

      <div className="relative z-20 flex flex-col items-center p-6 text-center max-w-lg mx-auto h-full">
        {/* Bagian Atas */}
        <div className="flex-1 flex flex-col justify-end">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 animate-fade-in-down drop-shadow-lg">
            Perayaan Cinta
          </h1>
          <p className="text-4xl sm:text-5xl md:text-7xl font-great-vibes mb-4 animate-fade-in-up drop-shadow-lg">
            Dewi & Arya
          </p>
        </div>

        {/* Spacer tengah untuk show background */}
        <div className="h-72 sm:h-88 md:h-104 lg:h-120 xl:h-136"></div>

        {/* Bagian Bawah */}
        <div className="flex-1 flex flex-col items-center justify-start">
          <p className="text-base sm:text-lg md:text-xl mb-2 animate-fade-in drop-shadow-md">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </p>
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 animate-fade-in-slow drop-shadow-lg">
            {invitedName}
          </p>
          <button
            onClick={onOpenInvitation}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 animate-bounce-in text-base sm:text-lg"
          >
            Buka Undangan
          </button>
        </div>
      </div>
    </div>
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

// Komponen Halaman Utama Undangan
interface MainInvitationProps {
  invitedName: string;
}

const MainInvitation: React.FC<MainInvitationProps> = ({ invitedName }) => {
  const [activeSection, setActiveSection] = useState("home");
  const sections = [
    { id: "pengantin", icon: <HandHeart size={20} />, label: "Home" },
    { id: "cerita", icon: <BookOpen size={20} />, label: "Kisah" },
    { id: "acara", icon: <Calendar size={20} />, label: "Acara" },
    { id: "lokasi", icon: <MapPin size={20} />, label: "Lokasi" },
    { id: "hadiah", icon: <Gift size={20} />, label: "Hadiah" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      <MusicPlayer />
      {/* Bagian Sampul Utama (tetap di atas) */}
      <section
        id="home"
        className={`relative w-screen flex flex-col items-center justify-center bg-cover bg-center text-white p-4 duration-1000`}
        style={{ height: "100dvh", minHeight: "100vh" }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-out-in ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-40 z-0"
            }`}
            style={{
              backgroundImage: `url(${img})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </div>
        ))}
        <div className="relative z-20 flex flex-col items-center p-6 text-center max-w-lg mx-auto h-full">
          {/* Bagian Atas */}
          <div className="flex-1 flex flex-col justify-end">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2 animate-fade-in-down drop-shadow-lg">
              Perayaan Cinta
            </h1>
            <p className="text-4xl sm:text-5xl md:text-7xl font-great-vibes mb-4 animate-fade-in-up drop-shadow-lg">
              Dewi & Arya
            </p>
          </div>

          {/* Spacer tengah untuk show background */}
          <div className="h-72 sm:h-88 md:h-104 lg:h-120 xl:h-136"></div>

          {/* Bagian Bawah */}
          <div className="flex-1 flex flex-col items-center justify-start">
            <p className="text-base sm:text-lg md:text-xl mb-2 animate-fade-in drop-shadow-md">
              Kepada Yth. Bapak/Ibu/Saudara/i:
            </p>
            <p className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-6 animate-fade-in-slow drop-shadow-lg">
              {invitedName}
            </p>
          </div>
        </div>
      </section>
      {/* Konten Utama Undangan dengan background baru */}
      <div
        className="w-screen mx-auto px-4 py-12 relative z-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${mainBgImage})`,
          backgroundAttachment: "fixed",
        }}
      >
        <div className="relative z-20">
          {/* Pastikan konten di atas overlay */}
          <SectionPengantin />
          <SectionCerita />
          <SectionGaleri />
          <CountdownTimer targetDate="2025-06-22T00:00:00" />
          <SectionAcara />
          <SectionLokasi />
          <SectionKirimHadiah />
          <Footer />
        </div>
      </div>

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
  );
};

// Komponen Bagian Mempelai
const SectionPengantin: React.FC = () => {
  const [aryaIndex, setAryaIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAryaIndex((prevIndex) => (prevIndex + 1) % aryaImages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const [dewiIndex, setDewiIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDewiIndex((prevIndex) => (prevIndex + 1) % dewiImages.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

      <div className="flex flex-col md:flex-row justify-center items-center gap-12">
        {/* Dewi */}
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md w-full md:w-auto">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[var(--color-primary)] shadow-lg mb-4 relative">
            {dewiImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Dewi ${i + 1}`}
                className={`absolute w-full h-full object-cover ${
                  i === dewiIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          <h3 className="text-3xl font-great-vibes text-[var(--color-primary)] mb-2">
            Dewi Fortuna
          </h3>
          <p className="text-gray-600">
            Putri dari Bapak Agus Hariyoto & Ibu Suwiyah
          </p>
        </div>

        <span className="text-5xl font-great-vibes text-[var(--color-primary)]">
          &
        </span>

        {/* Arya */}
        <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md w-full md:w-auto">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[var(--color-primary)] shadow-lg mb-4 relative">
            {aryaImages.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`Arya ${i + 1}`}
                className={`absolute w-full h-full object-cover transition-opacity duration-800 ${
                  i === aryaIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          <h3 className="text-3xl font-great-vibes text-[var(--color-primary)] mb-2">
            Arya Bintang Samudra
          </h3>
          <p className="text-gray-600">
            Putra dari Bapak Imam Mawarto & Ibu Sriwahyuni
          </p>
        </div>
      </div>
    </section>
  );
};

// Komponen Bagian Kisah Cinta
const SectionCerita: React.FC = () => {
  const stories = [
    {
      title: "Awal Pertemuan",
      description: `Siapa sangka, berawal dari WhatsApp iseng Dewi sepulang kerja pada tahun 2023, "Kamu suka bunga?", benih cinta kami mulai bersemi. Obrolan ringan itu berlanjut menjadi chat yang intens, hingga kami merasa nyaman satu sama lain. Pertemuan tak terduga inilah yang menjadi awal segalanya.`,
    },
    {
      title: "Ikatan Janji Suci",
      description:
        "Cinta yang tak bisa dibendung ini membawa kami pada sebuah janji. Pada bulan Februari 2024, kami memutuskan untuk melangkah ke jenjang pernikahan siri, mengikat janji suci di hadapan Tuhan dan keluarga terdekat. Kami memilih jalan ini demi keberkahan yang lebih cepat, sambil menunggu waktu yang tepat untuk menikah resmi. Sebuah awal baru yang sakral bagi kami berdua.",
    },
    {
      title: "Kehadiran Malaikat Kecil",
      description:
        "Tiada yang sangka ternyata kebahagiaan kami semakin lengkap dengan kehadiran malaikat kecil di bulan Januari 2025. Putra kami, Kaivan Aryendra Samudra, lahir, mengisi hari-hari kami dengan tawa dan kehangatan yang tak terhingga. Ia adalah pelengkap cerita cinta kami.",
    },
    {
      title: "Pengesahan Cinta Kami",
      description:
        "Mengukuhkan ikatan cinta kami secara resmi di mata negara, pada bulan Februari 2025 kami mendaftarkan pernikahan kami secara sah di hadapan pemerintah. Ini adalah langkah penting untuk melengkapi perjalanan cinta kami.",
    },
    {
      title: "Harapan Kami",
      description:
        "Kisah cinta kasih kami akan terus berlanjut, membentuk cerita baru yang lebih indah, dengan harapan setiap langkah yang kami lalui bersama membawa kedamaian, kebahagiaan, dan cinta yang abadi.",
    },
  ];

  return (
    <section
      id="cerita"
      className="py-16 bg-white/1 frosted-card rounded-lg shadow-xl mb-12 px-4 animate-fade-in-up"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-great-vibes text-[var(--color-primary)] mb-4">
          Kisah Cinta Kami
        </h2>
        <p className="text-lg text-[var(--color-text-dark)] max-w-2xl mx-auto">
          Perjalanan cinta kami yang akan terus bertambah seterusnya
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Garis Waktu (Timeline Line) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-[var(--color-primary)] rounded-full hidden md:block"></div>

        {stories.map((story, index) => (
          <div
            key={index}
            className={`mb-8 flex items-center w-full ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            <div className="flex-1 text-center md:text-left p-4">
              <div
                className={`bg-[var(--color-secondary)] p-6 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300 animate-fade-in ${
                  index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
                }`}
              >
                <h3 className="text-xl font-semibold text-[var(--color-primary)] mb-2">
                  {story.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2"></p>
                <p className="text-gray-700">{story.description}</p>
              </div>
            </div>
            {/* Titik Waktu (Timeline Dot) */}
            <div className="hidden md:block w-8 h-8 bg-[var(--color-primary)] rounded-full border-4 border-white shadow-lg z-10"></div>
            <div className="flex-1 hidden md:block"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Komponen Bagian Galeri Foto
const SectionGaleri: React.FC = () => {
  const images = [
    "/assets/foto-4.jpg",
    "/assets/foto-14.jpg",
    "/assets/foto-16.jpg",
    "/assets/foto-5.jpg",
    "/assets/foto-17.jpeg",
    "/assets/foto-15.jpg",
  ];

  return (
    <section
      id="galeri"
      className="py-16 bg-white/1 frosted-card rounded-lg shadow-xl mb-12 px-4 animate-fade-in-up"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-great-vibes text-[var(--color-primary)] mb-4">
          Galeri Foto
        </h2>
        <p className="text-lg text-[var(--color-text-dark)] max-w-2xl mx-auto">
          Momen-momen indah perjalanan kami
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-2 gap-y-4">
        {images.map((src, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-lg shadow-md group transform hover:scale-[1.02] transition-transform duration-300"
          >
            <img
              src={src}
              alt={`Momen ${index + 1}`}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="text-white text-sm font-medium">
                Momen Indah {index + 1}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

// Komponen Bagian Acara
const SectionAcara: React.FC = () => {
  return (
    <section
      id="acara"
      className="py-16 bg-white/1 frosted-card rounded-lg shadow-xl mb-12 px-4 animate-fade-in-up"
    >
      <div className="text-center mb-12">
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
          <p className="text-gray-700 mb-2">Sabtu, 21 Juni 2025</p>
          <p className="text-gray-700 mb-2">Pukul 09:00 s.d Selesai</p>
        </div>

        <div className="flex-1 p-6 bg-[var(--color-secondary)] rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold text-[var(--color-primary)] mb-4">
            Resepsi
          </h3>
          <p className="text-gray-700 mb-2">Ahad, 22 Juni 2025</p>
          <p className="text-gray-700 mb-2">Pukul 09:00 s.d Selesai</p>
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
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d989.0935879844401!2d109.48207526952662!3d-7.423757999536665!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zN8KwMjUnMjUuNSJTIDEwOcKwMjgnNTcuOCJF!5e0!3m2!1sen!2sid!4v1749222485622!5m2!1sen!2sid"
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
          href="https://maps.app.goo.gl/1kzqMZzHBUSM8u276"
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
  const [copiedBCA1, setCopiedBCA1] = useState(false);
  const [copiedBCA2, setCopiedBCA2] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const copyToClipboard = (text: string, message: string) => {
    const el = document.createElement("textarea");
    el.value = text;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    // Modified to use a custom alert message, as window.alert is disallowed
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
    Rumah Dewi Fortuna
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
        <div className="flex-1 p-6 bg-white rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-semibold text-[var(--color-primary)] mb-6 text-center">
            Cashless
          </h3>

          {/* Rekening Arya */}
          <div className="flex items-start gap-4 mb-8">
            <img
              src="/assets/Logo-BCA.png"
              alt="Logo BCA"
              className="h-24 w-24 object-contain border-2 border-[var(--color-primary)] p-1 rounded-full"
            />
            <div className="flex-1">
              <p className="text-gray-700 font-medium">
                A.N. Arya Bintang Samudra
              </p>
              <p className="text-gray-700 text-sm mb-2">
                No. Rek: 0462 8048 71
              </p>
              <button
                onClick={() => {
                  copyToClipboard(
                    "0462804871",
                    "Nomor rekening BCA Arya berhasil disalin!"
                  );
                  setCopiedBCA1(true);
                }}
                className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
                  copiedBCA1
                    ? "bg-white text-[var(--color-primary)] border-[var(--color-primary)]"
                    : "bg-[var(--color-primary)] text-white border-transparent"
                }`}
              >
                {copiedBCA1 ? "Tersalin!" : "Salin No. Rek"}
              </button>
            </div>
          </div>

          {/* Rekening Dewi */}
          <div className="flex items-start gap-4">
            <img
              src="/assets/Logo-BCA.png"
              alt="Logo BCA"
              className="h-24 w-24 object-contain border-2 border-[var(--color-primary)] p-1 rounded-full"
            />
            <div className="flex-1">
              <p className="text-gray-700 font-medium">A.N. Dewi Fortuna</p>
              <p className="text-gray-700 text-sm mb-2">
                No. Rek: 0971 1226 24
              </p>
              <button
                onClick={() => {
                  copyToClipboard(
                    "0971122624",
                    "Nomor rekening BCA Dewi berhasil disalin!"
                  );
                  setCopiedBCA2(true);
                }}
                className={`px-4 py-2 rounded-full border text-sm transition-all duration-300 ${
                  copiedBCA2
                    ? "bg-white text-[var(--color-primary)] border-[var(--color-primary)]"
                    : "bg-[var(--color-primary)] text-white border-transparent"
                }`}
              >
                {copiedBCA2 ? "Tersalin!" : "Salin No. Rek"}
              </button>
            </div>
          </div>
        </div>
        <div className="p-6 bg-white rounded-lg shadow-md text-center max-w-lg mx-auto transform hover:scale-105 transition-transform duration-300">
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
      <div className="mb-12 w-fit item-center py-3 px-4 bg-white/1 frosted-card rounded-full shadow-xl text-center text-sm text-black animate-fade-in-up">
        Made with 🫶🏻 by <span className="text-black font-bold">Arya-Dewi</span>
      </div>
    </div>
  );
};

// Komponen Utama Aplikasi
function App() {
  const [showMainInvitation, setShowMainInvitation] = useState(false);
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

  const handleOpenInvitation = () => {
    setShowMainInvitation(true);
    setTimeout(() => {
      const audio = document.querySelector("audio") as HTMLAudioElement;
      if (audio) {
        audio.play().catch(() => {});
      }
    }, 300);
  };

  return (
    <>
      {/* Menambahkan gaya global secara langsung */}
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      <div className="min-h-screen bg-gray-50 font-inter text-[var(--color-text-dark)] antialiased">
        {!showMainInvitation ? (
          <CoverPage
            invitedName={invitedName}
            onOpenInvitation={handleOpenInvitation}
          />
        ) : (
          <MainInvitation invitedName={invitedName} />
        )}
      </div>
    </>
  );
}

export default App;
