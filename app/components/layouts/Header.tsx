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
    <header>
      <nav>
        {/* nav */}
        <ul>
          {menu.items.map((item) => (
            <li key={item.id}>
              <NavLink to={item.url.substring(item.url.indexOf('.com') + 4)}>
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* logo */}
        <img src="/ON-logo.svg" alt="Optimum Nutrition logo" />

        {/* items */}
        <div>
          <MdOutlineSearch size={30} />
          <MdAccountCircle size={30} />
          <MdOutlineShoppingBag size={30} />
        </div>
      </nav>
    </header>
  );
}
