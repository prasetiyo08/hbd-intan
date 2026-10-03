import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const raindrops = Array.from({ length: 120 });

  return (
    <div className="w-full min-h-screen bg-pink-50 flex items-center justify-center p-0 m-0 font-quicksand relative overflow-x-hidden">
      
      {/* ====================================================
          CSS STYLING: HUJAN SUNSHOWER & ANIMASI ANIME
          ==================================================== */}
      <style>{`
        @keyframes rainfall {
          0% { 
            transform: translate(120px, -100px) rotate(40deg); 
            opacity: 0; 
          }
          15% { 
            opacity: 0.85; 
          }
          85% { 
            opacity: 0.85; 
          }
          100% { 
            transform: translate(-500px, 110vh) rotate(40deg); 
            opacity: 0; 
          }
        }
        .rain-drop {
          position: fixed;
          background: linear-gradient(to bottom, rgba(255, 185, 120, 0.9), rgba(255, 150, 100, 0.2));
          width: 2.5px;
          height: 35px;
          border-radius: 50% 50% 50% 0%; 
          pointer-events: none;
          z-index: 40;
          box-shadow: 0 0 6px rgba(255, 160, 60, 0.6);
          animation: rainfall linear infinite;
        }

        @keyframes floatCloud1 {
          0% { transform: translateX(-20px); }
          50% { transform: translateX(20px); }
          100% { transform: translateX(-20px); }
        }
        @keyframes pulseGlow {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.08); opacity: 1; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .cloud-1 { animation: floatCloud1 12s ease-in-out infinite; }
        .sun-sketch { animation: pulseGlow 6s ease-in-out infinite; }
        .star-twinkle { animation: twinkle 3s ease-in-out infinite; }
      `}</style>

      {/* RENDER PARTIKEL HUJAN */}
      {raindrops.map((_, i) => {
        const randomLeft = Math.random() * 160 - 30; 
        const randomDuration = Math.random() * 1.2 + 0.8; 
        const randomDelay = Math.random() * 5;

        return (
          <div
            key={i}
            className="rain-drop"
            style={{
              left: `${randomLeft}%`,
              top: '-80px',
              animationDuration: `${randomDuration}s`,
              animationDelay: `${randomDelay}s`,
            }}
          />
        );
      })}

      {/* DEKORASI SKETSA ANIME */}
      <div className="absolute top-4 right-6 z-20 pointer-events-none sun-sketch scale-75 md:scale-100">
        <svg width="60" height="60" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="25" stroke="#FFA726" strokeWidth="3" strokeDasharray="6 4" fill="#FFE0B2" fillOpacity="0.6"/>
          <path d="M50 15V5M50 85V95M15 50H5M95 50H85M25 25L18 18M82 82L75 75M25 75L18 82M82 18L75 25" stroke="#FFA726" strokeWidth="3" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="absolute top-4 left-6 z-20 pointer-events-none cloud-1 scale-75 md:scale-100">
        <svg width="100" height="50" viewBox="0 0 150 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M30 60H120C136.569 60 150 46.5685 150 30C150 13.4315 136.569 0 120 0C113.882 0 108.203 1.88812 103.419 5.15682C96.2925 1.99042 88.3582 0 80 0C60.67 0 44.408 13.518 40.852 31.545C37.585 30.547 34.053 30 30 30C13.431 30 0 43.431 0 60C0 76.569 13.431 90 30 90H120" stroke="#B0BEC5" strokeWidth="3" strokeDasharray="5 3" fill="white" fillOpacity="0.8"/>
        </svg>
      </div>

      {/* Sinar Matahari Sore (Z-30) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/25 via-pink-400/10 to-orange-400/25 pointer-events-none z-30 min-h-screen" />

      {/* 
        ====================================================
        CONTAINER UTAMA (BACKGROUND .PNG MENYESUAIKAN ISI KONTEN)
        ====================================================
      */}
      <div 
        className="w-full min-h-screen bg-cover bg-center bg-no-repeat z-10 flex flex-col justify-center items-center py-20 px-4 md:px-8"
        style={{ backgroundImage: "url('/bg-lucu.png')" }}
      >

        {/* --- MAIN CONTENT (OTOMATIS KOLOM DI PC, TERSUSUN KE BAWAH SAAT DI PERKECIL/HP) --- */}
        <div className="w-full max-w-[1300px] flex flex-col lg:flex-row gap-8 lg:gap-4 relative z-20 items-center lg:items-center justify-between">
          
          {/* KOLOM KIRI (FOTO A & STICKY NOTE) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full lg:w-[28%] flex flex-col items-center gap-4 order-2 lg:order-1"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white p-2.5 pb-10 rounded-sm shadow-md transform -rotate-3 relative w-[70%] sm:w-[50%] lg:w-[80%] max-w-[240px] cursor-pointer"
            >
              <div className="absolute -top-3 left-4 w-16 h-5 bg-pink-200/60 -rotate-6 z-10"></div>
              <img 
                src="https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/Anniv/A.JPG" 
                alt="Foto A" 
                className="w-full aspect-[4/5] object-cover bg-gray-100 rounded-sm" 
              />
              <p className="font-caveat text-xl text-center mt-2 text-gray-700 absolute bottom-2 w-full left-0">My biggest blessing ♡</p>
            </motion.div>

            <div className="flex items-end gap-2 w-[75%] justify-center">
              <div className="text-[3.5rem] animate-bounce">🐰</div>
              <motion.div 
                whileHover={{ scale: 1.08, rotate: 0 }}
                className="bg-[#e8f5e9] p-3 shadow-sm transform rotate-6 relative border border-green-100 w-28 cursor-pointer transition-transform"
              >
                <p className="font-caveat text-lg text-green-700 text-center leading-tight">
                  Always be happy my love ♡
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* KOLOM TENGAH (TEKS UTAMA) */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="w-full lg:w-[42%] flex flex-col items-center justify-center text-center order-1 lg:order-2 px-2"
          >
            <motion.h1 
              whileHover={{ scale: 1.03, color: "#ff5c9d" }}
              transition={{ type: "spring", stiffness: 400 }}
              className="font-fredoka text-4xl sm:text-5xl lg:text-6xl font-medium text-[#ff7eb3] leading-tight cursor-pointer drop-shadow-sm"
            >
              Happy 23rd<br/>Birthday!
            </motion.h1>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-md text-[#5cb85c] px-5 py-1.5 rounded-full font-fredoka text-lg lg:text-xl my-3 shadow-sm border border-green-100 cursor-pointer"
            >
              Intan Putri Wulandari 🌸
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="bg-white/70 backdrop-blur-md p-4 lg:p-5 rounded-2xl border border-white/80 shadow-sm max-w-lg cursor-pointer"
            >
              <p className="font-caveat text-gray-800 text-lg sm:text-xl lg:text-2xl leading-snug font-medium mb-3">
                Happy Birthday sayang!, tepat di tanggal 10 Oktober ini, kamu genap berusia 23 tahun, yeaay, Semoga di umur yang baru ini kamu semakin dewasa, sehat selalu, dan semua impian kamu terwujud ya cantik lucu malu malu akuuu.
              </p>
              <p className="font-caveat text-gray-800 text-lg sm:text-xl lg:text-2xl leading-snug font-medium">
                Makasih udah jadi warna terindah di hidup yo ya sayangg.<br/>
                Let's make this year as beautiful as you are.<br/>
                <span className="text-[#ff7eb3] font-bold mt-1 block">I love you! 💚🩷</span>
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.06, backgroundColor: "rgba(255, 255, 255, 0.95)" }}
              className="border border-pink-200 text-pink-500 px-5 py-1.5 rounded-full text-xs font-semibold mt-4 bg-white/90 shadow-sm cursor-pointer transition-colors"
            >
              ♡ 23 and still my favorite girl ♡
            </motion.div>
          </motion.div>

          {/* KOLOM KANAN (FOTO B & C SERTA CHECKLIST) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="w-full lg:w-[28%] flex flex-col items-center gap-4 order-3 lg:order-3"
          >
            <motion.p 
              whileHover={{ scale: 1.05, color: "#d97706" }}
              className="font-caveat text-lg text-gray-700 font-semibold text-center lg:text-right w-[80%] pr-0 lg:pr-2 leading-tight cursor-pointer transition-colors drop-shadow-sm"
            >
              Good things take time, just like us ♡
            </motion.p>

            <div className="relative w-full h-[190px] lg:h-[200px] flex justify-center">
              <motion.div 
                whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="absolute left-6 sm:left-24 lg:left-6 top-0 bg-white p-2 pb-8 rounded-sm shadow-md transform -rotate-6 w-[110px] lg:w-[120px] z-10 cursor-pointer"
              >
                <img 
                  src="https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/Anniv/B.jpeg" 
                  alt="Foto B" 
                  className="w-full aspect-square object-cover bg-gray-100" 
                />
                <p className="font-caveat text-sm text-center absolute bottom-1 w-full left-0 text-gray-600">More sunsets ♡</p>
              </motion.div>
              
              <motion.div 
                whileHover={{ scale: 1.08, rotate: 0, zIndex: 30 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="absolute right-6 sm:right-24 lg:right-6 top-10 bg-white p-2 pb-8 rounded-sm shadow-xl transform rotate-6 w-[110px] lg:w-[120px] z-20 cursor-pointer"
              >
                <img 
                  src="https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/Anniv/C.jpeg" 
                  alt="Foto C" 
                  className="w-full aspect-square object-cover bg-gray-100" 
                />
                <p className="font-caveat text-sm text-center absolute bottom-1 w-full left-0 text-pink-400">Pretty girl 🌸</p>
              </motion.div>
            </div>

            <div className="flex gap-3 items-end w-[85%] sm:w-[60%] lg:w-[85%] justify-center">
              <motion.div 
                whileHover={{ scale: 1.03 }}
                className="bg-white/85 backdrop-blur-md p-3 rounded-xl shadow-sm border border-pink-200 text-gray-800 space-y-1 font-medium flex-1 cursor-pointer"
              >
                <p className="font-caveat text-lg leading-tight hover:text-pink-500 transition-colors">✓ sehat selalu</p>
                <p className="font-caveat text-lg leading-tight hover:text-pink-500 transition-colors">✓ bahagia terus</p>
                <p className="font-caveat text-lg leading-tight hover:text-pink-500 transition-colors">✓ selalu jadi diri sendiri</p>
                <p className="font-caveat text-lg leading-tight hover:text-pink-500 transition-colors">✓ sukses dengan mimpi2nya</p>
                <p className="font-caveat text-lg leading-tight hover:text-pink-500 transition-colors">✓ kita selalu bersama ♡</p>
              </motion.div>
              <div className="text-4xl mb-1 animate-pulse">🎂</div>
            </div>

          </motion.div>

        </div>
      </div>

      {/* WIDGET MUSIK INTERAKTIF (Z-50) */}
      <div className="absolute top-3 right-3 lg:top-4 lg:right-4 z-50">
        <button 
          onClick={toggleMusic}
          className="bg-white/90 backdrop-blur-md border border-pink-300 px-3 py-1.5 lg:px-4 lg:py-2 rounded-full shadow-lg flex items-center gap-2 hover:bg-pink-50 transition-all cursor-pointer"
        >
          <span className={`text-base lg:text-xl ${isPlaying ? 'animate-spin' : ''}`}>🎵</span>
          <span className="text-xs lg:text-sm font-semibold text-pink-500">
            {isPlaying ? "Pause Music" : "Play Music 🎶"}
          </span>
        </button>
      </div>

      <audio 
        ref={audioRef}
        loop 
        src="https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/music/All%20We%20Are.mp3" 
      />
    </div>
  );
}

export default App;