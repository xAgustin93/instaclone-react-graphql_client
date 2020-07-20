import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation addComment($input: CommentInput) {
    addComment(input: $input) {
      idPublication
      comment
    }
  }
`;

export const GET_COMMENTS = gql`
  query getComments($idPublication: ID!) {
    getComments(idPublication: $idPublication) {
      comment
      idUser {
        username
        avatar
      }
    }
  }
`;
