/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPostViewTracker = /* GraphQL */ `
  query GetPostViewTracker($id: ID!) {
    getPostViewTracker(id: $id) {
      id
      postsID
      Posts {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contenttype
        createdAt
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        updatedAt
      }
      viewerID
      Users {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`;
export const listPostViewTrackers = /* GraphQL */ `
  query ListPostViewTrackers(
    $filter: ModelPostViewTrackerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPostViewTrackers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postsID
        viewerID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const postViewByPostID = /* GraphQL */ `
  query PostViewByPostID(
    $postsID: ID!
    $viewerID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostViewTrackerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postViewByPostID(
      postsID: $postsID
      viewerID: $viewerID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        postsID
        viewerID
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUserRelationships = /* GraphQL */ `
  query GetUserRelationships($id: ID!) {
    getUserRelationships(id: $id) {
      id
      createdAt
      receivercognitosub
      sendercognitosub
      usersID
      Users {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
      }
      updatedAt
    }
  }
`;
export const listUserRelationships = /* GraphQL */ `
  query ListUserRelationships(
    $filter: ModelUserRelationshipsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserRelationships(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        receivercognitosub
        sendercognitosub
        usersID
        updatedAt
      }
      nextToken
    }
  }
`;
export const relationshipsByReceiverDate = /* GraphQL */ `
  query RelationshipsByReceiverDate(
    $receivercognitosub: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserRelationshipsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    relationshipsByReceiverDate(
      receivercognitosub: $receivercognitosub
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        receivercognitosub
        sendercognitosub
        usersID
        updatedAt
      }
      nextToken
    }
  }
`;
export const relationshipsBySenderDate = /* GraphQL */ `
  query RelationshipsBySenderDate(
    $sendercognitosub: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserRelationshipsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    relationshipsBySenderDate(
      sendercognitosub: $sendercognitosub
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        receivercognitosub
        sendercognitosub
        usersID
        updatedAt
      }
      nextToken
    }
  }
`;
export const verifyAddedUser = /* GraphQL */ `
  query VerifyAddedUser(
    $sendercognitosub: String!
    $receivercognitosub: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUserRelationshipsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    verifyAddedUser(
      sendercognitosub: $sendercognitosub
      receivercognitosub: $receivercognitosub
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        receivercognitosub
        sendercognitosub
        usersID
        updatedAt
      }
      nextToken
    }
  }
`;
export const addedUsersByCurrentUser = /* GraphQL */ `
  query AddedUsersByCurrentUser(
    $sendercognitosub: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserRelationshipsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    addedUsersByCurrentUser(
      sendercognitosub: $sendercognitosub
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        createdAt
        receivercognitosub
        sendercognitosub
        usersID
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPosts = /* GraphQL */ `
  query GetPosts($id: ID!) {
    getPosts(id: $id) {
      id
      aspectratio
      cognitosub
      contentdate
      contentkey
      contenttype
      createdAt
      posttext
      publicpost
      publicpostdate
      sizeinbytes
      thumbnailkey
      type
      usersID
      Users {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
      }
      PostViewTrackers {
        nextToken
      }
      updatedAt
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListPosts(
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contenttype
        createdAt
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByCreatedDate = /* GraphQL */ `
  query PostsByCreatedDate(
    $cognitosub: String!
    $createdAt: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByCreatedDate(
      cognitosub: $cognitosub
      createdAt: $createdAt
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contenttype
        createdAt
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByPostedDate = /* GraphQL */ `
  query PostsByPostedDate(
    $cognitosub: String!
    $publicpostdate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByPostedDate(
      cognitosub: $cognitosub
      publicpostdate: $publicpostdate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contenttype
        createdAt
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByContentDate = /* GraphQL */ `
  query PostsByContentDate(
    $cognitosub: String!
    $contentdate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByContentDate(
      cognitosub: $cognitosub
      contentdate: $contentdate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contenttype
        createdAt
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByContentKey = /* GraphQL */ `
  query PostsByContentKey(
    $contentkey: String!
    $sortDirection: ModelSortDirection
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByContentKey(
      contentkey: $contentkey
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contenttype
        createdAt
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        updatedAt
      }
      nextToken
    }
  }
`;
export const postsByPublicDate = /* GraphQL */ `
  query PostsByPublicDate(
    $type: String!
    $publicpostdate: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelPostsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    postsByPublicDate(
      type: $type
      publicpostdate: $publicpostdate
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contenttype
        createdAt
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchPosts = /* GraphQL */ `
  query SearchPosts(
    $filter: SearchablePostsFilterInput
    $sort: [SearchablePostsSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchablePostsAggregationInput]
  ) {
    searchPosts(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        aspectratio
        cognitosub
        contentdate
        contentkey
        contenttype
        createdAt
        posttext
        publicpost
        publicpostdate
        sizeinbytes
        thumbnailkey
        type
        usersID
        updatedAt
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
export const getUsers = /* GraphQL */ `
  query GetUsers($id: ID!) {
    getUsers(id: $id) {
      id
      acceptedtos
      addedcount
      addedmecount
      birthday
      cognitosub
      displayname
      email
      emailconfirmed
      firstvaultupload
      fullyauthenticated
      gamertag
      mostrecentpublicpost
      pfp
      storagesizeinbytes
      type
      Posts {
        nextToken
      }
      PostViewTrackers {
        nextToken
      }
      UserRelationships {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listUsers = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userByCognitosub = /* GraphQL */ `
  query UserByCognitosub(
    $cognitosub: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByCognitosub(
      cognitosub: $cognitosub
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userByEmail = /* GraphQL */ `
  query UserByEmail(
    $email: AWSEmail!
    $sortDirection: ModelSortDirection
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const userByGamertag = /* GraphQL */ `
  query UserByGamertag(
    $gamertag: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    userByGamertag(
      gamertag: $gamertag
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchByGamertag = /* GraphQL */ `
  query SearchByGamertag(
    $type: String!
    $gamertag: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    searchByGamertag(
      type: $type
      gamertag: $gamertag
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchUsers = /* GraphQL */ `
  query SearchUsers(
    $filter: SearchableUsersFilterInput
    $sort: [SearchableUsersSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUsersAggregationInput]
  ) {
    searchUsers(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        acceptedtos
        addedcount
        addedmecount
        birthday
        cognitosub
        displayname
        email
        emailconfirmed
        firstvaultupload
        fullyauthenticated
        gamertag
        mostrecentpublicpost
        pfp
        storagesizeinbytes
        type
        createdAt
        updatedAt
      }
      nextToken
      total
      aggregateItems {
        name
        result {
          ... on SearchableAggregateScalarResult {
            value
          }
          ... on SearchableAggregateBucketResult {
            buckets {
              key
              doc_count
            }
          }
        }
      }
    }
  }
`;
