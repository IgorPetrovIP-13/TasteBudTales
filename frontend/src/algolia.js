import algoliasearch from 'algoliasearch';

const client = algoliasearch(import.meta.env.VITE_ALGOLIA_APP_ID, import.meta.env.VITE_ALGOLIA_SEARCH_API_KEY);
const index = client.initIndex("recipes");

export const searchRecipes = async (query) => {
  try {
    const result = await index.search(query, {
        hitsPerPage: 6,
    });
    return result.hits;
  } catch (error) {
    throw new Error('Error fetching data from Algolia');
  }
};