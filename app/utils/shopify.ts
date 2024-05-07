import { createStorefrontClient } from '@shopify/hydrogen-react';

export const client = createStorefrontClient({
  storeDomain: import.meta.env.VITE_PUBLIC_STORE_DOMAIN,
  publicStorefrontToken: import.meta.env.VITE_PUBLIC_STOREFRONT_API_TOKEN,
  privateStorefrontToken: import.meta.env.VITE_PRIVATE_STOREFRONT_API_TOKEN,
});

// Custom GraphQL fetch hook
export const gql = async (query: string) => {
  const response = await fetch(client.getStorefrontApiUrl(), {
    body: JSON.stringify({
      query: query,
    }),
    headers: client.getPrivateTokenHeaders(),
    method: 'POST',
  });

  if (!response.ok) throw new Error(response.statusText);

  const json = await response.json();

  return json;
};
