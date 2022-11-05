const CorrectNextToken = ({ nextToken }: { nextToken: string | null }) => {
  if (typeof nextToken === "string") {
    return `nextToken: "${nextToken}",`;
  } else {
    return `nextToken: null,`;
  }
};

export default CorrectNextToken;
