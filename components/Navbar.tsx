"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import ThemeSwitcher from "./ToggleTheme";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="border-b">
      <nav className="container w-full mx-auto">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-xl font-bold">
            My Compus Home
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/post" legacyBehavior passHref>
                    <NavigationMenuLink className="px-4 py-2 rounded-md hover:bg-accent">
                      Post an ad
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/signup" legacyBehavior passHref>
                    <NavigationMenuLink className="px-4 py-2 rounded-md hover:bg-accent">
                      Sign-up
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/signin" legacyBehavior passHref>
                    <NavigationMenuLink className="px-4 py-2 rounded-md  hover:bg-accent">
                      Sign-in
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                {/* Other menu items */}
              </NavigationMenuList>
              <ThemeSwitcher />
            </NavigationMenu>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden justify-center items-center">
            <ThemeSwitcher />
            <button
              className=""
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden p-4 space-y-2 border-t">
            <Link href="/features" className="block py-2">
              Features
            </Link>
            <Link href="/pricing" className="block py-2">
              Pricing
            </Link>
            <Link href="/docs" className="block py-2">
              Documentation
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
