import React from "react";
import "../app/index.css";

const Hero = () => {
  return (
    <section className="container image-bg flex rounded-md overflow-hidden flex-col justify-center h-[500px] items-center">
      <div className="absolute flex-col flex">
        <h1 className="text-4xl md:text-5xl text-white  max-w-4xl font-bold text-center my-4">
          Find Your Perfect Campus Housing
        </h1>
        <p className="text-slate-50 text-center">
          Browse, rent, or buy properties near your university with ease.
        </p>
      </div>
    </section>
  );
};

export default Hero;
