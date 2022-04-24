import { GraphQLClient, gql } from "graphql-request";
import { VEJOE_SUBGRAPH } from "../Constants";

const client = new GraphQLClient(VEJOE_SUBGRAPH, {
  headers: {},
});

const getVeJoeQueryDocument = gql`
  query getVeJoe($id: String) {
    users(where: { id: $id }) {
      veJoeBalance
    }
  }
`;

export const getVeJoeBalance = async (adress) => {
  const params = { id: adress };

  const response = await client.request(getVeJoeQueryDocument, params);

  return response.users[0].veJoeBalance;
};
