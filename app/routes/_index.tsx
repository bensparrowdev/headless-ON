import type { MetaFunction } from '@remix-run/node';
import { json, useLoaderData } from '@remix-run/react';
import { gql } from '~/utils/shopify-client';

export const meta: MetaFunction = () => {
  return [
    { title: 'Optimum Nutrition' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export const loader = async () => {
  const data = await gql(`
   {
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
  const heroImage =
    'https://cdn.shopify.com/s/files/1/0641/4211/4968/files/ON-hero.png?';

  return (
    <main>
      <section>
        <img
          src={`${heroImage}width=768`}
          alt="man walking into gym with optimum nutrition logo in the center"
          srcSet={`${heroImage}width=768 768w, ${heroImage}width=1024 1024w, ${heroImage}width=1280 1280w, ${heroImage}width=1920 1920w`}
          sizes="100vw"
          className="object-cover w-full h-full"
        />
      </section>
      <h1>Welcome to {shopName}!</h1>
    </main>
  );
}
