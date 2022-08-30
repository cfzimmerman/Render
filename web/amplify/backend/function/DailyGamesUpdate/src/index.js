/* Amplify Params - DO NOT EDIT
	API_MOBILE_GRAPHQLAPIENDPOINTOUTPUT
	API_MOBILE_GRAPHQLAPIIDOUTPUT
	API_MOBILE_GRAPHQLAPIKEYOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

// This function is triggered every day at 01:01:00 a.m.
// It queries newly added games (past 24 hrs) in IGDB and creates formatted Game objects in the Games table for the new additions.

import axios from 'axios';

// Environment variables
const GRAPHQL_ENDPOINT = process.env.API_MOBILE_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_MOBILE_GRAPHQLAPIKEYOUTPUT;
const IGDB_CLIENT_ID = process.env.IGDB_CLIENT_ID;
const IGDB_SECRET_KEY = process.env.IGDB_SECRET_KEY;

// GraphQL operation inputs
const getGlobalDataQuery = /* GraphQL */ `
  query GDByUsecase {
    GDByUsecase(usecase: "IGDB_GAMES", limit: 1) {
      items {
        id
        strA
        strB
        numA
      }
    }
  }
`;

const updateGlobalDataMutation = /* GraphQL */ `
  mutation UpdateGlobalData($input: UpdateGlobalDataInput!) {
    updateGlobalData(input: $input) {
      id
      createdAt
      usecase
      key
      strA
      strB
      numA
      numB
      updatedAt
    }
  }
`;

const createGamesMutation = /* GraphQL */ `
  mutation CreateGames($input: CreateGamesInput!) {
    createGames(input: $input) {
      id
      createdAt
      igdbID
      title
      releaseDate
      series
      genre
      theme
      coverID
      backgroundID
      steamID
      microsoftID
      xboxMarketplaceID
      gogID
      egsID
      twitchID
      oculusID
      playstationID
      UserGames {
        nextToken
      }
      Posts {
        nextToken
      }
      updatedAt
    }
  }
`;

async function AuthenticateIGDB({ globalDataID }) {
  // If the IGDB access token expires within 3 days, refresh it and update our copy of the access token and expiration date. Called at the very end of index.
  // NOTE: IGDB time values run on UNIX seconds. JS getTime offers milliseconds. GlobalData's "expirationDate" uses UNIX seconds, not milliseconds.
  try {
    const authURL =
      'https://id.twitch.tv/oauth2/token?client_id=' +
      IGDB_CLIENT_ID +
      '&client_secret=' +
      IGDB_SECRET_KEY +
      '&grant_type=client_credentials';

    const {
      data: { access_token, expires_in }
    } = await axios({
      url: authURL,
      method: 'POST'
    });

    const updateGlobalDataMutationVariables = {
      input: {
        id: globalDataID,
        strA: access_token,
        numA: Math.floor(new Date().getTime() / 1000) + expires_in
      }
    };

    await axios({
      url: GRAPHQL_ENDPOINT,
      method: 'post',
      headers: {
        'x-api-key': GRAPHQL_API_KEY
      },
      data: JSON.stringify({
        query: updateGlobalDataMutation,
        variables: updateGlobalDataMutationVariables
      })
    });
  } catch (error) {
    throw `Authenticate IGDB error: ${error}`;
  }
}

export const handler = async (event) => {
  try {
    const {
      data: {
        data: {
          GDByUsecase: { items }
        }
      }
    } = await axios({
      url: GRAPHQL_ENDPOINT,
      method: 'post',
      headers: {
        'x-api-key': GRAPHQL_API_KEY
      },
      data: JSON.stringify({ query: getGlobalDataQuery })
    });

    const { id, strA: accessToken, strB: lastAddedGames, numA: expirationDate } = items[0];

    const cutoffDate = Math.floor(new Date(lastAddedGames).getTime() / 1000);

    const nextLastAddedGames = new Date().toISOString();

    const { data: games } = await axios({
      url: 'https://api.igdb.com/v4/games',
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Client-ID': IGDB_CLIENT_ID,
        Authorization: 'Bearer ' + accessToken
      },
      data: `fields id, name, category, first_release_date, genres.name, themes.name, collection.name, cover.image_id, artworks.image_id, screenshots.image_id, external_games.category, external_games.uid; sort id asc; where (created_at >= ${cutoffDate}) & (themes != (42) & name != null & first_release_date != null & cover != null & (category = null | category = 0) & name !~ *"EDITION"* & name !~ *"REMASTERED"* & name !~ *"COLLECTOR'S"* & name !~ *"REMAKE"*); limit 499; offset 0;`
    });

    if (games.length > 0) {
      for await (const item of games) {
        const GetBackgroundID = () => {
          if (
            typeof item.artworks != 'undefined' &&
            typeof item.artworks[0].image_id != 'undefined'
          ) {
            return item.artworks[0].image_id;
          } else if (
            typeof item.screenshots != 'undefined' &&
            typeof item.screenshots[0].image_id != 'undefined'
          ) {
            return item.screenshots[0].image_id;
          } else {
            return item.cover.id;
          }
        };

        const GetExternalGameID = ({ targetCategory }) => {
          // targetCategory: 1 | 5 | 11 | 14 | 26 | 28 | 31 | 36;
          if (typeof item.external_games != 'undefined') {
            const targetIndex = item.external_games.findIndex(
              (element) => element.category === targetCategory
            );
            if (targetIndex > -1) {
              return item.external_games[targetIndex].uid;
            }
          }
          return null;
        };

        if (typeof item.cover != 'undefined' && typeof item.cover.id != 'undefined') {
          const newGameUpload = {
            igdbID: item.id,
            title: item.name,
            releaseDate: new Date(item.first_release_date * 1000).toISOString(),
            series: typeof item.collection === 'undefined' ? null : item.collection.name,
            genre: typeof item.genres === 'undefined' ? null : item.genres[0].name,
            theme: typeof item.themes === 'undefined' ? null : item.themes[0].name,
            coverID: item.cover.image_id,
            backgroundID: GetBackgroundID(),
            steamID: GetExternalGameID({ targetCategory: 1 }),
            gogID: GetExternalGameID({ targetCategory: 5 }),
            microsoftID: GetExternalGameID({ targetCategory: 11 }),
            twitchID: GetExternalGameID({ targetCategory: 14 }),
            egsID: GetExternalGameID({ targetCategory: 26 }),
            oculusID: GetExternalGameID({ targetCategory: 28 }),
            xboxMarketplaceID: GetExternalGameID({ targetCategory: 31 }),
            playstationID: GetExternalGameID({ targetCategory: 36 })
          };

          // Await can be removed if necessary. Rn the cost savings would be smaller than pennies (and I tested it like this), but the change can def be made for a faster loop.
          const { data } = await axios({
            url: GRAPHQL_ENDPOINT,
            method: 'post',
            headers: {
              'x-api-key': GRAPHQL_API_KEY
            },
            data: JSON.stringify({
              query: createGamesMutation,
              variables: { input: newGameUpload }
            })
          });
        }
      }
    }

    if (expirationDate * 1000 - new Date().getTime() <= 259200000) {
      AuthenticateIGDB({ globalDataID: id });
    }

    const updateGlobalDataMutationVariables = {
      input: {
        id,
        strB: nextLastAddedGames
      }
    };

    await axios({
      url: GRAPHQL_ENDPOINT,
      method: 'post',
      headers: {
        'x-api-key': GRAPHQL_API_KEY
      },
      data: JSON.stringify({
        query: updateGlobalDataMutation,
        variables: updateGlobalDataMutationVariables
      })
    });

    return {
      statusCode: 200,
      message: `Successfully uploaded ${games.length} items at ${nextLastAddedGames}.`,
      error: null
    };
  } catch (error) {
    return {
      statusCode: 400,
      message: 'error',
      error: error
    };
  }
};
