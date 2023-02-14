import React from 'react';
import { Comment } from '../Comment';
import styles from './PostComments.module.scss';
import { Divider, Paper, Tab, Tabs, Typography } from '@material-ui/core';
import { AddCommentsForm } from '../AddCommentForm';
import data from '../../data.js';
import { Api } from '../../utils/api';
import { CommentDto } from '../../utils/api/types';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import { useComments } from '../../hooks/useComments';

interface PostCommentsProps {
  postId: number;
}

export const PostComments: React.FC<PostCommentsProps> = ({ postId }) => {
  const isUser = useAppSelector(selectUserData);
  const [activeTab, setActiveTab] = React.useState(0);
  const { comments, setComments } = useComments(postId);
  const onAddComment = (comment: CommentDto) => {
    setComments((prev) => [...prev, comment]);
  };
  const onRemoveComment = (id: number) => {
    setComments((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  return (
    <>
      <Paper elevation={0} className={styles.paper}>
        <div className="container">
          <Typography variant="h6" className="mb-20">
            42 комментария
          </Typography>
          <Tabs
            onChange={(_, newValue) => setActiveTab(newValue)}
            className="mt-20"
            value={activeTab}
            indicatorColor="primary"
            textColor="primary">
            <Tab label="Популярные" />
            <Tab label="По порядку" />
          </Tabs>
          <Divider />
          {isUser && <AddCommentsForm successAddComment={onAddComment} postId={postId} />}
          <div className="mb-20" />
          {comments.map((item) => (
            <Comment removeComment={onRemoveComment} isUser={isUser} key={item.id} item={item} />
          ))}
        </div>
      </Paper>
    </>
  );
};
