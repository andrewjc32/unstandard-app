import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
} from "flowbite-react";
import Link from "next/link";
import { Inter } from 'next/font/google'

const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
});

const Nav = () => {
  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="/">
        <img
          src="/megaman-logo.jpg"
          className="mr-3 h-6 sm:h-9"
          alt="Megaman Logo"
        />
        <span className={`${inter.className} self-center whitespace-nowrap text-xl font-semibold dark:text-white`}>
          UNSTANDARD
        </span>
      </NavbarBrand>
      <NavbarToggle />
      <NavbarCollapse>
        <NavbarLink as={Link} href="#">
          About Us
        </NavbarLink>
        <NavbarLink href="#">Learn</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
    </Navbar>
  );
};

export default Nav;
