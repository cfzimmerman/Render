const GetGameCoverThumbnailURL = ({ coverID }: { coverID: string | null }) => {
  if (typeof coverID === "string") {
    const coverThumbnailURL = `https://images.igdb.com/igdb/image/upload/t_cover_small/${coverID}.png`;
    return coverThumbnailURL;
  }
  return null;
};

export default GetGameCoverThumbnailURL;
