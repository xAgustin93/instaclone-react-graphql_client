import React, { useEffect } from "react";
import { Image } from "semantic-ui-react";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_COMMENTS } from "../../../../gql/comment";
import ImageNoFound from "../../../../assets/png/avatar.png";
import "./Comments.scss";

export default function Comments(props) {
  const { publication } = props;
  const { data, loading, startPolling, stopPolling } = useQuery(GET_COMMENTS, {
    variables: {
      idPublication: publication.id,
    },
  });

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return null;
  const { getComments } = data;

  return (
    <div className="comments">
      {map(getComments, (comment, index) => (
        <Link
          key={index}
          to={`/${comment.idUser.username}`}
          className="comment"
        >
          <Image src={comment.idUser.avatar || ImageNoFound} avatar />
          <div>
            <p>{comment.idUser.username}</p>
            <p>{comment.comment}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
