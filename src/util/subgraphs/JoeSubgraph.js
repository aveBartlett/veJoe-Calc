import { GraphQLClient, gql } from "graphql-request";
import { EXCHANGE_SUBGRAPH } from "../Constants";

const client = new GraphQLClient(EXCHANGE_SUBGRAPH, {
  headers: {},
});

const getJoePriceQueryDocument = gql`
  query {
    pairs(where: { id: "0x3bc40d4307cd946157447cd55d70ee7495ba6140" }) {
      id
      name
      token1Price
    }
  }
`;

export const getJoePrice = async () => {
  const response = await client.request(getJoePriceQueryDocument);

  return response.pairs[0].token1Price;
};
