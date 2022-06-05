import { Auth } from 'aws-amplify';

export const signUp = async (email: string, fullName: string) => {
  const params = {
    username: email,
    password: getRandomString(30),
    attributes: {
      name: fullName
    }
  };
  await Auth.signUp(params);
};

const getRandomString = (bytes: number) => {
  const randomValues = new Uint8Array(bytes);
  window.crypto.getRandomValues(randomValues);
  return Array.from(randomValues).map(intToHex).join('');
};

const intToHex = (nr: number) => {
  return nr.toString(16).padStart(2, '0');
};
