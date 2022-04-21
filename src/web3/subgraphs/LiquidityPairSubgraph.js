import { GraphQLClient, gql } from "graphql-request";
import { EXCHANGE_SUBGRAPH } from "../../util/Constants";

const client = new GraphQLClient(EXCHANGE_SUBGRAPH, {
  headers: {},
});

const getPairsQueryDocument = gql`
  query getPairs($id: String) {
    pairs(where: { id: $id }) {
      name
      reserveUSD
      totalSupply
      token0Price
      token1Price
      token0 {
        id
        name
      }
      token1 {
        id
        name
      }
    }
  }
`;

export const getPairsDetail = async (pairAdresses) => {
  const params = { id: pairAdresses };

  const response = await client.request(getPairsQueryDocument, params);

  return response.pairs[0];
};
