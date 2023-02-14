import React from 'react';
import { Typography, IconButton, MenuItem, Menu, Avatar } from '@material-ui/core';
import MoreIcon from '@material-ui/icons/MoreHorizOutlined';

import styles from './Comment.module.scss';
import { CommentDto, ResponseUser } from '../../utils/api/types';
import { Api } from '../../utils/api';

interface CommentPostProps {
  item: CommentDto;
  isUser?: ResponseUser;
  removeComment: (id: number) => void;
}

export const Comment: React.FC<CommentPostProps> = ({ removeComment, isUser, item }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleRemove = async () => {
    setAnchorEl(null);
    if (item.user.id === isUser.id) {
      try {
        await Api(null).comments.delete(+item.id);
        removeComment(item.id);
      } catch (error) {
        console.warn(error);
      }
    }
  };
  const handleUpdate = () => {
    setAnchorEl(null);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.comment}>
      <div className={styles.userInfo}>
        <Avatar className={styles.avatar}>{item.user.fullName[0]}</Avatar>
        <b>{item.user.fullName}</b>
        <span>{item.createdAt}</span>
      </div>
      <Typography className={styles.text}>{item.text}</Typography>
      <span className={styles.replyBtn}>Ответить</span>
      {isUser && (
        <>
          <IconButton onClick={handleClick}>
            <MoreIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            elevation={2}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            keepMounted>
            <MenuItem onClick={handleRemove}>Удалить</MenuItem>
            <MenuItem onClick={handleUpdate}>Редактировать</MenuItem>
          </Menu>
        </>
      )}
    </div>
  );
};
