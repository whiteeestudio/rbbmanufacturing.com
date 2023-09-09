import { motion } from "framer-motion";

import "./App.css";

function App() {
  return (
    <div className="container">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "linear", duration: 2 }}
        className="logo"
        src={`${process.env.PUBLIC_URL}/RBB-logo.png`}
        alt={"rbb-manufacturing-logo"}
      />
      <motion.a
        whileHover={{ scale: 1.1 }}
        transition={{ ease: "linear", duration: 0.5 }}
        href={"mailto:info@rbbmanufacturing.com&subject=Saying hi!"}
        className="email"
      >
        info@rbbmanufacturing.com
      </motion.a>
    </div>
  );
}

export default App;
