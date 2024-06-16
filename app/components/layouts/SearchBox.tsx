import { useFetcher } from '@remix-run/react';
import { useEffect, useState } from 'react';
import { MdSearch } from 'react-icons/md';
import { action } from '~/routes/search';

export default function SearchBox({ open }: { open: boolean }) {
  const fetcher = useFetcher<typeof action>();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (fetcher.data && fetcher.data.results) {
      setResults(fetcher.data.results);
      console.log(fetcher.data.results);
    }
  }, [query]);

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const newQuery = e.currentTarget.value;
    setQuery(newQuery);

    if (newQuery.trim().length > 0) {
      fetcher.submit(
        { query: newQuery },
        {
          method: 'post',
          action: '/search',
        }
      );
    } else {
      setResults([]);
    }
  };

  return (
    <div
      className={`absolute top-heightHeight left-0 bg-white text-black transition-opacity ${
        open ? 'opacity-100 w-full' : 'opacity-0 w-0'
      }`}
    >
      <div className="container lg:w-3/5 pb-16 grid grid-cols-1 gap-4 pt-8 px-5">
        <div className="flex justify-between items-center gap-x-2 w-full pb-4 border-b-2 border-black">
          <fetcher.Form method="post" action="/search" className="w-full">
            <label htmlFor="predictiveSearch" className="sr-only">
              Search
            </label>
            <input
              type="text"
              id="predictiveSearch"
              placeholder="Search"
              name="query"
              autoComplete="off"
              className="w-full uppercase text-xl lg:text-3xl outline-none placeholder:text-black placeholder:opacity-50"
              onChange={handleChange}
              value={query}
            />
          </fetcher.Form>
          <MdSearch size={40} />
        </div>
      </div>
      {/* Search Results */}
      <div className="container h-52">
        {results.length > 0 ? (
          results.map((results) => (
            <span key={results.id}>{results.title}</span>
          ))
        ) : (
          <span>no results :(</span>
        )}
      </div>
    </div>
  );
}
