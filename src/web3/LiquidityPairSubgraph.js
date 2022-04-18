import { GraphQLClient, gql } from "graphql-request";
import EXCHANGE_SUBGRAPH from "@traderjoe-xyz/sdk";

const client = new GraphQLClient(EXCHANGE_SUBGRAPH, {
  headers: {},
});

const getPairsQueryDocument = gql`
  query getPairs($id_in: [String]) {
    pairs(where: { id_in: $id_in }) {
      id
      name
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

export const getPairs = async (pairAdresses) => {
  const params = { id_in: pairAdresses };

  const response = await client.request(getPairsQueryDocument, params);

  return response.pairs;
};
