import { NavLink } from '@remix-run/react';
import { Props } from 'types';
import {
  MdAccountCircle,
  MdOutlineSearch,
  MdOutlineShoppingBag,
} from 'react-icons/md';
import { RiMenu4Fill } from 'react-icons/ri';

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
  return (
    <header className="fixed top-0 left-0 right-0 z-20">
      <div className="w-full text-center p-2 bg-black text-white">
        <small>Free shipping on orders over £50</small>
      </div>
      <nav className="w-full text-white group hover:bg-white hover:text-black transition-all duration-300">
        <div className="container grid grid-cols-[1fr_200px_1fr] gap-x-4 items-center px-5">
          <ul className="flex flex-wrap gap-x-4 gap-y-2 items-center justify-start">
            <li className="lg:hidden">
              <RiMenu4Fill size={30} className="cursor-pointer" />
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
            <MdOutlineSearch size={25} />
            <MdAccountCircle size={25} />
            <MdOutlineShoppingBag size={25} />
          </div>
        </div>
      </nav>

      <MobileMenuDrawer>
        <h1>im a drawer</h1>
      </MobileMenuDrawer>
    </header>
  );
}

function MobileMenuDrawer({ children }: Props) {
  return <div className="lg:hidden">{children}</div>;
}
