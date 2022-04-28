import { getTokenPrice } from "./contracts/FarmLensContract";

export const getPairValue = async (pairDetail) => {
  const token0id = pairDetail.token0.id;
  const token1id = pairDetail.token1.id;

  const tokenResponse = await getTokenPrice(token0id);

  console.log(tokenResponse);

  //if there is a response return this pair else get a response from other pair
  if (tokenResponse) {
    return pairDetail.token0Price * tokenResponse.token1Price * 2;
  } else {
    tokenResponse = await getTokenPrice(token1id);

    return pairDetail.token1Price * tokenResponse.token1Price * 2;
  }
};
