import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  left: boolean;
  open: boolean;
}

export default function SideDrawer({ children, left, open }: Props) {
  return (
    <div
      className={`fixed px-8 py-8 top-0 w-11/12 lg:hidden bg-white h-full transition-transform duration-300 ease-in-out  ${
        left
          ? `left-0 ${!open ? '-translate-x-[101%]' : ''}`
          : `right-0 ${!open ? 'translate-x-[101%]' : ''}`
      }`}
    >
      {children}
    </div>
  );
}
