import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import background image
import backgroundImage from "./assets/background.jpg";

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

const BirthdaySurprise = () => {
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImages(true);
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-no-repeat bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "contain",
          backgroundPosition: "center",
          width: "100vw",
          height: "100vh",
        }}
      ></div>
      <div className="relative min-h-screen bg-black bg-opacity-50 overflow-auto">
        <AnimatePresence>
          {!showImages && (
            <motion.div
              className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, y: -100 }}
              transition={{ duration: 1 }}
            >
              <motion.h1 className="text-6xl font-bold text-white">
                Happy Birthday!
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          className="fixed top-0 left-0 w-full py-4 bg-black bg-opacity-50 flex justify-center z-10"
          initial={{ y: -100, opacity: 0 }}
          animate={{
            y: showImages ? 0 : -100,
            opacity: showImages ? 1 : 0,
          }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-white">Happy Birthday!</h1>
        </motion.div>

        {showImages && (
          <div className="pt-screen">
            {images.map((img, index) => (
              <motion.div
                key={index}
                className="w-full h-screen flex items-center justify-center"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.5 }}
              >
                <motion.img
                  src={img}
                  alt={`Birthday image ${index + 1}`}
                  className="max-w-md max-h-md rounded-lg shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BirthdaySurprise;
