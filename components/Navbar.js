import React from 'react'
import Link from 'next/link'
import { Navbar as BSNavbar, Nav, NavItem, NavLink } from 'reactstrap'

const Navbar = ({ activePage }) => {
  return (
    <BSNavbar expand="md">
      <Nav className="justify-content-center">
        <NavItem>
          <Link href="/">
            <NavLink className={activePage === 'home' ? ' active' : ''}>Home</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/submit">
            <NavLink className={activePage === 'submit' ? ' active' : ''}>Submit</NavLink>
          </Link>
        </NavItem>
        <NavItem>
          <Link href="/about">
            <NavLink className={activePage === 'about' ? ' active' : ''}>About</NavLink>
          </Link>
        </NavItem>
      </Nav>
    </BSNavbar>
  )
}

export default Navbar
