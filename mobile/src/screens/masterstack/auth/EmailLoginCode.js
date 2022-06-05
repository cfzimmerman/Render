import { Auth, API, graphqlOperation } from "aws-amplify";
import { listUserOTPS, listUsers } from "../../../graphql/queries";
import { updateUsers, updateUserOTP } from "../../../graphql/mutations";
import { listUserID } from "../../../graphql/customqueries";

// Accepts and email and sends the user a log in code.

async function GetCode(email) {
  // Generate a 6-figure code. If the random code is identical to the user-associated code already in the UserOTP table, generate a new code by restarting a function.
  const newotp = Math.floor(Math.random() * 1000000).toString();

  const result = await API.graphql(
    graphqlOperation(listUserOTPS, { filter: { useremail: { eq: email } } }),
  );

  const userotp = result.data.listUserOTPS.items[0];

  if (userotp.currentotp === newotp || newotp.length != 6) {
    GetCode(email);
  } else {
    SendCode({ id: userotp.id, code: newotp });
  }
}

async function SendCode({ id, code }) {
  const newotp = {
    id,
    currentotp: code,
  };

  // Modify loginrequest value to the new codde. 'MODIFY' triggers Lambda function, which sends an email with the code to the user.
  try {
    await API.graphql(graphqlOperation(updateUserOTP, { input: newotp }));
  } catch (error) {
    console.log("error updating UserOTP: ", error);
  }
}

const EmailLoginCode = (email) => GetCode(email);

export default EmailLoginCode;
