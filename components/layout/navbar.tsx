"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
// import { signOutAction } from "@/app/(auth)/logout/action";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Our Services", href: "/services" },
  { name: "About Us", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`text-white fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black/15 backdrop-blur-md py-2" : "bg-neutral-950 py-2"
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative w-40 h-16 z-10">
            <Image
              src="/assets/logo/white-full.png"
              alt="Stitches by Q"
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-off-white hover:text-coral-red transition-colors"
              >
                {item.name}
              </Link>
            ))}
            {/* Place Order Button */}
            <Button
              asChild
              className="bg-white text-black rounded-full px-6 py-2 font-semibold 
              border border-transparent hover:bg-neutral-900 hover:text-white hover:border-coral-red 
              transition-all duration-300"
            >
              <Link href="/order">Place Order</Link>
            </Button>
            {/* Auth Buttons */}
            {/* <SignedOut>
              <SignInButton>
                <Button
                  variant="outline"
                  className="rounded-full px-6 py-2 border-white text-white hover:bg-white hover:text-black transition-all"
                >
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn> */}
            {/* <form action={signOutAction}>
              <button className="text-sm underline">Sign out</button>
            </form> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-0 bg-black/95 z-40 flex flex-col items-center justify-center gap-8 
          transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-2xl text-off-white hover:text-coral-red transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          {/* Place Order Button */}
          <Button
            asChild
            size="lg"
            className="bg-white text-black rounded-full px-8 py-3 font-semibold 
            border border-transparent hover:bg-neutral-900 hover:text-white hover:border-coral-red 
            transition-all duration-300"
          >
            <Link href="/order" onClick={() => setIsOpen(false)}>
              Place Order
            </Link>
          </Button>

          {/* Auth for Mobile */}
          {/* <SignedOut>
            <SignInButton>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 py-3 border-white text-white hover:bg-white hover:text-black transition-all"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn> */}

          {/* <form action={signOutAction}>
            <button className="text-sm underline">Sign out</button>
          </form> */}
        </div>
      </Container>
    </header>
  );
}
