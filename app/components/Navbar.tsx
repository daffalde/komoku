"use client";

import { useState } from "react";
import "./navbar.css";
import Link from "next/link";

export default function Navbar() {
  const [isProductHover, setIsProductHover] = useState(false);

  return (
    <div className="navbar">
      <div className="navbarLeft">
        <img src="/logo1.svg" alt="logo komoku" />
        <ul>
          <li>
            <Link href="/home">Home</Link>
          </li>
          <li>
            <Link
              onMouseEnter={() => setIsProductHover(true)}
              onMouseLeave={() => setIsProductHover(false)}
              href="/products"
            >
              Products <img height={5} src="/down.png" alt="down arrow" />
            </Link>
            {isProductHover && (
              <div
                onMouseEnter={() => setIsProductHover(true)}
                onMouseLeave={() => setIsProductHover(false)}
                className="product-hover"
              >
                <Link className="p-h-item" href="/">
                  <img height={20} src="/url.png" alt="url scanner" />
                  <p>URL Scanner</p>
                </Link>
                <Link className="p-h-item coming-soon" href="/">
                  <img height={20} src="/email.png" alt="email filter" />
                  <p>Email Filter (Coming Soon)</p>
                </Link>
                <Link className="p-h-item coming-soon" href="/">
                  <img height={20} src="/sms.png" alt="sms guard" />
                  <p>SMS Guard (Coming Soon)</p>
                </Link>
              </div>
            )}
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
      <div className="navbarRight">
        <button
          onClick={() =>
            window.open("https://github.com/daffalde/komoku", "_blank")
          }
        >
          <p className="p-half">Documentation</p>
          <img src="/documentation.svg" alt="documentation logo" />
        </button>
      </div>
    </div>
  );
}
