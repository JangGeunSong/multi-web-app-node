const { gql } = require('apollo-server-express');

module.exports =  typeDefs = gql`
  # Comments in GraphQL are defined with the hash (#) symbol.

  # Add scalar Upload this is automatically added but not working
  scalar Upload

  # Define article type
  type Article {
    _id: ID!
    title: String!
    writer: User!
    date: String!
    description: String!
  }

  # Define user type
  type User {
    _id: ID!
    name: String!
    email: String!
    password: String
    profile_image: String
    profile: String
    created_articles: [Article]
  }

  # Define Authentication type
  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }

  # Define file type
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
  }

  # Define Query type
  type Query {
    articles: [Article]
    users: [User]
    uploads: [File]
  }

  # Define userInput
  input UserInput {
    name: String!
    email: String!
    password: String!
    profile_image: Upload
    profile: String
  }

  # Define articleInput
  input ArticleInput {
    title: String!
    description: String!
    writer: String!
  }

  # Define loginInput
  input LoginInput {
    email: String!
    password: String!
  }

  # Define Mutation
  type Mutation {
    createUser(userInput: UserInput): User
    createArticle(articleInput: ArticleInput): Article
    deleteArticle(articleId: ID!): Article
    login(loginInput: LoginInput!): AuthData
  }

`;