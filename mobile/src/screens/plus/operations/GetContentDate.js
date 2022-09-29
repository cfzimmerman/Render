import { isValid } from "date-fns";

const FormatDate = (timestamp) => {
  const timestamparray = timestamp.split(" ");
  const ymd = timestamparray[0].replaceAll(":", "-");
  const date = `${ymd}T${timestamparray[1]}.000Z`;
  const testdate = new Date(date);
  const isvaliddate = isValid(testdate);

  if (isvaliddate === true) {
    return date;
  }
  const backupdate = TodaysDate();
  return backupdate;
};

const TodaysDate = () => {
  const isodate = new Date().toISOString();
  return isodate;
};

const GetContentDate = (result) => {
  if (
    typeof result.exif === "undefined"
    || typeof result.exif.DateTimeOriginal === "undefined"
  ) {
    const date = TodaysDate();
    return date;
  }
  const timestamp = result.exif.DateTimeOriginal;
  const date = FormatDate(timestamp);
  return date;
};

export default GetContentDate;
