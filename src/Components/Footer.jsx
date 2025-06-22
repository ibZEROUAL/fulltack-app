import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1a2e4f] to-[#0a1e3f] text-white py-8 text-center shadow-lg ">
      <p className="text-sm mb-4">&copy; {new Date().getFullYear()} IB Store. All rights reserved.</p>
      <div className="flex justify-center gap-6 text-2xl">
        <a href="https://facebook.com" className="text-white hover:text-cyan-400 transition-all">
          <FaFacebook />
        </a>
        <a href="https://twitter.com" className="text-white hover:text-cyan-400 transition-all">
          <FaTwitter />
        </a>
        <a href="https://instagram.com" className="text-white hover:text-cyan-400 transition-all">
          <FaInstagram />
        </a>
        <a href="https://linkedin.com" className="text-white hover:text-cyan-400 transition-all">
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
