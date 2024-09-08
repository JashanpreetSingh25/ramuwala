import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import background image
import backgroundImage from "./assets/background.jpg";

// Import audio file
import birthdaySong from "./assets/Harshveer-happybirthday.mp3";

// Import images for the slideshow
import image1 from "./assets/1.jpg";
import image2 from "./assets/2.jpg";
import image3 from "./assets/3.jpg";
import image4 from "./assets/4.jpg";
import image5 from "./assets/5.jpg";
import image6 from "./assets/6.jpg";
import image7 from "./assets/7.jpg";
import image8 from "./assets/8.jpg";
import image9 from "./assets/9.jpg";
import image10 from "./assets/10.jpg";

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
];

const BirthdaySurprise = () => {
  const [showImages, setShowImages] = useState(false);
  const [showBackground, setShowBackground] = useState(true);
  const [audioStarted, setAudioStarted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImages(true);
      setShowBackground(false);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;

    const playAudio = () => {
      if (audio && !audioStarted) {
        audio
          .play()
          .then(() => {
            setAudioStarted(true);
            console.log("Audio started successfully");
          })
          .catch((error) => {
            console.error("Audio playback failed:", error);
            // Retry audio playback after a short delay
            setTimeout(playAudio, 1000);
          });
      }
    };

    const handleInteraction = () => {
      playAudio();
      // Remove event listeners after successful playback
      if (audioStarted) {
        document.removeEventListener("click", handleInteraction);
        document.removeEventListener("touchstart", handleInteraction);
      }
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    // Try to play audio immediately
    playAudio();

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audioStarted]);

  // Prevent default touch behavior to avoid zooming
  useEffect(() => {
    const preventDefault = (e) => e.preventDefault();
    document.addEventListener("touchmove", preventDefault, { passive: false });
    return () => document.removeEventListener("touchmove", preventDefault);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden bg-black">
      <AnimatePresence>
        {showBackground && (
          <motion.div
            className="absolute inset-0 bg-no-repeat bg-cover bg-center"
            style={{
              backgroundImage: `url(${backgroundImage})`,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <div className="relative w-full h-full bg-black bg-opacity-50 overflow-hidden">
        <AnimatePresence>
          {!showImages && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 1 }}
            >
              <motion.h1 className="text-4xl font-bold text-white text-center px-4">
                Happy Birthday!
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="fixed top-0 left-0 w-full py-2 bg-black bg-opacity-50 flex justify-center z-10"
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: showImages ? 0 : -100,
            opacity: showImages ? 1 : 0,
          }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h1 className="text-xl font-bold text-white">Happy Birthday!</h1>
        </motion.div>

        {showImages && (
          <motion.div
            className="absolute inset-0 overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {images.map((img, index) => (
              <motion.div
                key={index}
                className="w-full h-full flex items-center justify-center p-4 snap-start"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <img
                    src={img}
                    alt={`Birthday image ${index + 1}`}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
      <audio ref={audioRef} loop>
        <source src={birthdaySong} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default BirthdaySurprise;
