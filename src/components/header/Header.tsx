import { verifyTokenForPages } from "@/utils/verifyToken";
import HeaderAuthBtns from "./HeaderAuthBtns";
import HeaderNav from "./HeaderNav";
import styles from "./header.module.css";
import { cookies } from "next/headers";

const Header = async () => {
  const cookieStore = await cookies();

  const token = cookieStore.get("jwtToken")?.value;

  const userFromToken = token ? verifyTokenForPages(token) : null;

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <HeaderNav isAdmin={userFromToken?.isAdmin} />
        <HeaderAuthBtns username={userFromToken?.username} userLogin={userFromToken !== null} />
      </nav>
    </header>
  );
};

export default Header;
