"use client";
import Link from "next/link";
import { GrTechnology } from "react-icons/gr";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import styles from "./header.module.css";

interface HeaderNavProps {
  isAdmin: boolean | undefined;
}

const HeaderNav = ({ isAdmin }: HeaderNavProps) => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const toggleMenuHandler = () => setToggleMenu((p) => !p);
  const closeMenuHandler = () => setToggleMenu(false);

  return (
    <>
      <div className={styles.logo}>
        <Link href="/">
          CLOUD
          <GrTechnology />
          HOSTING
        </Link>
        <div className={styles.menu}>{toggleMenu ? <IoMdClose onClick={toggleMenuHandler} /> : <AiOutlineMenu onClick={toggleMenuHandler} />}</div>
      </div>
      <div
        className={styles.navLinksContainer}
        style={{
          clipPath: (toggleMenu && "polygon(0 0, 100% 0, 100% 100%, 0 100%)") || "",
        }}
      >
        <ul className={styles.navLinks}>
          <li>
            <Link onClick={closeMenuHandler} className={styles.navLink} href="/">
              Home
            </Link>
          </li>
          <li>
            <Link onClick={closeMenuHandler} className={styles.navLink} href="/articles?pageNumber=1">
              Articles
            </Link>
          </li>
          <li>
            <Link onClick={closeMenuHandler} className={styles.navLink} href="/about">
              About
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link onClick={closeMenuHandler} className={styles.navLink} href="/admin">
                Admin
              </Link>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default HeaderNav;
