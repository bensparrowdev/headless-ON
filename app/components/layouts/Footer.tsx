import { NavLink } from '@remix-run/react';

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

export default function Footer({ menu }: MenuProp) {
  return (
    <footer className="container flex flex-col items-center py-20 px-4">
      <div className="flex flex-col items-center gap-12 w-full max-w-4xl pt-5">
        <h3>Subscribe for the latest news, events and promos.</h3>
        <form
          onSubmit={() => {
            return false;
          }}
          className="w-full max-w-96"
        >
          <div className="flex justify-between border-b-2 pb-3 mb-2 w-full">
            <label htmlFor="footer-email-signup" className="sr-only">
              Enter email address*
            </label>
            <input
              id="footer-email-signup"
              type="email"
              autoComplete="email"
              placeholder="Enter email address*"
              className="text-sm flex-grow outline-none placeholder-black"
            />
            <button>Subscribe</button>
          </div>
          <small>*required</small>
        </form>
      </div>
      <ul className="flex flex-wrap gap-5 pt-10 uppercase">
        {menu.items.map((item) => (
          <li key={item.id} className="relative group/li">
            <span className="absolute opacity-0 h-[2px] w-0 bg-black group-hover/li:w-full group-hover/li:opacity-100 transition-all duration-300"></span>
            <NavLink to={item.url}>{item.title}</NavLink>
          </li>
        ))}
      </ul>
      <div className="pt-10">
        <img
          src="/ON-logo.svg"
          alt="Optimum Nutrition logo"
          width="192"
          className="w-48"
        />
      </div>
      <div className="flex flex-col items-center pt-10">
        <small>
          *These statements have not been evaluated by the Food and Drug
          Administration. These products are not intended to diagnose, treat,
          cure or prevent any disease.
        </small>
        <small>
          &copy; {new Date().getFullYear()} Optimum Nutrition, INC. All rights
          reserved.
        </small>
      </div>
    </footer>
  );
}
