export const DEFAULT_ENDPOINT = 'https://swapi-graphql.netlify.app/.netlify/functions/index';
export const DEFAULT_QUERY = `query {
  allFilms {
    films {
      id
      title
      director
      releaseDate
    }
  }
}`;
export const DEFAULT_HEADERS = `{
  "Content-Type": "application/json",
  "Accept": "application/json"
}`;
export const DEFAULT_VARIABLES = `{
  "filmId": "ZmlsbXM6MQ=="
}`;

export const SCHEMA_QUERY = `
  query IntrospectionQuery {
    __schema {
      types {
        name
        description
        fields {
          name
          description
          type {
            name
            kind
          }
          args {
            name
            description
            type {
              name
              kind
            }
          }
        }
      }
      queryType { name }
      mutationType { name }
      subscriptionType { name }
    }
  }
`;
