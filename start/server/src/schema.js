const { gql } = require('apollo-server');

const typeDefs = gql`
    type Launch {
        id: ID!
        site: String
        mission: Mission
        rocket: Rocket
        isBooked: Boolean!
    }

    type Rocket {
        id: ID!
        name: String
        type: String
    }
      
    type User {
        id: ID!
        email: String!
        trips: [Launch]!
    }
      
    type Mission {
        name: String
        missionPatch(size: PatchSize): String
    }
    
    type LaunchConnection { # add this below the Query type as an additional type.
        cursor: String!
        hasMore: Boolean!
        launches: [Launch]!
    }
    enum PatchSize {
        SMALL
        LARGE
    }

    # Queries

    # type Query {
    #     launches: [Launch]!
    #     launch(id: ID!): Launch
    #     me: User
    # }

    type Query {

        launches( # replace the current launches query with this one.
          """
          The number of results to show. Must be >= 1. Default = 20
          """
          pageSize: Int
          """
          If you add a cursor here, it will only return results _after_ this cursor
          """
          after: String
        ): LaunchConnection!
        launch(id: ID!): Launch
        me: User
    }

    # Mutations

    type Mutation {
        bookTrips(launchIds: [ID]!): TripUpdateResponse!
        cancelTrip(launchId: ID!): TripUpdateResponse!
        login(email: String): String # login token
    }
      
    # Mutation Response Types

    type TripUpdateResponse {
        success: Boolean!
        message: String
        launches: [Launch]
    }
      
    type UserLoginResponse {
        email: String
        token: String
    }
`;

module.exports = typeDefs;