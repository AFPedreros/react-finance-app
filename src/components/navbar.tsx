"use client";

import { Link } from "@nextui-org/link";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { GithubIcon, Logo, TwitterIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/features/theme/theme-switch";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <NextUINavbar
      classNames={{
        base: "bg-primary",
        wrapper: "w-full justify-center",
        item: "hidden md:flex text-primary-foreground/75 text-sm data-[active=true]:text-primary-foreground",
      }}
      height="64px"
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand as="li" className="max-w-fit gap-3 text-primary-foreground">
        <NextLink className="flex items-center justify-start gap-1" href="/">
          <Logo size={34} />
          <p className="text-small font-bold">ACME</p>
        </NextLink>
      </NavbarBrand>

      {isHome && (
        <NavbarContent>
          <ul className="ml-2 hidden justify-start gap-4 sm:flex">
            {siteConfig.navItems.map((item) => (
              <NavbarItem key={item.href} isActive={pathname === item.href}>
                <NextLink href={item.href}>{item.label}</NextLink>
              </NavbarItem>
            ))}
          </ul>
        </NavbarContent>
      )}

      <NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden gap-2 sm:flex">
          <Link isExternal aria-label="Twitter" href={siteConfig.links.twitter}>
            <TwitterIcon className="text-primary-foreground/75" />
          </Link>
          <Link isExternal aria-label="Github" href={siteConfig.links.github}>
            <GithubIcon className="text-primary-foreground/75" />
          </Link>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <Link isExternal aria-label="Github" href={siteConfig.links.github}>
          <GithubIcon className="text-primary-foreground/75" />
        </Link>
        <ThemeSwitch />
        <NavbarMenuToggle className="text-primary-foreground/75" />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
}
