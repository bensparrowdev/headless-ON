import { MdSearch } from 'react-icons/md';

export default function SearchBox({ open }: { open: boolean }) {
  return (
    <div
      className={`absolute top-heightHeight left-0 w-full bg-white text-black transition-opacity ${
        open ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="container lg:w-3/5 pb-16 grid grid-cols-1 gap-4 pt-8 px-5">
        <div className="flex justify-between items-center w-full pb-4 border-b-2 border-black">
          <span>Search</span>
          <MdSearch size={40} />
        </div>
      </div>
    </div>
  );
}
