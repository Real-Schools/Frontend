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
        email
      }
    }
  }
`;
