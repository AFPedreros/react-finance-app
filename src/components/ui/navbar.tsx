"use client";

import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link as NextUILink,
  Navbar as NextUINavbar,
} from "@nextui-org/react";
import { Link, useLocation } from "@tanstack/react-router";
import React from "react";

import { GithubIcon, Logo, TwitterIcon } from "@/components/ui/icons";
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/features/theme/components/theme-switch";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { pathname } = useLocation();

  return (
    <NextUINavbar
      classNames={{
        base: "bg-primary",
        wrapper: "w-full justify-center ",
        item: "hidden md:flex text-primary-foreground/75 text-sm data-[active=true]:text-primary-foreground",
      }}
      height="64px"
      isMenuOpen={isMenuOpen}
      maxWidth="xl"
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarBrand as="li" className="max-w-fit gap-3 text-primary-foreground">
        <Link className="flex items-center justify-start gap-1" to="/">
          <Logo size={34} />
          <p className="text-small font-bold">ACME</p>
        </Link>
      </NavbarBrand>

      <NavbarContent>
        <ul className="ml-2 hidden justify-start gap-4 sm:flex">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href} isActive={pathname === item.href}>
              <Link to={item.href}>{item.label}</Link>
            </NavbarItem>
          ))}
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden gap-2 sm:flex">
          <NextUILink
            isExternal
            aria-label="Twitter"
            href={siteConfig.links.twitter}
          >
            <TwitterIcon className="text-primary-foreground/75" />
          </NextUILink>
          <NextUILink
            isExternal
            aria-label="Github"
            href={siteConfig.links.github}
          >
            <GithubIcon className="text-primary-foreground/75" />
          </NextUILink>
          <ThemeSwitch />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="basis-1 pl-4 sm:hidden" justify="end">
        <NextUILink
          isExternal
          aria-label="Github"
          href={siteConfig.links.github}
        >
          <GithubIcon className="text-primary-foreground/75" />
        </NextUILink>
        <ThemeSwitch />
        <NavbarMenuToggle className="text-primary-foreground/75" />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <NextUILink
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
              </NextUILink>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
