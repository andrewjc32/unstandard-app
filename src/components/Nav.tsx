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
import { Button } from "flowbite-react";
import Link from "next/link";
import { auth } from '@/auth';

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
        <div className="flex md:order-2">
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User settings"
                img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                rounded
              />
            }
          >
            <DropdownItem as={Link} href="/profile">
              My profile
            </DropdownItem>
            <DropdownItem as={Link} href="/companies">
              Companies
            </DropdownItem>
            <DropdownItem>Settings</DropdownItem>
            <DropdownItem>Customer Service</DropdownItem>
            <DropdownDivider />
            <DropdownItem as={Link} href="/api/auth/signout?callbackUrl=/" className="text-red-400">Sign out</DropdownItem>
          </Dropdown>
          <NavbarToggle />
        </div>
      ) : (
        <div className="flex md:order-2">
          <Button as={Link} href="/login" color="light">Log In</Button>
          <Button as={Link} href="/signup" color="blue">Sign Up</Button>
          <NavbarToggle />
        </div>
      )}
    </Navbar>
  );
};

export default Nav;
