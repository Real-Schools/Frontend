import { ApolloClient, gql, HttpLink, InMemoryCache } from "@apollo/client";
import AuthorizationApi from "./authorization";

const link = new HttpLink({
  uri: `${import.meta.env.VITE_BASE_API_URL}/graphql`,
  headers: { Authorization: AuthorizationApi.authorization_token },
});

export const graphqlClient = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

export const GET_USERS = gql`
  query {
    users {
      id
      email
      role
    }
  }
`;

export const GET_USER = (id: string) => gql`
  query {
    user(id: ${id}) {
      id
      email
      role
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      user {
        id
      }
    }
  }
`;

export const GET_BRANCHES = gql`
  query {
    branches {
      id
      name
      location
      prefix
    }
  }
`;

export const CREATE_BRANCH = gql`
  mutation CreateBranch($input: CreateBranchInput!) {
    createBranch(input: $input) {
      branch {
        id
      }
    }
  }
`;

export const GET_STUDENTS = gql`
  query {
    students {
      id
      email
      firstName
      lastName
      otherNames
      level
      bio
      studentNumber
      branchId
      enrolledAt
      createdAt
    }
  }
`;

export const REGISTER_STUDENT = gql`
  mutation CreateStudent($input: CreateStudentInput!) {
    createStudent(input: $input) {
      student {
        id
      }
    }
  }
`;

export const GET_STUDENT = (id: string | number) => gql`
  query {
    student(id: ${id}) {
      id
      email
      firstName
      lastName
      otherNames
      level
      bio
      studentNumber
      branchId
      enrolledAt
      createdAt
    }
  }
`;
