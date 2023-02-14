import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/user';
import { Api } from '../../utils/api';
import { CommentDto, ResponseUser } from '../../utils/api/types';
import styles from './AddCommentForm.module.scss';

type AddCommentsFormProps = {
  postId: number;
  successAddComment: (comment: CommentDto) => void;
};

export const AddCommentsForm: React.FC<AddCommentsFormProps> = ({ postId, successAddComment }) => {
  const [clicked, setClicked] = React.useState(false);
  const [text, setText] = React.useState('');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const onAddComment = async () => {
    try {
      setIsSubmitting(true);
      const data = await Api().comments.create({ text, postId });
      successAddComment(data);
    } catch (error) {
      console.warn(error);
    } finally {
      setClicked(false);
      setText('');
      setIsSubmitting(false);
    }
  };
  const checkInputValue = () => {
    if (!text) {
      setClicked(false);
    }
  };
  return (
    <div className={styles.container}>
      <Input
        onChange={(e) => setText(e.target.value)}
        onFocus={() => setClicked(true)}
        onBlur={() => checkInputValue()}
        minRows={clicked ? 5 : 1}
        classes={{ root: styles.fieldRoot }}
        value={text}
        placeholder="Написать комментарий "
        fullWidth
        multiline
      />
      {clicked && (
        <Button
          disabled={isSubmitting && !text}
          onClick={() => onAddComment()}
          classes={{ root: styles.button }}
          variant="contained"
          color="primary">
          Отправить
        </Button>
      )}
    </div>
  );
};
