import React, { useState, useRef, useContext } from "react";
import { assets } from "../assets/assets";
import { motion, useInView } from "framer-motion";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";

export const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoded, setIsImageLoded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const { generateImage, user, setShowLogin } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input.trim()) {
      toast.error("Please enter a prompt.");
      return;
    }
    if (!user || !user._id) {
      toast.error("You must be logged in to generate images.");
      setShowLogin(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    const data = await generateImage(input);
    if (data && data.resultImage) {
      setIsImageLoded(true);
      setImage(data.resultImage);
    } else {
      toast.error(data?.message || "Failed to generate image.");
    }
    setLoading(false);
  };

  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.form
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center">
      <div className="relative">
        <img src={image} alt="" className="max-w-sm rounded" />
        <span
          className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
            loading ? "w-full transition-all duration-[10s]" : "w-0"
          }`}
        />
      </div>
      <p className={!loading ? "hidden" : ""}>Loading....</p>
      <div className="flex w-full max-x-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Describe what you want to generate"
          className=" flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-colour"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full"
          disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      </div>
      {isImageLoded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={() => {
              setIsImageLoded(false);
              setImage(assets.sample_img_1);
            }}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer">
            Generate Another
          </p>
          <a
            href={image}
            download
            className="bg-zinc-900 text-white border-zinc-900 px-8 py-3 rounded-full cursor-pointer">
            Download
          </a>
        </div>
      )}
    </motion.form>
  );
};
