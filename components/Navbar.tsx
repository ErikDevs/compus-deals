"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import ThemeSwitcher from "./ToggleTheme";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { getInitials } from "@/lib/utils";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data: session, status, update } = useSession();
  const pathname = usePathname();

  // Effect to refresh session when it changes
  useEffect(() => {
    if (status === "authenticated") {
      update(); // Force session update when user logs in
    }
  }, [status, update]);

  return (
    <header className="border-b">
      <nav className="container w-full mx-auto">
        <div className="flex items-center justify-between p-4">
          <Link href="/" className="text-xl font-bold">
            myCompusHome
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/post" legacyBehavior passHref>
                    <NavigationMenuLink
                      className={`px-4 py-2 rounded-md hover:bg-accent ${
                        pathname === "/postad" ? "text-blue-600" : ""
                      }`}
                    >
                      Post an ad
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                {session ? (
                  <NavigationMenuItem>
                    <Link href="/myprofile" legacyBehavior passHref>
                      <Avatar>
                        <AvatarImage src="" />
                        <AvatarFallback>
                          {getInitials(session?.user?.name || "?")}
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  </NavigationMenuItem>
                ) : (
                  <div className="flex">
                    <NavigationMenuItem>
                      <Link href="/sign-up" legacyBehavior passHref>
                        <NavigationMenuLink className="px-4 py-2 rounded-md hover:bg-accent">
                          Sign-up
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                      <Link href="/sign-in" legacyBehavior passHref>
                        <NavigationMenuLink className="px-4 py-2 rounded-md hover:bg-accent">
                          Sign-in
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  </div>
                )}
              </NavigationMenuList>
              <ThemeSwitcher />
            </NavigationMenu>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden justify-center items-center">
            <ThemeSwitcher />
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
