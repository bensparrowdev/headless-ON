import { createStorefrontClient } from '@shopify/hydrogen-react';

// Access Shopify Client
export const shopClient = createStorefrontClient({
  storeDomain: import.meta.env.VITE_PUBLIC_STORE_DOMAIN,
  publicStorefrontToken: import.meta.env.VITE_PUBLIC_STOREFRONT_API_TOKEN,
  privateStorefrontToken: import.meta.env.VITE_PRIVATE_STOREFRONT_API_TOKEN,
});

type GqlRequestVariables = {
  [key: string]: string | number | boolean | null | undefined;
};

// Custom GraphQL fetch hook
export const gql = async <T>(
  query: string,
  variables?: GqlRequestVariables
): Promise<T> => {
  const response = await fetch(shopClient.getStorefrontApiUrl(), {
    body: JSON.stringify({
      query,
      variables,
    }),
    headers: shopClient.getPrivateTokenHeaders(),
    method: 'POST',
  });

  if (!response.ok) throw new Error(response.statusText);

  return await response.json();
};
