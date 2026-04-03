"use client";

import { useState } from "react";
import "./navbar.css";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function Navbar() {
  const [isProductHover, setIsProductHover] = useState(false);

  const params = useParams<{ id: string }>();
  console.log(params);

  return (
    <div className="navbar">
      <div className="navbarLeft">
        <img src="/logo1.svg" alt="logo komoku" />
        <ul>
          <li>
            <Link href="/">Home</Link>
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
      <div className="mobile-navigation-bar">
        <ul>
          <li>
            <Link className="mnb-on" href="/">
              <img src="/url.png" alt="bottom navigation logo" />
              URL
            </Link>
          </li>
          <li>
            <Link href="/email">
              <img src="/email.png" alt="bottom navigation logo" />
              Email
            </Link>
          </li>
          <li>
            <Link href="/sms">
              <img src="/sms.png" alt="bottom navigation logo" />
              SMS
            </Link>
          </li>
          <li>
            <Link href="https://github.com/daffalde/komoku">
              <img src="/document.png" alt="bottom navigation logo" />
              Docs
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
