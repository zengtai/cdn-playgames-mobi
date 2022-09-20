import { SELECTED_GAMES } from "./constants";

export async function fetchAPI(query, { variables }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    // throw new Error("Failed to fetch API");
  }

  return json.data;
}

export const getGameBySlug = async (slug) => {
  const data = await fetchAPI(
    `
    query getGameBySlug ($where: String) {
      games (filter: { slug: { _eq: $where } }) {
        title
        category {
          name
          slug
        }
        description
        gid
      }
    }
  `,
    {
      variables: {
        where: slug,
      },
    }
  );
  return data?.games[0];
};

export const getAllGamesWithSlug = async (limit) => {
  const data = await fetchAPI(
    `
    query getAllGamesWithSlug ($where: Int) {
      games (limit: $where) {
        slug
      }
    }
  `,
    {
      variables: {
        where: limit ? limit : 300,
      },
    }
  );
  return data?.games;
};

export const getAllCategoriesWithSlug = async () => {
  const data = await fetchAPI(
    `
    query getAllCategoriesWithSlug ($where: Int) {
      categories (limit: $where) {
        slug
      }
    }
  `,
    {}
  );
  return data?.categories;
};

export const getGamesByCategory = async (category, limit) => {
  const data = await fetchAPI(
    `
    query getGamesByCategory ($where: String, $limit: Int) {
      games (filter: { category: { slug: { _eq: $where } } }, limit: $limit,) {
        title
        slug
        gid
        category {
            name
            slug
        }
        rating
      }
    }
  `,
    {
      variables: {
        where: category,
        limit: limit ? limit : 30,
      },
    }
  );
  return data.games;
};

export const getRelatedGamesBySlug = async (slug) => {
  const data = await fetchAPI(
    `
      query getRelatedGamesBySlug ($where: String, $include: [String]) {
        games (filter: { slug: { _neq: $where },  gid: { _in: $include} }, limit: 12, sort: "-creation_date") {
          title
          slug
          category {
              name
              slug
          }
          gid
          rating
        }
      }
    `,
    {
      variables: {
        where: slug,
        include: SELECTED_GAMES.length ? SELECTED_GAMES : [],
      },
    }
  );
  return data.games;
};

export const getGamesForHome = async (limit) => {
  const data = await fetchAPI(
    `
    query getGamesForHome ($where: Int, $include: [String]) {
      games (filter: { gid: { _in: $include} }, sort: "-creation_date", limit: $where) {
        title
        slug
        gid
        category {
          name
          slug
        }
        rating
      }
    }
  `,
    {
      variables: {
        where: limit ? limit : 21,
        include: SELECTED_GAMES.length ? SELECTED_GAMES : [],
      },
    }
  );
  return data?.games;
};

export const getDataForCategoryList = async (limit) => {
  const data = await fetchAPI(
    `
    query getDataForCategoryList ($limit: Int ${
      SELECTED_GAMES.length ? `, $include: [String]` : ``
    }) {
      games (${
        SELECTED_GAMES.length ? `filter: { gid: { _in: $include} },` : ``
      } sort: "-creation_date", limit: $limit) {
        title
        slug
        gid
        category {
          name
          slug
        }
      }
    }
  `,
    {
      variables: SELECTED_GAMES.length
        ? {
            limit: limit ? limit : 300,
            include: SELECTED_GAMES,
          }
        : {
            limit: limit ? limit : 21,
          },
    }
  );
  return data?.games;
};
