import { Props } from 'types';

export default function Button({ children }: Props) {
  return (
    <button className="relative cursor-pointer text-lg uppercase bg-white border-[1px] border-black py-3 px-8 transition-all duration-150 ease-in group">
      {children}
      <span className="absolute bottom-0 left-0 h-1 w-0 bg-black group-hover:w-full transition-all duration-300"></span>
    </button>
  );
}
