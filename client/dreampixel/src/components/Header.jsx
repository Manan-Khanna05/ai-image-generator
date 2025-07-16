import React, { useContext, useRef } from "react";
import { assets } from "../assets/assets";
import { motion, useInView } from "motion/react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const h1Ref = useRef(null);
  const buttonRef = useRef(null);
  const containerInView = useInView(containerRef, { once: true });
  const h1InView = useInView(h1Ref, { once: true });
  const buttonInView = useInView(buttonRef, { once: true });

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin("/login");
    }
  };
  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 40 }}
      animate={containerInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      className="flex flex-col justify-center items-center text-center my-20">
      <div className="text-stone-500 inline-flex text-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500">
        <p>Best text to img Generator </p>
        <img src={assets.star_icon} alt="" />
      </div>
      <motion.h1
        ref={h1Ref}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={h1InView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.2, duration: 0.7 }}
        className="text-4xl max-w-[300px] sm:text-7xl sm:max-w-[590px] mx-auto mt-10 text-center">
        Turn Text To <span className="text-blue-600">Image</span>, in Seconds.
      </motion.h1>
      <p className="text-center max-w-xl mx-auto mt-5">
        Unleash your creativity with AI. Turn your imagination into visual art
        in Seconds just type and saw the magic.
      </p>
      <motion.button
        ref={buttonRef}
        initial={{ opacity: 0, y: 20 }}
        animate={buttonInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2.5 flex items-center gap-2 rounded-full"
        onClick={onClickHandler}>
        Generate Images
        <img className="h-6" src={assets.star_group} alt="" />
      </motion.button>
      <div className="flex flex-wrap justify-center mt-16 gap-3">
        {Array(6)
          .fill("")
          .map((item, index) => (
            <img
              className="rounded hover:scale-105 transition-all duration-300 cursor-pointer max-sm:w-10"
              src={index % 2 === 0 ? assets.sample_img_1 : assets.sample_img_2}
              alt=""
              key={index}
              width={70}
            />
          ))}
      </div>
      <p className="mt-2 text-neutral-600">Generate Images with DreamPixel</p>
    </motion.div>
  );
};
export default Header;
