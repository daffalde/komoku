import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="container">
      <div className="linkPage">
        <Navbar />
      </div>
      <div className="bottomGradient"></div>
    </div>
  );
}
