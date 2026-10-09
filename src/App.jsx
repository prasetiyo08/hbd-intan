import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- KOMPONEN HUJAN TETESAN AIR PLASTIK HITAM LEMBUT (OPASITAS 40%) ---
const FloatingRain = () => {
  const raindrops = Array.from({ length: 110 }).map((_, i) => ({
    id: i,
    width: Math.random() * 3.5 + 2, 
    height: Math.random() * 30 + 18, 
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 1.2 + 0.9, 
  }));

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 45, overflow: 'hidden' }}>
      {raindrops.map((drop) => (
        <motion.div
          key={drop.id}
          initial={{ opacity: 0, y: -50, x: `${drop.x}vw` }}
          animate={{ opacity: [0, 0.40, 0.40, 0], y: '100vh' }}
          transition={{ duration: drop.duration, delay: drop.delay, ease: 'linear', repeat: Infinity }}
          style={{
            position: 'absolute',
            top: 0,
            width: `${drop.width}px`,
            height: `${drop.height}px`,
            backgroundColor: 'rgba(30, 30, 30, 0.40)',
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.2), 0 1px 3px rgba(0, 0, 0, 0.2)',
            backdropFilter: 'blur(1px)',
          }}
        />
      ))}
    </div>
  );
};

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showRain, setShowRain] = useState(false);
  
  const audioRef = useRef(null);
  const rainAudioRef = useRef(null);

  const handleOpenLetter = () => {
    setIsTransitioning(true); 
    
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log("Autoplay blocked or failed:", error);
      });
    }

    if (rainAudioRef.current) {
      rainAudioRef.current.play().catch((error) => {
        console.log("Rain autoplay blocked or failed:", error);
      });
    }

    setTimeout(() => {
      setIsOpen(true);
      setShowRain(true); 
    }, 4500);
  };

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
      if (rainAudioRef.current) rainAudioRef.current.pause();
    } else {
      audioRef.current.play();
      if (rainAudioRef.current) rainAudioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const fallingLeaves = Array.from({ length: 12 });
  const windLeaves = Array.from({ length: 30 });

  const getRandomHoverColor = () => {
    const colors = ['#ffb5a7', '#86efac', '#fbcfe8', '#bbf7d0', '#f472b6', '#4ade80'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="w-full min-h-screen bg-pink-50 font-quicksand relative overflow-x-hidden">
      
      {showRain && <FloatingRain />}

      <style>{`
        @keyframes fallAndSway {
          0% {
            transform: translate3d(0px, -10vh, 0) rotate(0deg);
            opacity: 0;
          }
          15% { opacity: 1; }
          50% {
            transform: translate3d(35px, 50vh, 0) rotate(180deg);
          }
          80% {
            transform: translate3d(-25px, 85vh, 0) rotate(270deg);
          }
          100% {
            transform: translate3d(15px, 110vh, 0) rotate(360deg);
            opacity: 0;
          }
        }

        .falling-item {
          position: fixed;
          pointer-events: none;
          z-index: 30;
          animation: fallAndSway linear infinite;
          will-change: transform;
          transform: translate3d(0,0,0);
        }

        @keyframes windBlow {
          0% {
            transform: translate3d(-50vw, 50vh, 0) rotate(0deg);
            opacity: 0;
          }
          20% { opacity: 1; }
          100% {
            transform: translate3d(120vw, -50vh, 0) rotate(720deg);
            opacity: 0.9;
          }
        }

        .wind-leaf {
          position: fixed;
          pointer-events: none;
          z-index: 60;
          animation: windBlow 4s cubic-bezier(0.25, 1, 0.5, 1) forwards;
          will-change: transform;
        }

        @keyframes floatEnvelope {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(0deg); }
          50% { transform: translate3d(0, -6px, 0) rotate(0.8deg); }
        }
        .envelope-float {
          animation: floatEnvelope 4s ease-in-out infinite;
          will-change: transform;
        }

        @keyframes rotateClockwise {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .portal-spin {
          animation: rotateClockwise 15s linear infinite;
          will-change: transform;
          transform: translate3d(0,0,0);
        }

        @keyframes floatCloud1 {
          0% { transform: translate3d(-20px, 0, 0); }
          50% { transform: translate3d(20px, 0, 0); }
          100% { transform: translate3d(-20px, 0, 0); }
        }
        .cloud-1 { 
          animation: floatCloud1 14s ease-in-out infinite; 
          will-change: transform; 
          transform: translate3d(0,0,0);
        }

        .sketch-border {
          border: 3px dashed #ffb5a7;
          border-radius: 255px 15px 225px 15px/15px 225px 15px 255px;
          box-shadow: 0 10px 30px rgba(255, 182, 193, 0.3);
          background: rgba(255, 255, 255, 0.94);
        }

        .smart-bg {
          background-image: url('/bg-lucu.png');
          background-size: contain;
          background-repeat: repeat;
          background-position: center top;
        }
        @media (min-width: 1024px) {
          .smart-bg {
            background-size: cover;
            background-repeat: no-repeat;
          }
        }
      `}</style>

      {/* PERUBAHAN: Audio diletakkan di luar kondisi isOpen agar dimuat sejak awal */}
      <audio 
        ref={audioRef}
        loop 
        src="/music/My-My-Love.mp3" 
      />
      <audio 
        ref={rainAudioRef}
        loop 
        src="/music/rain.mp3" 
      />

      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 smart-bg bg-pink-50 flex items-center justify-center p-4 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/50 via-pink-50/30 to-emerald-100/20 pointer-events-none" />

            <AnimatePresence>
              {isTransitioning && (
                <div className="absolute inset-0 z-50 pointer-events-none overflow-hidden bg-pink-50/85 backdrop-blur-[2px]">
                  {windLeaves.map((_, i) => {
                    const icons = ['🌸', '🍃', '💮', '🌿', '🌷', '🌱'];
                    const randomIcon = icons[i % icons.length];
                    const randomTop = Math.random() * 100;
                    const randomDelay = Math.random() * 1.5;
                    const randomSize = Math.random() * 20 + 20;

                    return (
                      <div
                        key={i}
                        className="wind-leaf"
                        style={{
                          top: `${randomTop}%`,
                          fontSize: `${randomSize}px`,
                          animationDelay: `${randomDelay}s`,
                        }}
                      >
                        {randomIcon}
                      </div>
                    );
                  })}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="font-caveat text-3xl sm:text-4xl text-pink-400 font-bold animate-pulse drop-shadow-sm">
                      Opening your letter... ♡
                    </p>
                  </div>
                </div>
              )}
            </AnimatePresence>

            <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
              <div className="w-[340px] h-[340px] sm:w-[540px] sm:h-[540px] rounded-full border-[20px] border-dashed border-pink-300/80 flex items-center justify-center relative shadow-[0_0_80px_rgba(255,182,193,0.6)] bg-emerald-100/10 backdrop-blur-[1px] portal-spin">
                <div className="absolute -top-8 text-5xl">🌸</div>
                <div className="absolute -bottom-8 text-5xl">🌿</div>
                <div className="absolute -left-8 text-5xl">🍃</div>
                <div className="absolute -right-8 text-5xl">🌷</div>
                <div className="absolute top-1/4 -left-6 text-4xl">💮</div>
                <div className="absolute bottom-1/4 -right-6 text-4xl">🌱</div>
              </div>
            </div>

            {fallingLeaves.map((_, i) => {
              const icons = ['🌸', '🌷', '🍃', '🌿', '🌱', '💮'];
              const randomIcon = icons[i % icons.length];
              const randomLeft = (i * 8) % 100;
              const randomDuration = 5 + (i % 4);
              const randomDelay = (i * 0.4);
              const randomSize = 18 + (i % 6);

              return (
                <div
                  key={i}
                  className="falling-item"
                  style={{
                    left: `${randomLeft}%`,
                    top: '-50px',
                    fontSize: `${randomSize}px`,
                    animationDuration: `${randomDuration}s`,
                    animationDelay: `${randomDelay}s`,
                  }}
                >
                  {randomIcon}
                </div>
              );
            })}

            <div className="absolute top-10 left-12 cloud-1 pointer-events-none opacity-90">
              <svg width="110" height="55" viewBox="0 0 150 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M30 60H120C136.569 60 150 46.5685 150 30C150 13.4315 136.569 0 120 0C113.882 0 108.203 1.88812 103.419 5.15682C96.2925 1.99042 88.3582 0 80 0C60.67 0 44.408 13.518 40.852 31.545C37.585 30.547 34.053 30 30 30C13.431 30 0 43.431 0 60C0 76.569 13.431 90 30 90H120" stroke="#B0BEC5" strokeWidth="3" strokeDasharray="5 3" fill="white" fillOpacity="0.8"/>
              </svg>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-between items-end px-6 pointer-events-none opacity-90">
              <div className="text-3xl">🌷</div>
              <div className="text-4xl">🌱</div>
              <div className="text-3xl">🌸</div>
              <div className="text-4xl">🌿</div>
              <div className="text-3xl">🌷</div>
            </div>

            <motion.div 
              initial={{ y: 20, opacity: 0, scale: 0.95 }}
              animate={isTransitioning ? { scale: 0, opacity: 0, rotate: 10 } : { y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="sketch-border p-8 sm:p-12 flex flex-col items-center max-w-md w-full text-center relative z-30 envelope-float"
            >
              <div className="absolute -top-4 -right-3 text-4xl transform rotate-12">🎀</div>
              <div className="absolute -bottom-3 -left-3 text-3xl transform -rotate-12">💌</div>

              <div className="text-7xl mb-3 filter drop-shadow-md">
                💌
              </div>

              <h2 className="font-fredoka text-2xl sm:text-3xl text-[#ff758f] font-bold mb-2 tracking-wide drop-shadow-sm">
                A Special Letter for You
              </h2>
              
              <p className="font-caveat text-gray-700 text-xl sm:text-2xl mb-8 leading-snug font-medium">
                "Sebuah kejutan kecil penuh cinta, khusus untuk hari spesialmu..." ♡
              </p>

              <button 
                onClick={handleOpenLetter}
                disabled={isTransitioning}
                className="bg-[#ff8fa3] hover:bg-[#ff758f] text-white font-fredoka px-8 py-3.5 rounded-full shadow-lg text-lg tracking-wider transition-all cursor-pointer border-2 border-white flex items-center gap-2 mx-auto"
              >
                <span>{isTransitioning ? "Opening..." : "Open Letter"}</span>
                <span className="text-xl">✨</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-full min-h-screen relative"
        >
          <div className="w-full min-h-screen smart-bg z-10 flex flex-col justify-start items-center py-20 px-4 md:px-8 relative">

            <div className="w-full max-w-[1300px] flex flex-col lg:flex-row gap-8 lg:gap-4 relative z-20 items-center justify-between">
              
              <div className="w-full lg:w-[28%] flex flex-col items-center gap-4 order-2 lg:order-1">
                <motion.div 
                  whileHover={{ scale: 1.05, y: -6, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white p-2.5 pb-10 rounded-sm shadow-md transform -rotate-3 relative w-[70%] sm:w-[50%] lg:w-[80%] max-w-[240px] cursor-pointer"
                  style={{ transition: 'background-color 0.4s ease, box-shadow 0.4s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getRandomHoverColor()}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                >
                  <div className="absolute -top-3 left-4 w-16 h-5 bg-pink-200/60 -rotate-6 z-10"></div>
                  <img 
                    src="https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/Anniv/D.jpeg" 
                    alt="Foto A" 
                    className="w-full aspect-[4/5] object-cover bg-gray-100 rounded-sm" 
                  />
                  <p className="font-caveat text-xl text-center mt-2 text-gray-700 absolute bottom-2 w-full left-0">My biggest blessing ♡</p>
                </motion.div>

                <div className="flex items-end gap-2 w-[75%] justify-center">
                  <div className="text-[3.5rem] animate-bounce">🐰</div>
                  <motion.div 
                    whileHover={{ scale: 1.06, y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="bg-[#e8f5e9] p-3 shadow-sm transform rotate-6 relative border border-green-100 w-28 cursor-pointer"
                    style={{ transition: 'background-color 0.4s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getRandomHoverColor()}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#e8f5e9'}
                  >
                    <p className="font-caveat text-lg text-green-700 text-center leading-tight">
                      Always be happy my love ♡
                    </p>
                  </motion.div>
                </div>
              </div>

              <div className="w-full lg:w-[42%] flex flex-col items-center justify-center text-center order-1 lg:order-2 px-2">
                <motion.h1 
                  whileHover={{ scale: 1.03, y: -3 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="font-fredoka text-4xl sm:text-5xl lg:text-6xl font-medium text-[#ff7eb3] leading-tight drop-shadow-sm cursor-pointer"
                  style={{ transition: 'color 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = getRandomHoverColor()}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#ff7eb3'}
                >
                  Happy 23rd<br/>Birthday!
                </motion.h1>
                
                <motion.div 
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="bg-white/80 backdrop-blur-md text-[#5cb85c] px-5 py-1.5 rounded-full font-fredoka text-lg lg:text-xl my-3 shadow-sm border border-green-100 cursor-pointer"
                  style={{ transition: 'background-color 0.4s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getRandomHoverColor()}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.8)'}
                >
                  Intan Putri Wulandari 🌸
                </motion.div>
                
                <motion.div 
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="bg-white/70 backdrop-blur-md p-4 lg:p-5 rounded-2xl border border-white/80 shadow-sm max-w-lg cursor-pointer"
                  style={{ transition: 'background-color 0.4s ease, box-shadow 0.4s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getRandomHoverColor()}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.7)'}
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
                  whileHover={{ scale: 1.06, y: -2 }}
                  className="border border-pink-200 text-pink-500 px-5 py-1.5 rounded-full text-xs font-semibold mt-4 bg-white/90 shadow-sm cursor-pointer"
                  style={{ transition: 'background-color 0.4s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getRandomHoverColor()}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.9)'}
                >
                  ♡ 23 and still my favorite girl ♡
                </motion.div>
              </div>

              <div className="w-full lg:w-[28%] flex flex-col items-center gap-4 order-3 lg:order-3 mb-10 lg:mb-0">
                <motion.p 
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="font-caveat text-lg text-gray-700 font-semibold text-center lg:text-right w-[80%] pr-0 lg:pr-2 leading-tight drop-shadow-sm cursor-pointer"
                  style={{ transition: 'color 0.3s ease' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = getRandomHoverColor()}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#374151'}
                >
                  Good things take time, just like us ♡
                </motion.p>

                <div className="relative w-full h-[190px] lg:h-[200px] flex justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.08, y: -6, rotate: 0, zIndex: 30 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="absolute left-6 sm:left-24 lg:left-6 top-0 bg-white p-2 pb-8 rounded-sm shadow-md transform -rotate-6 w-[110px] lg:w-[120px] z-10 cursor-pointer"
                    style={{ transition: 'background-color 0.4s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getRandomHoverColor()}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                  >
                    <img 
                      src="https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/Anniv/E.jpeg" 
                      alt="Foto B" 
                      className="w-full aspect-square object-cover bg-gray-100" 
                    />
                    <p className="font-caveat text-sm text-center absolute bottom-1 w-full left-0 text-gray-600">More sunsets ♡</p>
                  </motion.div>
                  
                  <motion.div 
                    whileHover={{ scale: 1.08, y: -6, rotate: 0, zIndex: 30 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="absolute right-6 sm:right-24 lg:right-6 top-10 bg-white p-2 pb-8 rounded-sm shadow-xl transform rotate-6 w-[110px] lg:w-[120px] z-20 cursor-pointer"
                    style={{ transition: 'background-color 0.4s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getRandomHoverColor()}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                  >
                    <img 
                      src="https://raw.githubusercontent.com/prasetiyo08/anniversary_pict/main/Anniv/F.jpeg" 
                      alt="Foto C" 
                      className="w-full aspect-square object-cover bg-gray-100" 
                    />
                    <p className="font-caveat text-sm text-center absolute bottom-1 w-full left-0 text-pink-400">Pretty girl 🌸</p>
                  </motion.div>
                </div>

                <div className="flex gap-3 items-end w-[85%] sm:w-[60%] lg:w-[85%] justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.03, y: -3 }}
                    className="bg-white/85 backdrop-blur-md p-3 rounded-xl shadow-sm border border-pink-200 text-gray-800 space-y-1 font-medium flex-1 cursor-pointer"
                    style={{ transition: 'background-color 0.4s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = getRandomHoverColor()}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.85)'}
                  >
                    <p className="font-caveat text-lg leading-tight">✓ sehat selalu</p>
                    <p className="font-caveat text-lg leading-tight">✓ bahagia terus</p>
                    <p className="font-caveat text-lg leading-tight">✓ selalu jadi diri sendiri</p>
                    <p className="font-caveat text-lg leading-tight">✓ sukses dengan mimpi2nya</p>
                    <p className="font-caveat text-lg leading-tight">✓ kita selalu bersama ♡</p>
                  </motion.div>
                  <div className="text-4xl mb-1 animate-pulse">🎂</div>
                </div>

              </div>

            </div>
          </div>

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
        </motion.div>
      )}
    </div>
  );
}

export default App;