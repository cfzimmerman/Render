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

import { DispatchType } from "../../../redux/store";
import { CurrentUserType } from "../../../resources/CommonTypes";
import Code3001 from "./NotificationActions/Code3001";

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
    * 3001: Someone added the current user. Ask the current user if they would like to view the other user's profile and add them back.
*/

export interface Code3001PayloadType {
  ouID: String;
  // ^ otherUserID (shortened). The ID of the user that added the current user
}

export interface NotificationLibraryPropTypes {
  code: number;
  payload: string;
  notificationID: string;
  postsID: null | string;
  dispatch: DispatchType;
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
}: NotificationLibraryPropTypes) => {
  // All Notification Actions generate an object of type NotificationDataItem and add it to the appropriate Redux location
  if (code === 3001) {
    Code3001({
      code,
      payload,
      notificationID,
      postsID,
      createdAt: new Date().toISOString(),
      dispatch,
    });
  }
};

export default NotificationLibrary;
