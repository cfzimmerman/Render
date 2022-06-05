export const schema = {
  models: {
    PostViewTracker: {
      name: "PostViewTracker",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        postid: {
          name: "postid",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        viewercognitosub: {
          name: "viewercognitosub",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: "PostViewTrackers",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "auth",
          properties: {
            rules: [
              {
                allow: "public",
                operations: ["create", "update", "delete", "read"],
              },
            ],
          },
        },
      ],
    },
    UserRelationships: {
      name: "UserRelationships",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        sendercognitosub: {
          name: "sendercognitosub",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        receivercognitosub: {
          name: "receivercognitosub",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        Users: {
          name: "Users",
          isArray: false,
          type: {
            model: "Users",
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: "BELONGS_TO",
            targetName: "usersID",
          },
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: "UserRelationships",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "key",
          properties: {
            name: "relationshipsBySenderDate",
            queryField: "relationshipsBySenderDate",
            fields: ["sendercognitosub", "createdAt"],
          },
        },
        {
          type: "key",
          properties: {
            name: "relationshipsByReceiverDate",
            queryField: "relationshipsByReceiverDate",
            fields: ["receivercognitosub", "createdAt"],
          },
        },
        {
          type: "key",
          properties: {
            name: "byUsers",
            fields: ["usersID"],
          },
        },
        {
          type: "auth",
          properties: {
            rules: [
              {
                allow: "public",
                operations: ["create", "update", "delete", "read"],
              },
            ],
          },
        },
      ],
    },
    Users: {
      name: "Users",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        email: {
          name: "email",
          isArray: false,
          type: "AWSEmail",
          isRequired: false,
          attributes: [],
        },
        password: {
          name: "password",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        gamertag: {
          name: "gamertag",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        displayname: {
          name: "displayname",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        birthday: {
          name: "birthday",
          isArray: false,
          type: "AWSDate",
          isRequired: false,
          attributes: [],
        },
        acceptedtos: {
          name: "acceptedtos",
          isArray: false,
          type: "Boolean",
          isRequired: false,
          attributes: [],
        },
        pfp: {
          name: "pfp",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        emailconfirmed: {
          name: "emailconfirmed",
          isArray: false,
          type: "Boolean",
          isRequired: false,
          attributes: [],
        },
        fullyauthenticated: {
          name: "fullyauthenticated",
          isArray: false,
          type: "Boolean",
          isRequired: false,
          attributes: [],
        },
        cognitosub: {
          name: "cognitosub",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        addedcount: {
          name: "addedcount",
          isArray: false,
          type: "Int",
          isRequired: false,
          attributes: [],
        },
        addedmecount: {
          name: "addedmecount",
          isArray: false,
          type: "Int",
          isRequired: false,
          attributes: [],
        },
        UserRelationships: {
          name: "UserRelationships",
          isArray: true,
          type: {
            model: "UserRelationships",
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: "HAS_MANY",
            associatedWith: "Users",
          },
        },
        Posts: {
          name: "Posts",
          isArray: true,
          type: {
            model: "Posts",
          },
          isRequired: false,
          attributes: [],
          isArrayNullable: true,
          association: {
            connectionType: "HAS_MANY",
            associatedWith: "Users",
          },
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: "Users",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "auth",
          properties: {
            rules: [
              {
                allow: "public",
                operations: ["create", "update", "delete", "read"],
              },
            ],
          },
        },
      ],
    },
    Posts: {
      name: "Posts",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        contenttype: {
          name: "contenttype",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        aspectratio: {
          name: "aspectratio",
          isArray: false,
          type: "Float",
          isRequired: false,
          attributes: [],
        },
        contentkey: {
          name: "contentkey",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        publicpost: {
          name: "publicpost",
          isArray: false,
          type: "Boolean",
          isRequired: false,
          attributes: [],
        },
        cognitosub: {
          name: "cognitosub",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        contentdate: {
          name: "contentdate",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
        thumbnailkey: {
          name: "thumbnailkey",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        publicpostdate: {
          name: "publicpostdate",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "String",
          isRequired: true,
          attributes: [],
        },
        Users: {
          name: "Users",
          isArray: false,
          type: {
            model: "Users",
          },
          isRequired: false,
          attributes: [],
          association: {
            connectionType: "BELONGS_TO",
            targetName: "usersID",
          },
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: "Posts",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "key",
          properties: {
            name: "postsByCreatedDate",
            queryField: "postsByCreatedDate",
            fields: ["cognitosub", "createdAt"],
          },
        },
        {
          type: "key",
          properties: {
            name: "byUsers",
            fields: ["usersID"],
          },
        },
        {
          type: "auth",
          properties: {
            rules: [
              {
                allow: "public",
                operations: ["create", "update", "delete", "read"],
              },
            ],
          },
        },
      ],
    },
    UserExtras: {
      name: "UserExtras",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        cognitosub: {
          name: "cognitosub",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        firstvaultupload: {
          name: "firstvaultupload",
          isArray: false,
          type: "Boolean",
          isRequired: false,
          attributes: [],
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: "UserExtras",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "auth",
          properties: {
            rules: [
              {
                allow: "public",
                operations: ["create", "update", "delete", "read"],
              },
            ],
          },
        },
      ],
    },
    UserOTP: {
      name: "UserOTP",
      fields: {
        id: {
          name: "id",
          isArray: false,
          type: "ID",
          isRequired: true,
          attributes: [],
        },
        useremail: {
          name: "useremail",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        currentotp: {
          name: "currentotp",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        userdisplayname: {
          name: "userdisplayname",
          isArray: false,
          type: "String",
          isRequired: false,
          attributes: [],
        },
        createdAt: {
          name: "createdAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
        updatedAt: {
          name: "updatedAt",
          isArray: false,
          type: "AWSDateTime",
          isRequired: false,
          attributes: [],
          isReadOnly: true,
        },
      },
      syncable: true,
      pluralName: "UserOTPS",
      attributes: [
        {
          type: "model",
          properties: {},
        },
        {
          type: "auth",
          properties: {
            rules: [
              {
                allow: "public",
                operations: ["create", "update", "delete", "read"],
              },
            ],
          },
        },
      ],
    },
  },
  enums: {},
  nonModels: {},
  version: "636cfe7f5374ada4f5cbe94d779194f3",
};
