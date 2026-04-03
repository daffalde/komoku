import Image from "next/image";
import styles from "./page.module.css";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <div className="container">
      <div className="linkPage">
        <Navbar />
        <div className="link-page-content">
          <div className="l-p-title">
            <h6>Advanced</h6>
            <h6>machine</h6>
            <h6>learning</h6>
            <h6>phishing</h6>
            <h6>link</h6>
            <h6>detection</h6>
          </div>
          <p style={{ maxWidth: "600px", width: "100%" }}>
            Komoku analyzes suspicious URLs through multi-layered feature
            extraction to deliver reliable threat detection and prevent
            unauthorized data access.
          </p>
          <div className="l-p-input">
            <input type="text" placeholder="Enter URL to check safety..." />
            <button className="url-analis-button">Analyze</button>
          </div>
          <p className="p-secondary">
            Processing URL patterns using Random Forest Algorithm
          </p>
        </div>
        <div className="gap"></div>
      </div>
      <div className="bottomGradient"></div>
    </div>
  );
}
