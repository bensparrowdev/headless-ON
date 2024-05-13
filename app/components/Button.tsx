import { Props } from 'types';

export default function Button({ children }: Props) {
  return (
    <button className="relative cursor-pointer text-lg uppercase bg-white border-[1px] border-black py-4 px-8 hover:outline-2 hover:outline hover:outline-white transition-all duration-200 ease-in">
      {children}
    </button>
  );
}
