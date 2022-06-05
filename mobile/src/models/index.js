// @ts-check
import { initSchema } from "@aws-amplify/datastore";
import { schema } from "./schema";

const {
  PostViewTracker,
  UserRelationships,
  Users,
  Posts,
  UserExtras,
  UserOTP,
} = initSchema(schema);

export {
  PostViewTracker,
  UserRelationships,
  Users,
  Posts,
  UserExtras,
  UserOTP,
};
