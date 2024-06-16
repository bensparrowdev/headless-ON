import { ActionFunction, json } from '@remix-run/node';
import { PredictiveSearchResult } from '@shopify/hydrogen-react/storefront-api-types';
import { gql } from '~/utils/shopify-client';

export type PredictiveSearchData = {
  data: {
    predictiveSearch: PredictiveSearchResult;
  };
};

export const action: ActionFunction = async ({ request }) => {
  try {
    const formData = await request.formData();
    const searchQuery = formData.get('query') as string;

    if (!searchQuery) {
      return json({ results: [] });
    }

    const { data }: PredictiveSearchData = await gql(
      `
        query suggestions($query: String!) {
          predictiveSearch(query: $query) {
            products {
              id
              title
              handle
            }
            queries {
              text
            }
          }
        }
      `,
      { query: searchQuery }
    );
    const results = data.predictiveSearch.products;

    return json({ results });
  } catch (err) {
    return json({ error: 'something went wrong', err }, { status: 500 });
  }
};
