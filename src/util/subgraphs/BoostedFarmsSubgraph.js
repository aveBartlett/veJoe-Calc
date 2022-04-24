import { GraphQLClient, gql } from "graphql-request";
import { BOOSTED_MASTERCHEF_SUBGRAPH } from "../Constants";

const client = new GraphQLClient(BOOSTED_MASTERCHEF_SUBGRAPH, {
  headers: {},
});

const getBoostedMasterchefQueryDocument = gql`
  query {
    masterChefs(first: 1) {
      id
      poolCount
      totalAllocPoint
      pools(where: { allocPoint_gt: 0 }) {
        id
        pair
        allocPoint
        balance
        jlpBalance
        accJoePerShare
      }
    }
  }
`;

export const getBoostedMasterchef = async () => {
  const params = {};

  const response = await client.request(
    getBoostedMasterchefQueryDocument,
    params
  );

  return response.masterChefs[0];
};
