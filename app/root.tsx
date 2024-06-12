import type { LinksFunction, LoaderFunction } from '@remix-run/node';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  json,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { gql } from './utils/shopify-client';
import Header from './components/layouts/Header';
import Footer from './components/layouts/Footer';
import stylesheet from '~/tailwind.css?url';
import { ShopifyProvider } from '@shopify/hydrogen-react';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: stylesheet, as: 'document' },
];

export const loader: LoaderFunction = async () => {
  const data = await gql(`
   {
      header: menu(handle: "main-menu") {
        items {
          id
          title
          url
          items {
            id
            title
            url
          }
        }
      }
      footer: menu(handle: "footer") {
        items {
          id
          title
          url
        }
      }
      megaMenu: metaobjects(first: 3, type: "header_footer_data") {
        edges {
          node {
            id
            fields {
              key
              value
              reference {
                ... on MediaImage {
                  image {
                    url
                    altText
                    id
                  }
                }
                __typename
              }
            }
          }
        }
      }
    }
  `);

  return json(data);
};

export function Layout({ children }: { children: React.ReactNode }) {
  const { data } = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ShopifyProvider
          storeDomain={import.meta.env.VITE_PUBLIC_STORE_DOMAIN}
          storefrontToken={import.meta.env.VITE_PUBLIC_STOREFRONT_API_TOKEN}
          storefrontApiVersion={import.meta.env.VITE_API_VERSION}
          countryIsoCode="GB"
          languageIsoCode="EN"
        >
          <Header menu={data.header} megaMenu={data.megaMenu} />
          {children}
          <Footer menu={data.footer} />
          <ScrollRestoration />
          <Scripts />
        </ShopifyProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </div>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}
