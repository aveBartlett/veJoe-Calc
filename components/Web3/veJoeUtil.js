import { GraphQLClient, gql } from "graphql-request";
import BOOSTED_MASTERCHEF_SUBGRAPH from "@traderjoe-xyz/sdk";

const client = new GraphQLClient(BOOSTED_MASTERCHEF_SUBGRAPH, {
  headers: {},
});

const getBoostedMasterchefQueryDocument = gql`
  query {
    masterChefs(first: 1) {
      id
      joePerSec
      totalAllocPoint
      poolCount
      pools(where: { allocPoint_gt: 0 }) {
        id
        pair
        allocPoint
        balance
        jlpBalance
        accJoePerShare
        rewarder {
          name
        }
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
