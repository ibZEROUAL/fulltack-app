import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HomePage = () => {

  return (
    <div className="bg-gradient-to-br from-[#0a1e3f] via-[#093e5d] to-[#0a1e3f] flex flex-col min-h-screen">

      <section className="relative flex flex-col justify-center items-center text-center text-white min-h-screen bg-gradient-to-br from-[#1a2e4f] via-[#093e5d] to-[#0a1e3f] px-6 py-16">
        <motion.h2
          className="text-6xl font-extrabold leading-tight mb-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:text-cyan-300"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to Product Store
        </motion.h2>

        <motion.p
          className="text-xl mb-10 transition-all duration-300 ease-in-out hover:text-cyan-300"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Discover the best products curated just for you. Shop now and enjoy exclusive deals.
        </motion.p>

        <Link to="/display"
  smooth={true}
  offset={-50}
  className="bg-[#1a2e4f] text-white py-3 px-8 rounded-lg text-xl font-semibold shadow-lg transform transition-allhover:bg-[#2b3f64] hover:scale-110 cursor-pointer"
>
  Shop Now
</Link>
        </section>
    </div>
  );
};

export default HomePage;
