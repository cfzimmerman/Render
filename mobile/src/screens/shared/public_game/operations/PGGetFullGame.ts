import { GraphQLResult } from "@aws-amplify/api-graphql";
import { API, graphqlOperation } from "aws-amplify";
import { GetGamesQuery } from "../../../../API";
import { setPGFullGame } from "../../../../redux/exploremain";
import { DispatchType } from "../../../../redux";
import { FullGameItemType } from "../pages/PGLanding";

interface InputTypes {
  dispatch: DispatchType;
  gameID: string;
}

async function PGGetFullGame({ dispatch, gameID }: InputTypes) {
  try {
    const {
      data: {
        getGames: {
          id,
          title,
          coverID,
          backgroundID,
          series,
          releaseDate,
          numUserGames,
        },
      },
    } = (await API.graphql(
      graphqlOperation(`
        query GetGames {
            getGames (
                id: "${gameID}"
            ) {
                id
                title
                coverID
                backgroundID
                series
                releaseDate
                numUserGames
            }
        }
    `)
    )) as GraphQLResult<GetGamesQuery>;

    const fullGame: FullGameItemType = {
      id,
      title,
      coverID,
      backgroundID,
      series,
      releaseDate,
      numUserGames,
    };

    dispatch(setPGFullGame(fullGame));
  } catch (error) {
    console.log(error);
  }
}
export default PGGetFullGame;
