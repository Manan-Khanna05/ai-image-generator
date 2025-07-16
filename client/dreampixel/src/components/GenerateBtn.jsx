import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export const GenerateBtn = () => {
  const { user, setShowLogin } = useContext(AppContext);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (user) {
      navigate("/result");
    } else {
      setShowLogin(true); // Show the login modal
    }
  };

  return (
    <div className="pd-16 text-center">
      <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16">
        See the Magic...Try Now!
      </h1>
      <button
        className="inlin-flex text-white bg-black m-auto mt-8 px-12 py-3 flex items-center gap-2 transition-all rounded-full hover:scale-105 duration-500"
        onClick={onClickHandler}>
        Generate Images
        <img src={assets.star_group} alt="" className="h-6" />
      </button>
    </div>
  );
};
