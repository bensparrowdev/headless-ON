import { Fragment, useState } from 'react';
import { NavLink } from '@remix-run/react';
import {
  MdAccountCircle,
  MdOutlineSearch,
  MdOutlineShoppingBag,
  MdClose,
  MdChevronRight,
  MdArrowDropDown,
} from 'react-icons/md';
import { RiMenu4Fill } from 'react-icons/ri';
import SideDrawer from '../SideDrawer';
import type {
  Menu,
  MenuItem,
} from '@shopify/hydrogen-react/storefront-api-types';

export default function Header({ menu }: { menu: Menu }) {
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false);
  const [isItemOpen, setIsItemOpen] = useState<boolean>(false);

  const handleMenuOpen = () => {
    setOpenMobileMenu((openMobileMenu) => !openMobileMenu);
  };

  const toggleItemOpen = () => {
    setIsItemOpen((isItemOpen) => !isItemOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-20">
      <div className="w-full text-center p-2 bg-black text-white">
        <small>Free shipping on orders over £50</small>
      </div>
      <nav className="relative w-full text-white group hover:bg-white hover:text-black transition-all duration-300">
        <div className="container grid grid-cols-[1fr_200px_1fr] gap-x-4 items-center px-5">
          <ul className="flex h-full gap-x-4 gap-y-2 items-center justify-start">
            <li className="lg:hidden">
              <RiMenu4Fill
                size={30}
                className="cursor-pointer"
                onClick={handleMenuOpen}
              />
            </li>
            {menu.items.map(
              ({ id, url, title, items }) =>
                url && (
                  <Fragment key={id}>
                    <li className="hidden lg:flex items-center relative uppercase h-full group/li peer">
                      <span className="absolute top-8 opacity-0 h-[2px] w-0 bg-black group-hover/li:w-full group-hover/li:opacity-100 transition-all duration-300 ease-in-out"></span>
                      <NavLink
                        to={url.split('.com')[1]}
                        className="inline-flex items-center"
                      >
                        {title}
                        {items.length ? (
                          <MdArrowDropDown size={20} className="ml-auto" />
                        ) : null}
                      </NavLink>
                    </li>
                    {items.length > 0 && <MegaNav menuChildItems={items} />}
                  </Fragment>
                )
            )}
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
        {/* Mobile Menu */}
        <ul className="flex flex-col gap-y-4 pb-8 border-b">
          {menu.items.map(
            ({ id, url, title, items }) =>
              url && (
                <li key={id} className="uppercase relative">
                  {items.length > 0 ? (
                    <button
                      className="flex items-center w-full uppercase font-medium text-3xl z-10"
                      onClick={toggleItemOpen}
                    >
                      {title}
                      <MdArrowDropDown
                        size={30}
                        className={`ml-auto ${isItemOpen && 'rotate-180'}`}
                      />
                    </button>
                  ) : (
                    <NavLink
                      to={url.split('.com')[1]}
                      className="flex items-center font-medium text-3xl"
                    >
                      {title}
                      <MdChevronRight size={30} className="ml-auto" />
                    </NavLink>
                  )}

                  {items.length > 0 && (
                    <ul
                      className={`relative flex flex-col z-0 gap-y-2 w-5/6 overflow-hidden transition-all ease-in-out ${
                        isItemOpen ? 'h-fit max-h-60 pt-2' : 'h-0 max-h-0'
                      }`}
                    >
                      {items.map(
                        ({ id, url, title }) =>
                          url && (
                            <li key={id} className="indent-4">
                              <NavLink
                                to={url.split('.com')[1]}
                                className="text-xl"
                              >
                                {title}
                              </NavLink>
                            </li>
                          )
                      )}
                    </ul>
                  )}
                </li>
              )
          )}
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

function MegaNav({ menuChildItems }: { menuChildItems: MenuItem[] }) {
  return (
    <div className="absolute opacity-0 invisible top-heightHeight left-0 w-full bg-white text-black lg:peer-hover:opacity-100 lg:peer-hover:visible hover:opacity-100 hover:visible transition-opacity duration-300">
      <div className="container grid grid-cols-6 gap-4">
        <div className="col-span-2 bg-blue-400">
          <h2>
            <NavLink to="/collections" className="text-3xl">
              Shop
            </NavLink>
          </h2>
          <ul className="">
            {menuChildItems.map(
              ({ id, url, title }) =>
                url && (
                  <li key={id} className="uppercase">
                    <NavLink
                      to={url.split('.com')[1]}
                      className="flex items-center font-medium text-3xl"
                    >
                      {title}
                      <MdChevronRight size={30} className="ml-auto" />
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="col-span-4 bg-green-300">
          <h2 className="cursor-default">Image</h2>
        </div>
      </div>
    </div>
  );
}
