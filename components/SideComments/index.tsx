import React from 'react';
import ArrowRightIcon from '@material-ui/icons/NavigateNextOutlined';

import styles from './SideComments.module.scss';
import Link from 'next/link';
import data from '../../data';
import clsx from 'clsx';
import { useComments } from '../../hooks/useComments';
import { Avatar } from '@material-ui/core';

interface CommentItemProps {
  user: {
    id: number;
    fullName: string;
  };
  text: string;
  post: {
    id: number;
    title: string;
  };
}

const CommentItem: React.FC<CommentItemProps> = ({ user, text, post }) => {
  return (
    <div className={styles.commentItem}>
      <div className={styles.userInfo}>
        <Avatar className={styles.avatar}>{user.fullName[0]}</Avatar>
        <Link href={`profile/${user.id}`}>
          <b>{user.fullName}</b>
        </Link>
      </div>
      <p className={styles.text}>{text}</p>
      <Link href={`news/${post.id}`}>
        <span className={styles.postTitle}>{post.title}</span>
      </Link>
    </div>
  );
};

export const SideComments = () => {
  const { comments } = useComments();
  const [hideComments, setHideComments] = React.useState(false);
  const checkSideState = () => {
    if (hideComments) {
      setHideComments(false);
    } else {
      setHideComments(true);
    }
  };
  return (
    <div className={clsx(styles.root, hideComments && styles.rotated)}>
      <h3 onClick={() => checkSideState()}>
        Комментарии <ArrowRightIcon />
      </h3>
      {!hideComments && comments.map((obj) => <CommentItem key={obj.id} {...obj} />)}
    </div>
  );
};
