import { NavLink } from '@remix-run/react';
import {
  MdAccountCircle,
  MdOutlineSearch,
  MdOutlineShoppingBag,
} from 'react-icons/md';

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
    <header className="fixed top-0 left-0 right-0">
      <div className="w-full text-center p-2 bg-black text-white">
        <small>Free shipping on orders over £50</small>
      </div>
      <nav className="w-full text-white group hover:bg-white hover:text-black transition-all duration-300">
        <div className="container grid grid-cols-[1fr_200px_1fr] gap-x-4 items-center px-5">
          <ul className="flex flex-wrap gap-x-4 items-center justify-start">
            {menu.items.map((item) => (
              <li key={item.id} className="uppercase">
                <NavLink to={item.url}>{item.title}</NavLink>
              </li>
            ))}
          </ul>

          <img
            src="/ON-logo.svg"
            alt="Optimum Nutrition logo"
            width="192"
            className="flex items-center w-48 py-8 invert group-hover:invert-0 transition-all duration-300"
          />

          <div className="flex flex-wrap gap-2 items-center justify-end">
            <MdOutlineSearch size={25} />
            <MdAccountCircle size={25} />
            <MdOutlineShoppingBag size={25} />
          </div>
        </div>
      </nav>
    </header>
  );
}
