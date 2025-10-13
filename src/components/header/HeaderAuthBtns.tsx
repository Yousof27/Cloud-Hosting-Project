import React from "react";
import styles from "./header.module.css";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

interface HeaderAuthBtnsProps {
  username: string | undefined;
  userLogin: boolean;
}

const HeaderAuthBtns = async ({ username, userLogin }: HeaderAuthBtnsProps) => {
  return (
    <div className={styles.btns}>
      {userLogin ? (
        <>
          <Link href="/profile">
            <strong className="text-blue-800 md:text-xl capitalize">{username}</strong>
          </Link>
          <LogoutButton />
        </>
      ) : (
        <>
          <button className={styles.btn}>
            <Link href="/login">Login</Link>
          </button>
          <button className={styles.btn}>
            <Link href="/register">Register</Link>
          </button>
        </>
      )}
    </div>
  );
};

export default HeaderAuthBtns;
