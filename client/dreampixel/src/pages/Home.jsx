import React, { useRef } from "react";
import Header from "../components/Header";
import { Steps } from "../components/Steps";
import { Description } from "../components/Description";
import Testimonials from "../components/Testimonials";
import { GenerateBtn } from "../components/GenerateBtn";
import { motion, useInView } from "motion/react";

const Home = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}>
      <Header />
      <Steps />
      <Description />
      <Testimonials />
      <GenerateBtn />
    </motion.div>
  );
};

export default Home;
