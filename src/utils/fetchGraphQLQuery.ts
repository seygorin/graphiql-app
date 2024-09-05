interface FetchGraphQLQueryParams {
  url: string;
  query: string;
  variables?: Record<string, unknown>;
  headers?: Record<string, string>;
}

export async function fetchGraphQLQuery({
  url,
  query,
  variables,
  headers = {},
}: FetchGraphQLQueryParams): Promise<Record<string, unknown>> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`GraphQL query failed: ${e.message}`);
    } else {
      throw new Error('An unknown error occurred during the GraphQL query');
    }
  }
}
