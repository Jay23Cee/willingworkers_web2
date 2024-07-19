"use client";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Logged from "./auth/Logged";

import ovsww_logo from "../public/assets/ovs_ww.png";
type User = {
  image: string;
  banner: string;
};

function Nav({ image, banner = "" }: User) {
  const [showMenu, setShowMenu] = useState(false);
  const navMenuRef = useRef<HTMLDivElement>(null); // create a ref for the nav_menu element



  const handleLinkClick = () => {
    setShowMenu(false);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showMenu &&
        navMenuRef.current &&
        !navMenuRef.current.contains(event.target as Node)
      ) {
        // check if the event target is inside the nav_menu element
        setShowMenu(false);
      }
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  return (
    <nav className="nav flex justify-between items-center py-8">
      <div className="nav_home">
        <Link href="/">
          <Image
            src={ovsww_logo}
            alt={"image here"}
            className={`w-14 rounded-full image-hover-effect`} // Add the `image-hover-effect` class
            width={100}
            height={100}
            priority
          />
        </Link>

      </div>

  <div className="nav_menu" ref={navMenuRef}>
    <div className="menu-icon" onClick={toggleMenu}>
      &#9776;
    </div>
    <ul className={showMenu ? "menu show-menu" : "menu"}>
      {/* Conditional rendering for the Home link */}
      {banner !== "Home" && (
        <li>
          <Link href="/">
            Home
          </Link>
        </li>
      )}

      <li>
        <Link href="/programs" onClick={handleLinkClick}>
          Programs
        </Link>
      </li>
      <li>
        <Link href="/about" onClick={handleLinkClick}>
          About
        </Link>
      </li>
      <li>
        <Link href="/contact" onClick={handleLinkClick}>
          Contact
        </Link>
      </li>

      <li>
        <Link href="/career">Career</Link>
      </li>

      {image && (
        <li>
          <Image
            src={image}
            alt={"image here"} // Consider using a more descriptive alt text
            className="w-14 rounded-full"
            width={100}
            height={100}
            priority
          />
        </li>
      )}
    </ul>
</div>

      <div className="about-container-banner mt-4 p-5 bg-primary text-white">

       
        
      </div>


    </nav>
  );
}

export default Nav;
