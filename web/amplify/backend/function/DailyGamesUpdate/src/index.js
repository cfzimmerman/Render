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

import axios from 'axios';

const GRAPHQL_ENDPOINT = process.env.API_MOBILE_GRAPHQLAPIENDPOINTOUTPUT;
const GRAPHQL_API_KEY = process.env.API_MOBILE_GRAPHQLAPIKEYOUTPUT;

export const handler = async (event) => {
  var returnMessage;

  try {
    returnMessage = {
      statusCode: 400,
      message: 'Success!',
      error: null
    };
  } catch (error) {
    returnMessage = {
      statusCode: 400,
      message: 'error',
      error: error
    };
  }
  return returnMessage;
};
