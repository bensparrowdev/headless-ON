import type { MetaFunction } from '@remix-run/node';
import { Link, json, useLoaderData } from '@remix-run/react';
import Button from '~/components/Button';
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
    'https://cdn.shopify.com/s/files/1/0641/4211/4968/files/bodybuilder-bicep-curl.jpg?v=1715603453';

  return (
    <main>
      <section className="relative">
        <div className="h-[900px]">
          <img
            src={`${heroImage}width=768`}
            alt="man walking into gym with optimum nutrition logo in the center"
            srcSet={`${heroImage}width=768 768w, ${heroImage}width=1024 1024w, ${heroImage}width=1280 1280w, ${heroImage}width=1920 1920w`}
            sizes="100vw"
            className="block w-full h-full object-cover object-center"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-15"></div>
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-4/5 flex flex-col justify-end items-start">
          <p className="text-white uppercase text-sm">Shop our latest range</p>
          <h1 className="text-white py-4 mb-12">
            Setting the gold standard <br />
            in sports nutrition
          </h1>
          <Button>
            <Link to="/collections/protein">Shop Now</Link>
          </Button>
        </div>
      </section>
      <h1>Welcome to {shopName}!</h1>
    </main>
  );
}
