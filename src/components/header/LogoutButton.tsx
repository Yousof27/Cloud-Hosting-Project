"use client";
import styles from "./header.module.css";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useState } from "react";

const LogoutButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const logoutHandler = async () => {
    try {
      setLoading(true);
      await axios.get(`${DOMAIN}/api/user/logout`);
      router.replace("/");
      router.refresh();
      toast.info("Logged Out");
    } catch (error) {
      toast.warning("Something went wrong !");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button className={styles.btn} onClick={logoutHandler} disabled={loading}>
      Logout
    </button>
  );
};

export default LogoutButton;
