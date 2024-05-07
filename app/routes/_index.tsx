import type { MetaFunction } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';
import { gql } from '~/utils/shopify';

export const meta: MetaFunction = () => {
  return [
    { title: 'Optimum Nutrition' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async () => {
  const data = await gql(`
    query {
      shop {
        name
      }
    }
  `);

  return json(data);
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();
  const shopName = data.shop.name;

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.8' }}>
      <h1>Welcome to {shopName}!</h1>
    </div>
  );
}
