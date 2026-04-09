"use client";

import React, { useState } from "react";

const shopLinks = ["New Arrivals", "Women", "Men", "Sale"];
const aboutLinks = ["Our Story", "Sustainability", "Careers", "Press"];
const customerCareLinks = [
  "Contact Us",
  "Shipping & Returns",
  "Size Guide",
  "FAQ",
];
const socialLinks = ["Instagram", "Pinterest", "Twitter", "Facebook"];

const ArrowRightIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap');`}</style>

      <footer
        className="bg-[#2e2418] text-[#c4a882]"
        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-14 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {/* Shop */}
            <div>
              <h3 className="text-white text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
                Shop
              </h3>
              <ul className="flex flex-col gap-4">
                {shopLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="/customer/collection"
                      className="text-[15px] hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About */}
            <div>
              <h3 className="text-white text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
                About
              </h3>
              <ul className="flex flex-col gap-4">
                {aboutLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="/about"
                      className="text-[15px] hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h3 className="text-white text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
                Customer Care
              </h3>
              <ul className="flex flex-col gap-4">
                {customerCareLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="/contact"
                      className="text-[15px] hover:text-white transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Connect */}
            <div>
              <h3 className="text-white text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
                Connect
              </h3>
              <p className="text-[15px] leading-relaxed mb-6">
                Sign up for exclusive access to new collections and private
                events.
              </p>
              <form onSubmit={handleSubscribe} className="flex mb-8">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  aria-label="Email address"
                  required
                  className="flex-1 min-w-0 bg-transparent border border-[#5a4530] px-4 py-2.5 text-[15px] text-[#c4a882] placeholder-[#7a6550] focus:outline-none focus:border-[#c4a882] transition-colors duration-200"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="bg-[#c4a882] text-[#2e2418] px-4 py-2.5 hover:bg-white transition-colors duration-200 flex items-center justify-center shrink-0"
                >
                  <ArrowRightIcon />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="border-t border-[#5a4530]">
          <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-5">
            <p className="text-[13px] text-[#7a6550]">
              &copy; 2026 GEESIX. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
