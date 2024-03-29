/*

This document elaborates on the structure of in-app notifications. Instructions assume schema.graphql has been read.

BACKEND:
    👉 code: 
        - Each notification has a 4-figure integer code corresponding to a certain category of notification.
        - The first digit indicates the category among the following options (0000 series is removed, as leading zeroes are removed):
            * 1000: General, system, company, and account notifications
            * 2000: Vault notifications
            * 3000: Social notifications
        - The following 3 digits correspond to a specific notification template:
            * Ex: Code 3001 is a Social notification triggered when someone adds the user.
            * Note: Front end template messages can easily be modified and new codes can easily be added, but old code categories shouldn’t be overwritten unless existing data is translated to the new format.
    👉 payload:
        - Payload is a stringified JSON object including only the required data for the specific message template. 
        - Required payload data fields are outlined in the code-specific Interfaces in this document.
        - JSON.stringify() data in and JSON.parse() data out (or similar operations).

FRONTEND:
🇺🇸 Fill this in later
*/

import { DispatchType } from "../../../../redux";
import { CurrentUserType } from "../../../../global/CommonTypes";
import Code3001 from "./NotificationActions/Code3001";
import Code3002 from "./NotificationActions/Code3002";
import Code3003 from "./NotificationActions/Code3003";

export interface NotificationDataItem {
  notificationID: string;
  code: Number;
  payload: string;
  postsID: null | string;
  unread: Boolean;
  createdAt: String;
  front: {
    title: String;
    message: String;
  };
  back: {
    rightIcon: String;
    rightTitle: String;
  };
}

/* ACTIVE NOTIFICATION CODES
1000 series: General, system, company, and account notifications

2000 series: Vault notifications

3000 series: Social notifications
    * 3001: (SINGLE RECIPIENT) Someone added the current user. Ask the current user if they would like to view the other user's profile and add them back.
    * 3002: (SINGLE RECIPIENT) One or more people have commented on a post made by the current user. Ask the user if they would like to view the post.
    * 3003: (MULTI RECIPIENT) Someone else has commented on a post (that isn't mine) that I've already commented on. 
    * 3004: (SINGLE RECIPIENT - NOT YET IMPLEMENTED) Someone the current has already added has added the current user back
*/

export interface Code3001PayloadType {
  ouID: String;
  // ^ otherUserID (shortened). The ID of the user that added the current user
}

export type Code3002PayloadType = null;

export interface Code3003PayloadType {
  lCUID: String;
  // ^ lastCommentID (shortened). The ID of the last user to comment on the post
}

// next steps for 3003: Set up create notification and get notification flows

export interface NotificationLibraryPropTypes {
  code: number;
  payload: string;
  notificationID: string;
  postsID: null | string;
  dispatch: DispatchType;
  createdAt: string;
  currentuserID: string;
}

export interface NotificationStoreType {
  unreadCutoffDate: string;
  notificationData: NotificationDataItem[];
}

const NotificationLibrary = ({
  code,
  payload,
  notificationID,
  postsID,
  dispatch,
  createdAt,
  currentuserID,
}: NotificationLibraryPropTypes) => {
  // All Notification Actions generate an object of type NotificationDataItem and add it to the appropriate Redux location
  if (code === 3001) {
    Code3001({
      code,
      payload,
      notificationID,
      postsID,
      createdAt,
      dispatch,
    });
  } else if (code === 3002) {
    Code3002({
      code,
      payload,
      createdAt,
      notificationID,
      postsID,
      dispatch,
    });
  } else if (code === 3003) {
    Code3003({
      currentuserID,
      code,
      payload,
      createdAt,
      notificationID,
      postsID,
      dispatch,
    });
  }
};

export default NotificationLibrary;
