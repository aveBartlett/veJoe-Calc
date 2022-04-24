import { GraphQLClient, gql } from "graphql-request";
import { MASTERCHEF_V2_SUBGRAPH } from "../Constants";

const client = new GraphQLClient(
  "https://api.thegraph.com/subgraphs/name/traderjoe-xyz/masterchefv2",
  { headers: {} }
);

const getMasterchefV2QueryDocument = gql`
  query {
    masterChefs(first: 1) {
      id
      joePerSec
      totalAllocPoint
    }
  }
`;

export const getEmissions = async () => {
  const response = await client.request(getMasterchefV2QueryDocument);

  return response.masterChefs[0];
};
