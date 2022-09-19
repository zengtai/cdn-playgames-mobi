const API_URL = `https://cms.uptapgame.com/`;

async function fetchAPI(query, { variables }) {
  const res = await fetch(`${API_URL}/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: {
      query,
      variables,
    },
  });

  const json = res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
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
        game_url
        icon_url
      }
    }
  `,
    {
      variables: {
        where: { slug },
      },
    }
  );
  return data?.games[0];
};

export const getGamesByCateogry = async (category) => {
  const data = await fetchAPI(
    `
    query getGamesByCateogry ($where: String) {
      games (filter: { category: { name: { _eq: $where } } }) {
        title
        slug
        category {
            name
            slug
        }
        game_url
        icon_url
        rating
      }
    }
  `,
    {
      variables: {
        where: { category },
      },
    }
  );
  return data.games;
};

export const getRelatedGamesBySlug = async (slug) => {
  const data = await fetchAPI(
    `
    query getRelatedGamesBySlug ($where: String) {
      games (filter: { slug: { _neq: $where } }, limit: 10, sort: "-creation_date") {
        title
        slug
        category {
            name
            slug
        }
        icon_url
        rating
      }
    }
  `,
    {
      variables: {
        where: { slug },
      },
    }
  );
  return data.games;
};

export const getGamesForHome = async (limit) => {
  const data = await fetchAPI(
    `
    query getGamesForHome ($where: Int) {
      games (sort: "-creation_date", limit: $where) {
        title
        slug
        icon_url
        category {
          name
        }
        rating
      }
    }
  `,
    {
      variables: {
        where: limit ? limit : 10,
      },
    }
  );
  return data.games;
};
