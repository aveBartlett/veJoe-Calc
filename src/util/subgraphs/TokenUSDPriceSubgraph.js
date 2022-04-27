import { GraphQLClient, gql } from "graphql-request";
import { EXCHANGE_SUBGRAPH } from "../Constants";

const client = new GraphQLClient(EXCHANGE_SUBGRAPH, {
  headers: {},
});

const getPriceQueryDocument = gql`
  query getPairs($id: String) {
    pairs(
      where: {
        token0: $id
        token1: "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e"
      }
    ) {
      token1Price
    }
  }
`;

export const getTokenPrice = async (tokenAddress) => {
  const params = { id: tokenAddress };

  if (tokenAddress === "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e") return 1;

  const response = await client.request(getPriceQueryDocument, params);

  return response.pairs[0];
};
