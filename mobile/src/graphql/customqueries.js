export const listUserID = /* GraphQL */ `
  query ListUsers(
    $filter: ModelUsersFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        cognitosub
      }
      nextToken
    }
  }
`;

export const filteredPostsByCreatedDate = /* GraphQL */ `
  query FilteredPostsByCreatedDate(
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
        contenttype
        aspectratio
        contentkey
        publicpost
        cognitosub
        contentdate
        thumbnailkey
        publicpostdate
        createdAt
        usersID
        updatedAt
      }
      nextToken
    }
  }
`;

export const filteredPostsByContentDate = /* GraphQL */ `
  query FilteredPostsByContentDate(
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
        contenttype
        aspectratio
        contentkey
        publicpost
        cognitosub
        contentdate
        thumbnailkey
        posttext
        publicpostdate
        createdAt
        usersID
        updatedAt
      }
      nextToken
    }
  }
`;

export const filteredPostsByPostedDate = /* GraphQL */ `
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
        contenttype
        aspectratio
        contentkey
        publicpost
        cognitosub
        contentdate
        thumbnailkey
        publicpostdate
        createdAt
        usersID
        updatedAt
      }
      nextToken
]    }
  }
`;

export const filteredRelationshipsByReceiverDate = /* GraphQL */ `
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
        sendercognitosub
        createdAt
      }
      nextToken
]    }
  }
`;

export const filteredRelationshipsBySenderDate = /* GraphQL */ `
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
        receivercognitosub
        Users {
          id
          cognitosub
          pfp
          displayname
          gamertag
          addedmecount
        }
      }
      nextToken
    }
  }
`;

export const filteredUserByEmail = /* GraphQL */ `
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
        password
        emailconfirmed
        fullyauthenticated
      }
    }
  }
`;

export const filteredUserByGamertag = /* GraphQL */ `
  query FilteredUserByGamertag(
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
      }
    }
  }
`;

export const filteredSearchPosts = /* GraphQL */ `
  query FilteredSearchPosts(
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
        contenttype
        aspectratio
        contentkey
        publicpost
        cognitosub
        contentdate
        thumbnailkey
        publicpostdate
        posttext
        createdAt
        Users {
          id
          displayname
          pfp
        }
      }
      nextToken
      total
    }
  }
`;

export const filteredPostsByPublicDate = /* GraphQL */ `
  query FilteredPostsByPublicDate(
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
        contenttype
        aspectratio
        contentkey
        publicpost
        cognitosub
        contentdate
        thumbnailkey
        publicpostdate
        posttext
        createdAt
        Users {
          id
          displayname
          pfp
        }
      }
      nextToken
    }
  }
`;
