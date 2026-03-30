'use client'

import { useState } from "react";
import Link from "next/link";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";

function CartIcon({ count }) {
  return (
    <div className="relative cursor-pointer">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-[#5c3d2e] text-white rounded-full w-4 h-4 text-[10px] font-semibold flex items-center justify-center font-sans">
          {count}
        </span>
      )}
    </div>
  );
}

const SearchIcon = () => (
  <svg className="cursor-pointer" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const AccountIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const HamburgerIcon = () => (
  <svg className="cursor-pointer" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  <svg className="cursor-pointer" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const navLinks = [
  { label: "NEW ARRIVALS", href: "/customer/collection" },
  { label: "WOMEN", href: "/" },
  { label: "MEN", href: "/" },
  { label: "BEAUTY", href: "/" },
  { label: "HOME", href: "/" },
];

export default function MaisonHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const cartCount = 2;

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap');`}</style>

      <header className="sticky top-0 z-50 bg-[#f5f0eb] border-b border-[#e0d8d0] [font-family:'Cormorant_Garamond',Georgia,serif]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-[58px] md:h-[68px] flex items-center justify-between">

          {/* Logo */}
          <span className="text-[17px] md:text-[19px] font-semibold tracking-[0.25em] text-[#2a1f17] cursor-pointer">
            MAISON
          </span>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
            <ul className="flex gap-9 list-none m-0 p-0">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[11px] tracking-[0.15em] text-[#2a1f17] font-semibold no-underline transition-opacity duration-200 hover:opacity-50"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              {isAdmin && (
                <li>
                  <Link
                    href="/admin"
                    className="text-[11px] tracking-[0.15em] text-[#2a1f17] font-semibold no-underline transition-opacity duration-200 hover:opacity-50"
                  >
                    ADMIN
                  </Link>
                </li>


              )}



            </ul>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4 text-[#2a1f17]">
            <span className="hidden md:flex cursor-pointer hover:opacity-60 transition-opacity duration-200">
              <SearchIcon />
            </span>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center gap-2">
              <AccountIcon />
              {!isSignedIn ? (
                <SignInButton mode="modal">
                  {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button className="text-[11px] tracking-[0.12em] text-[#2a1f17] font-semibold hover:opacity-50 transition-opacity duration-200 bg-transparent border-none cursor-pointer">
                    SIGN IN / SIGN UP
                  </button>
                </SignInButton>
              ) : (
                // biome-ignore lint/a11y/useButtonType: <explanation>
                 <button
                  onClick={() => signOut()}
                  className="text-[11px] tracking-[0.12em] text-[#2a1f17] font-semibold hover:opacity-50 transition-opacity duration-200 bg-transparent border-none cursor-pointer"
                >
                  SIGN OUT
                </button>
              )}
            </div>

            <span className="cursor-pointer hover:opacity-60 transition-opacity duration-200">
              <CartIcon count={cartCount} />
            </span>

          
            <span
              className="flex md:hidden cursor-pointer hover:opacity-60 transition-opacity duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </span>
          </div>
        </div>
      </header>

      {/* Mobile Slide-in Menu */}
      <div
        className={`fixed top-[58px] left-0 right-0 bottom-0 bg-[#f5f0eb] z-40 flex flex-col px-7 pt-8 border-t border-[#e0d8d0] transition-transform duration-300 ease-in-out md:hidden [font-family:'Cormorant_Garamond',Georgia,serif] ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-[22px] tracking-[0.12em] text-[#2a1f17] font-medium py-[18px] border-b border-[#e0d8d0] cursor-pointer no-underline"
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        {isAdmin && (
          <Link
            href="/admin"
            className="text-[22px] tracking-[0.12em] text-[#2a1f17] font-medium py-[18px] border-b border-[#e0d8d0] cursor-pointer no-underline"
            onClick={() => setMenuOpen(false)}
          >
            ADMIN
          </Link>
        )}

        {/* Mobile Auth */}
        {!isSignedIn ? (
          <SignInButton mode="modal">
            <div className="text-[22px] tracking-[0.12em] text-[#2a1f17] font-medium py-[18px] cursor-pointer mt-2">
              SIGN IN / SIGN UP
            </div>
          </SignInButton>
        ) : (
          // biome-ignore lint/a11y/useButtonType: <explanation>
          <button
            onClick={() => signOut()}
            className="text-left text-[22px] tracking-[0.12em] text-[#2a1f17] font-medium py-[18px] cursor-pointer mt-2 bg-transparent border-none"
          >
            SIGN OUT
          </button>
        )}
      </div>
    </>
  );
}


