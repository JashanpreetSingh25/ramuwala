import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Import images
import image1 from "./assets/1.jpg";
import image2 from "./assets/2.jpg";
import image3 from "./assets/3.jpg";
import image4 from "./assets/4.jpg";
import image5 from "./assets/5.jpg";

const BirthdaySurprise = () => {
  const [showImages, setShowImages] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowImages(true);
      window.scrollTo({
        top: window.innerHeight,
        behavior: "smooth",
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const images = [image1, image2, image3, image4, image5];

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-200 to-purple-300">
      <AnimatePresence>
        {!showImages && (
          <motion.div
            className="fixed top-0 left-0 w-full h-screen flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 1 }}
          >
            <motion.h1 className="text-6xl font-bold text-pink-600">
              Happy Birthday!
            </motion.h1>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="fixed top-0 left-0 w-full py-4 bg-pink-200 bg-opacity-80 flex justify-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: showImages ? 0 : -100,
          opacity: showImages ? 1 : 0,
        }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-pink-600">Happy Birthday!</h1>
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
  );
};

export default BirthdaySurprise;
