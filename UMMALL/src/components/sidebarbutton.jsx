import React, { useState, useEffect } from 'react';
import '../styles/sidebarbutton.css'

function SidebarButton() {
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const menu = document.querySelector('.menu');
      const btn = document.querySelector('.hamburger');
      if (menu && !menu.contains(event.target) && !btn.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

return (
        <button className={`hamburger ${isActive ? 'active' : ''}`} aria-label="Menu" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </button>
);
}
export default SidebarButton;