import { GraphQLClient, gql } from "graphql-request";
import { BOOSTED_MASTERCHEF_SUBGRAPH } from "../../util/Constants";

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
      }
    }
  }
`;

export const getBoostedMasterchef = async () => {
  return {
    id: "0x4483f0b6e2f5486d06958c20f8c39a7abe87bf8f",
    joePerSec: "0",
    totalAllocPoint: "21100",
    poolCount: "13",
    pools: [
      {
        id: "0",
        pair: "0xf4003f4efbe8691b60249e6afbd307abe7758adb",
        allocPoint: "5500",
        balance: "5901664483938641282",
        jlpBalance: "5.901672833521922089",
        accJoePerShare: "25336110023294145391869",
        rewarder: null,
      },
      {
        id: "1",
        pair: "0xfe15c2695f1f920da45c30aae47d11de51007af9",
        allocPoint: "3000",
        balance: "75544993657231597604532",
        jlpBalance: "75545.180085128751987883",
        accJoePerShare: "472056234739889078973",
        rewarder: null,
      },
      {
        id: "10",
        pair: "0x6f3a0c89f611ef5dc9d96650324ac633d02265d3",
        allocPoint: "300",
        balance: "88228538448799430006872",
        jlpBalance: "88228.793824430759765048",
        accJoePerShare: "4964914913236903807",
        rewarder: null,
      },
      {
        id: "11",
        pair: "0xeb8eb6300c53c3addbb7382ff6c6fbc4165b0742",
        allocPoint: "200",
        balance: "10842460336638490567029",
        jlpBalance: "10842.508844935496872463",
        accJoePerShare: "7300338771729121139",
        rewarder: null,
      },
      {
        id: "12",
        pair: "0xbb4646a764358ee93c2a9c4a147d5aded527ab73",
        allocPoint: "800",
        balance: "343561999469074106",
        jlpBalance: "0.343563043482427548",
        accJoePerShare: "387339948518486624436",
        rewarder: null,
      },
      {
        id: "2",
        pair: "0xed8cbd9f0ce3c6986b22002f03c6475ceb7a6256",
        allocPoint: "4500",
        balance: "3676333442834523944",
        jlpBalance: "3.676337373263201398",
        accJoePerShare: "247797913716384809493140",
        rewarder: null,
      },
      {
        id: "3",
        pair: "0xa389f9430876455c36478deea9769b7ca4e3ddb1",
        allocPoint: "1000",
        balance: "4078327011323274147",
        jlpBalance: "4.078334852209819774",
        accJoePerShare: "50814436422462885072300",
        rewarder: null,
      },
      {
        id: "4",
        pair: "0x781655d802670bba3c89aebaaea59d3182fd755d",
        allocPoint: "200",
        balance: "416212737997748972798216",
        jlpBalance: "416213.513303713608523281",
        accJoePerShare: "38070518325792623163",
        rewarder: null,
      },
      {
        id: "5",
        pair: "0xd5a37dc5c9a396a03dd1136fc76a1a02b1c88ffa",
        allocPoint: "600",
        balance: "61781101400497000",
        jlpBalance: "0.061781341547723556",
        accJoePerShare: "135078990682337321047368",
        rewarder: null,
      },
      {
        id: "6",
        pair: "0x454e67025631c065d3cfad6d71e6892f74487a15",
        allocPoint: "4000",
        balance: "2028153124919117470484905",
        jlpBalance: "2028153.864576219601720148",
        accJoePerShare: "1832846044006194058",
        rewarder: null,
      },
      {
        id: "7",
        pair: "0x3bc40d4307cd946157447cd55d70ee7495ba6140",
        allocPoint: "800",
        balance: "3174847836062687213",
        jlpBalance: "3.174856070684800902",
        accJoePerShare: "4240863735056085122156",
        rewarder: null,
      },
      {
        id: "8",
        pair: "0x2a8a315e82f85d1f0658c5d66a452bbdd9356783",
        allocPoint: "100",
        balance: "11868361703568",
        jlpBalance: "0.000011868372098137",
        accJoePerShare: "245368159701011807686815",
        rewarder: null,
      },
      {
        id: "9",
        pair: "0x74b651eff97871ea99fcc14423e611d85eb0ea93",
        allocPoint: "100",
        balance: "5974707702094",
        jlpBalance: "0.000005974722360826",
        accJoePerShare: "247752701497604563496402",
        rewarder: null,
      },
    ],
  };
};

// export const getBoostedMasterchef = async () => {
//   const params = {};

//   const response = await client.request(
//     getBoostedMasterchefQueryDocument,
//     params
//   );

//   return response.masterChefs[0];
// };
