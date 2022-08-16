const GetGameCoverThumbnailURL = ({ coverID }: { coverID: string }) => {
  const coverThumbnailURL = `https://images.igdb.com/igdb/image/upload/t_cover_small/${coverID}.png`;
  return coverThumbnailURL;
};

export default GetGameCoverThumbnailURL;
