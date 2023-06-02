import React, { useEffect, useState } from 'react';
import './navbar.css';
import logo from '../assets/Netflix_2015_logo.svg.png';

function Navbar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`navBar-container ${show ? "nav-black" : "nav-transparent"}`}>
      <div className="left">
        <img src={logo} alt="" />
      </div>

      <div className="Right"></div>
    </div>
  );
}

export default Navbar;
