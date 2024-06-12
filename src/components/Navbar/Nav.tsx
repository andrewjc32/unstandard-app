
import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink,
  NavbarToggle,
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownDivider,
} from "flowbite-react";
import NavMenu from "./NavMenu";
import { Button } from "flowbite-react";
import Link from "next/link";
import { auth } from '@/auth';
import { signOutUser } from "@/actions/authActions";

const Nav = async () => {
  const session = await auth();

  return (
    <Navbar fluid rounded>
      <NavbarBrand as={Link} href="/">
        <img
          src="/megaman-logo.jpg"
          className="mr-3 h-6 sm:h-9"
          alt="Megaman Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          UNSTANDARD
        </span>
      </NavbarBrand>
      <NavbarCollapse>
        <NavbarLink as={Link} href="#">
          About Us
        </NavbarLink>
        <NavbarLink href="#">Learn</NavbarLink>
        <NavbarLink href="#">Pricing</NavbarLink>
        <NavbarLink href="#">Contact</NavbarLink>
      </NavbarCollapse>
      {session ? (
        <NavMenu />
      ) : (
        <div className="flex md:order-2">
          <Button as={Link} href="/login" className="mr-2" color="light">Log In</Button>
          <Button as={Link} href="/signup" className="mr-2" color="blue">Sign Up</Button>
          <NavbarToggle />
        </div>
      )}
    </Navbar>
  );
};

export default Nav;