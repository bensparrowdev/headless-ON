import { NavLink } from '@remix-run/react';
import {
  MdAccountCircle,
  MdOutlineSearch,
  MdOutlineShoppingBag,
  MdClose,
  MdChevronRight,
} from 'react-icons/md';
import { RiMenu4Fill } from 'react-icons/ri';
import SideDrawer from '../SideDrawer';
import { useState } from 'react';

interface MenuItem {
  items: {
    id: string;
    title: string;
    url: string;
  }[];
}

interface MenuProp {
  menu: MenuItem;
}

export default function Header({ menu }: MenuProp) {
  const [openMobileMenu, setOpenMobileMenu] = useState(true);

  const handleMenuOpen = () => {
    setOpenMobileMenu((openMobileMenu) => !openMobileMenu);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20">
      <div className="w-full text-center p-2 bg-black text-white">
        <small>Free shipping on orders over £50</small>
      </div>
      <nav className="w-full text-white group hover:bg-white hover:text-black transition-all duration-300">
        <div className="container grid grid-cols-[1fr_200px_1fr] gap-x-4 items-center px-5">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 items-center justify-start">
            <li className="lg:hidden">
              <RiMenu4Fill
                size={30}
                className="cursor-pointer"
                onClick={handleMenuOpen}
              />
            </li>
            {menu.items.map((item) => (
              <li
                key={item.id}
                className="hidden lg:block relative uppercase group/li"
              >
                <span className="absolute -top-1 opacity-0 h-[2px] w-0 bg-black group-hover/li:w-full group-hover/li:opacity-100 transition-all duration-300"></span>
                <NavLink to={item.url}>{item.title}</NavLink>
              </li>
            ))}
          </ul>

          <NavLink to="/" className="my-8">
            <img
              src="/ON-logo.svg"
              alt="Optimum Nutrition logo"
              width="192"
              className="flex items-center w-48 invert group-hover:invert-0 transition-all duration-300"
            />
          </NavLink>

          <div className="flex flex-wrap gap-2 items-center justify-end">
            <MdOutlineSearch size={25} title="magnifying glass icon" />
            <MdAccountCircle
              size={25}
              title="person icon"
              className="hidden lg:block"
            />
            <MdOutlineShoppingBag size={25} title="shopping bag icon" />
          </div>
        </div>
      </nav>

      <SideDrawer left={true} open={openMobileMenu}>
        <div className="flex justify-end items-center pb-10">
          <MdClose
            size={30}
            title="cross icon to close"
            onClick={handleMenuOpen}
            className={`transition-all duration-500 ease-in-out cursor-pointer ${
              openMobileMenu ? '' : 'rotate-[360deg]'
            }`}
          />
        </div>
        <ul className="flex flex-col gap-y-4 pb-8 border-b">
          {menu.items.map((item) => (
            <li key={item.id} className="uppercase">
              <NavLink
                to={item.url}
                className="flex items-center font-medium text-3xl"
              >
                {item.title}
                <MdChevronRight size={30} className="ml-auto" />
              </NavLink>
            </li>
          ))}
        </ul>
        <div>
          <NavLink to="/account/orders" className="flex gap-x-2 py-4 border-b">
            <MdAccountCircle size={25} title="person icon" />
            Login/Create Account
          </NavLink>
          <NavLink to="/cart" className="flex gap-x-2 py-4 border-b">
            <MdOutlineShoppingBag size={25} title="shopping bag icon" />
            Bag
          </NavLink>
        </div>
      </SideDrawer>
    </header>
  );
}
