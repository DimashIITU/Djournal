import React from 'react';
import { Api } from '../utils/api';
import { CommentDto } from '../utils/api/types';

interface useCommentsProps {
  comments: CommentDto[];
  setComments: React.Dispatch<React.SetStateAction<CommentDto[]>>;
}

export const useComments = (postId?: number): useCommentsProps => {
  const [comments, setComments] = React.useState<CommentDto[]>([]);
  React.useEffect(() => {
    (async () => {
      try {
        const comments = await Api().comments.getAll(postId);
        setComments(comments);
      } catch (error) {
        console.warn(error);
      }
    })();
  }, []);
  return {
    comments,
    setComments,
  };
};
