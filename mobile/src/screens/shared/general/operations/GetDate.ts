import { format } from "date-fns";

const GetDate = (contentdate: string | Date): string => {
  const fulldate = new Date(contentdate);
  const simpledate = format(fulldate, "MMMM yyyy");
  return simpledate;
};

export default GetDate;
