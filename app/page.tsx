"use client";

import { ChangeEvent, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import Urlcheck from "./components/Urlcheck";
import jsQR from "jsqr";

export default function Home() {
  const [urlHasil, setUrlHasil] = useState<any>(null);
  const [inputUrl, setInputUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const [qrFile, setQrFile] = useState<string>("");
  const [qrContent, setQrContent] = useState<boolean>(false);

  const [notQR, setNotQR] = useState<boolean>(false);

  const [bukanLink, setBukanLink] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    setBukanLink(false);
    setIsError(false);
    setNotQR(false);
    setUrlHasil(null);

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

  const handleScan = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setQrFile("");
    setIsLoading(true);
    setBukanLink(false);
    setIsError(false);
    setNotQR(false);
    setUrlHasil(null);

    const reader = new FileReader();

    reader.onload = (event) => {
      const image = new Image();

      image.onload = async () => {
        try {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d", { willReadFrequently: true });

          if (!context) throw new Error("Context tidak ditemukan");

          // Tentukan ukuran maksimal untuk pemrosesan
          const maxDimension = 1000;
          let width = image.width;
          let height = image.height;

          if (width > height) {
            if (width > maxDimension) {
              height *= maxDimension / width;
              width = maxDimension;
            }
          } else {
            if (height > maxDimension) {
              width *= maxDimension / height;
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;

          // Gambar ulang dengan ukuran yang lebih kecil
          context.drawImage(image, 0, 0, width, height);

          const imageData = context.getImageData(0, 0, width, height);
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert", // Mempercepat proses jika QR standar
          });
          if (code) {
            setQrFile(code.data);
            try {
              const response = await fetch(
                "https://daffalde-linkphishing.hf.space/predict",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ url: code.data }),
                },
              );

              const data = await response.json();
              setUrlHasil(data);
              setIsLoading(false);
              setIsError(false);
              setQrContent(false);
            } catch (error) {
              console.error("Error saat deteksi QR:", error);
              setIsLoading(false);
              setQrContent(false);
            }
          } else {
            setNotQR(true);
            setQrContent(false);
          }
        } catch (err) {
          console.error(err);
          setQrFile("Terjadi kesalahan teknis.");
        } finally {
          setIsLoading(false);
        }
      };
      image.onerror = () => {
        setQrFile("Gagal memuat gambar.");
        setIsLoading(false);
      };

      if (typeof event.target?.result === "string") {
        image.src = event.target.result;
      }
    };

    reader.onerror = () => {
      setQrFile("Gagal membaca file.");
      setIsLoading(false);
    };

    reader.readAsDataURL(file);
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
            <span>
              <h1>detection</h1>
              <h1>identification</h1>
              <h1>recognition</h1>
            </span>
            <h1 className="last-word">detection</h1>
          </div>
          <p
            className="linkPage-title-desc"
            style={{ maxWidth: "600px", width: "100%" }}
          >
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
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmit(e);
                }
              }}
            />
            <div className="qr-button-pc">
              <img
                onClick={() => setQrContent(!qrContent)}
                className="qr-button"
                src="/qr.png"
                alt="qr code icon"
              />
              {qrContent && (
                <>
                  <div className="qr-b-pc-content">
                    <label htmlFor="qr-upload" className="qr-input-image">
                      <p>
                        Click for Input <br /> QR Image
                      </p>
                    </label>
                    <input
                      type="file"
                      id="qr-upload"
                      accept="image/*"
                      onChange={handleScan}
                    />
                  </div>
                  <img className="triangle" src="/triangle.png" alt="" />
                </>
              )}
            </div>
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
            {qrContent && (
              <div
                className="layer-close"
                onClick={() => setQrContent(false)}
              ></div>
            )}
          </div>
          {isError && (
            <p className="danger">Please provide the link for analysis</p>
          )}
          {bukanLink && <p className="danger">A variable is not a link</p>}
          {notQR && (
            <p className="danger">
              The uploaded image does not contain a QR code
            </p>
          )}
          <p className="p-secondary">
            Processing URL patterns using Random Forest Algorithm
          </p>
          {urlHasil && (
            <Urlcheck
              HasilConfidence={urlHasil.confidence}
              HasilResult={urlHasil.result}
              HasilDesc={urlHasil.desc}
              HasilUrl={urlHasil.url}
              code={urlHasil.code}
            />
          )}
        </div>
        <div className="gap"></div>
      </div>
      <div className="bottomGradient"></div>
    </div>
  );
}
