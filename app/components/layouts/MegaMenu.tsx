import { NavLink } from '@remix-run/react';
import type {
  MenuItem,
  MetaobjectConnection,
  MetaobjectField,
} from '@shopify/hydrogen-react/storefront-api-types';
import { MdChevronRight } from 'react-icons/md';

export default function MegaMenu({
  menuChildItems,
  megaMenu,
}: {
  menuChildItems: MenuItem[];
  megaMenu: MetaobjectConnection;
}) {
  return (
    <div className="absolute opacity-0 invisible top-heightHeight left-0 w-full bg-white text-black lg:peer-hover:opacity-100 lg:peer-hover:visible hover:opacity-100 hover:visible transition-opacity duration-300">
      <div className="container grid grid-cols-8 gap-4 pt-8 px-5">
        <div className="col-span-2 mb-10 pb-2 pr-4">
          <NavLink to="/collections" className="text-3xl mb-4 block">
            Shop
          </NavLink>
          <ul className="flex flex-col gap-2">
            {menuChildItems.map(
              ({ id, url, title }) =>
                url && (
                  <li key={id} className="uppercase">
                    <NavLink
                      to={url.split('.com')[1]}
                      className="flex items-center font-medium text-lg hover:text-redAccent transition-colors"
                    >
                      {title}
                      <MdChevronRight size={30} className="ml-auto" />
                    </NavLink>
                  </li>
                )
            )}
          </ul>
        </div>
        <div className="col-span-6 mb-2">
          <div className="flex gap-x-1">
            {megaMenu.edges.map(({ node }) => (
              <div
                key={node.id}
                className="flex flex-col text-center relative aspect-[4/5] w-1/4 p-5 items-center justify-end"
              >
                {node.fields.map(
                  ({ key, value, reference }: MetaobjectField) => {
                    switch (key) {
                      case 'category_collection':
                        return (
                          reference &&
                          reference.__typename === 'Collection' && (
                            <NavLink
                              to={`/collection/${reference.handle}`}
                              key={key}
                              className="absolute top-0 left-0 w-full h-full object-cover object-center z-20 peer"
                              aria-label={`Link to collection ${reference.handle}`}
                            ></NavLink>
                          )
                        );
                      case 'category_image':
                        return reference &&
                          reference.__typename === 'MediaImage' ? (
                          <img
                            src={reference.image?.url}
                            alt={reference.image?.altText || ''}
                            key={key}
                            className="absolute top-0 left-0 w-full h-full object-cover object-center brightness-[.6]"
                          />
                        ) : (
                          <span
                            key={key}
                            className="z-10 uppercase text-lg text-white"
                          >
                            {value}
                          </span>
                        );
                      case 'category_text':
                        return (
                          <span
                            key={key}
                            className="z-10 uppercase text-lg font-bold text-white peer-hover:text-redAccent transition-colors"
                          >
                            {value}
                          </span>
                        );
                      default:
                        return null;
                    }
                  }
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
