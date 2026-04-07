/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SignInButton, useAuth, useUser } from "@clerk/nextjs";
import { useCartStore } from "@/lib/cart-store";
import { useWishlistStore } from "@/lib/wishlist-store";
import { LogIn, LogOut } from "lucide-react";

function WishlistIcon({ count }: { count: number }) {
  return (
    <div className="relative cursor-pointer">
      {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 10-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
      </svg>

      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-[#5c3d2e] text-white rounded-full w-4 h-4 text-[10px] font-semibold flex items-center justify-center font-sans">
          {count}
        </span>
      )}
    </div>
  );
}

function CartIcon({ count }: { count: number }) {
  return (
    <div className="relative cursor-pointer">
      {/** biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
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
  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
  <svg
    className="cursor-pointer"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const AccountIcon = () => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
  <svg
    className="cursor-pointer"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const HamburgerIcon = () => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
  <svg
    className="cursor-pointer"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

const CloseIcon = () => (
  // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
  <svg
    className="cursor-pointer"
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const navLinks = [
  { label: "HOME", href: "/" },
  { label: "PRODUCTS", href: "/customer/collection" },
  { label: "CONTACT", href: "/contact" },
  { label: "ABOUT", href: "/about" },
];

export default function GeeSixHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  const cartCount = useCartStore((state) =>
    state.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  const wishlistCount = useWishlistStore((state) => state.items.length);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchValue.trim();
    if (!q) return;
    setSearchOpen(false);
    setSearchValue("");
    router.push(`/customer/collection?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap');`}</style>

      <header className="sticky top-0 z-50 bg-[#f5f0eb] border-b border-[#e0d8d0] [font-family:'Cormorant_Garamond',Georgia,serif]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 h-[58px] md:h-[68px] flex items-center justify-between">
          <span className="text-[17px] md:text-[19px] font-semibold tracking-[0.25em] text-[#2a1f17] cursor-pointer">
            <Link href="/">GEESIX</Link>
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
            {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
            <span
              className="hidden md:flex cursor-pointer hover:opacity-60 transition-opacity duration-200"
              onClick={() => setSearchOpen((prev) => !prev)}
            >
              <SearchIcon />
            </span>

            <Link
              href="/customer/wishlist"
              className="cursor-pointer hover:opacity-60 transition-opacity duration-200"
            >
              <WishlistIcon count={wishlistCount} />
            </Link>

            <Link
              href="/cart"
              className="cursor-pointer hover:opacity-60 transition-opacity duration-200"
            >
              <CartIcon count={cartCount} />
            </Link>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center">
              {!isSignedIn ? (
                <SignInButton mode="modal">
                  {/** biome-ignore lint/a11y/useButtonType: <explanation> */}
                  <button className="hover:opacity-50 transition-opacity duration-200 bg-transparent border-none cursor-pointer p-0">
                    <LogIn size={20} strokeWidth={1.5} />
                  </button>
                </SignInButton>
              ) : (
                // biome-ignore lint/a11y/useButtonType: <explanation>
                <button
                  onClick={() => signOut()}
                  className="hover:opacity-50 transition-opacity duration-200 bg-transparent border-none cursor-pointer p-0"
                >
                  <LogOut size={20} strokeWidth={1.5} />
                </button>
              )}
            </div>

            {/** biome-ignore lint/a11y/noStaticElementInteractions: <explanation> */}
            <span
              className="flex md:hidden cursor-pointer hover:opacity-60 transition-opacity duration-200"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </span>
          </div>
        </div>
      </header>

      {/* Search Popup */}
      {searchOpen && (
        <>
          {/** biome-ignore lint/a11y/noStaticElementInteractions: backdrop */}
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setSearchOpen(false)}
          />
          <div className="fixed top-[58px] md:top-[68px] left-0 right-0 z-50 bg-[#f5f0eb] border-t border-b border-[#e0d8d0] px-5 md:px-10 py-5 [font-family:'Cormorant_Garamond',Georgia,serif] shadow-sm">
            <form
              onSubmit={handleSearch}
              className="max-w-[600px] mx-auto flex items-center gap-3"
            >
              <input
                ref={searchInputRef}
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Search products..."
                className="flex-1 bg-transparent border-b border-[#2a1f17]/30 focus:border-[#2a1f17] outline-none py-2 text-[16px] text-[#2a1f17] placeholder-[#2a1f17]/40 transition-colors"
              />
              <button
                type="submit"
                className="bg-[#2a1f17] text-[#f5f0eb] px-5 py-2 text-[11px] tracking-[0.15em] uppercase font-semibold hover:bg-[#1a1209] transition-colors"
              >
                Search
              </button>
            </form>
          </div>
        </>
      )}

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

        {!isSignedIn ? (
          <SignInButton mode="modal">
            <div className="flex items-center gap-3 text-[22px] tracking-[0.12em] text-[#2a1f17] font-medium py-[18px] cursor-pointer mt-2">
              <LogIn size={22} strokeWidth={1.5} />
              SIGN IN
            </div>
          </SignInButton>
        ) : (
          // biome-ignore lint/a11y/useButtonType: <explanation>
          <button
            onClick={() => signOut()}
            className="flex items-center gap-3 text-left text-[22px] tracking-[0.12em] text-[#2a1f17] font-medium py-[18px] cursor-pointer mt-2 bg-transparent border-none"
          >
            <LogOut size={22} strokeWidth={1.5} />
            SIGN OUT
          </button>
        )}
      </div>
    </>
  );
}
