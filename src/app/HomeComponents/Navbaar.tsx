"use client";

import Link from "next/link";
import { useState } from "react";
import { FaUser, FaSearch } from "react-icons/fa";
import { BsCart } from "react-icons/bs";

import Image from "next/image";
import Logo from "../../../public/Logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Banner */}
      <div className="bg-black text-white text-sm py-5 px-4 flex justify-between items-center">
        <span className="text-center font-medium">
          Welcome to our store
        </span>
        <div className="hidden sm:flex space-x-4 text-right">
          <Link href="/faqs" className="hover:underline">
            Faqs
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact us
          </Link>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-20 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href="/">
            <Image
              src = {Logo} // Replace with your actual logo path
              alt="Logo"
              className="h-16 w-auto"
            />
          </Link>

          {/* Links */}
          <div className="hidden md:flex space-x-6 font-semibold text-sm items-center">
            <Link className="text-md" href="/">HOME</Link>
            <Link className="text-md" href="/shop">SHOP</Link>
            <Link className="text-md" href="/upload">UPLOAD IMAGE</Link>
            <Link className="text-md" href="/materials">MATERIALS</Link>
            <div className="flex items-center space-x-1">
              <Link href="/hot-now" className="text-md">
                HOT NOW
              </Link>
              <span className="bg-red-500 text-white text-[10px] px-1 rounded">
                HOT
              </span>
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4 text-gray-600">
            <FaSearch className="cursor-pointer" />
            <FaUser className="cursor-pointer" />
            <div className="flex items-center border px-2 py-1 rounded-full">
              <BsCart />
              <span className="ml-2">£0.00</span>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white flex flex-col px-10 pb-4 space-y-2">
            <Link className="py-1 text-md " href="/"  onClick={() => setMenuOpen(false)}>HOME</Link>
            <Link className="py-1 text-md " href="/shop" onClick={() => setMenuOpen(false)}>SHOP</Link>
            <Link className="py-1 text-md " href="/upload" onClick={() => setMenuOpen(false)}>UPLOAD IMAGE</Link>
            <Link className="py-1 text-md " href="/materials" onClick={() => setMenuOpen(false)}>MATERIALS</Link>
            <Link className="py-1 text-md " href="/hot-now" onClick={() => setMenuOpen(false)}>HOT NOW</Link>
            <Link className="py-1 text-md " href="/faqs" onClick={() => setMenuOpen(false)}>FAQS</Link>
            <Link className="py-1 text-md " href="/contact" onClick={() => setMenuOpen(false)}>CONTACT US</Link>
          </div>
        )}
      </nav>
    </>
  );
}
