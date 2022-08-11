interface GetGameCoverURLPT {
  coverID: string;
}

const GetGameCoverURL = ({ coverID }: GetGameCoverURLPT) => {
  const coverURL = `https://images.igdb.com/igdb/image/upload/t_cover_big/${coverID}.png`;
  return coverURL;
};

export default GetGameCoverURL;
