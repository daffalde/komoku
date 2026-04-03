"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Urlcheck from "./components/Urlcheck";

export default function Home() {
  const [urlHasil, setUrlHasil] = useState<any>(null);
  const [inputUrl, setInputUrl] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isError, setIsError] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);

    if (inputUrl === "") {
      setIsError(true);
      setIsLoading(false);
    } else {
      try {
        const response = await fetch(
          "https://daffalde-linkphishing.hf.space/predict",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ url: inputUrl }),
          },
        );
        const data = await response.json();
        setUrlHasil(data);
        setIsLoading(false);
        setIsError(false);
        setInputUrl("");
      } catch (error) {
        console.error("Error:", error);
        setIsLoading(false);
      }
    }
  };
  return (
    <div className="container">
      <div className="linkPage">
        <Navbar />
        <div className="link-page-content">
          <div className="l-p-title">
            <h1>Advanced</h1>
            <h1>machine</h1>
            <h1>learning</h1>
            <h1>phishing</h1>
            <h1>link</h1>
            <h1>detection</h1>
          </div>
          <p style={{ maxWidth: "600px", width: "100%" }}>
            Komoku analyzes suspicious URLs through multi-layered feature
            extraction to deliver reliable threat detection and prevent
            unauthorized data access.
          </p>
          <div className="l-p-input">
            <input
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              type="text"
              placeholder="Enter URL to check safety..."
            />
            <button className="url-analis-button" onClick={handleSubmit}>
              {isLoading ? (
                <img
                  className="loading-animation"
                  height={20}
                  src="/loading.png"
                  alt="loading icon"
                />
              ) : (
                "Analyze"
              )}
            </button>
          </div>
          {isError && <p className="danger">Please input url to analyze</p>}
          <p className="p-secondary">
            Processing URL patterns using Random Forest Algorithm
          </p>
          {urlHasil && (
            <Urlcheck
              HasilConfidence={urlHasil.confidence}
              HasilResult={urlHasil.result}
              HasilDesc={urlHasil.desc}
              HasilUrl={urlHasil.url}
            />
          )}
        </div>
        <div className="gap"></div>
      </div>
      <div className="bottomGradient"></div>
    </div>
  );
}
