import React from 'react';
import styles from './WriteForm.module.scss';
import { Button, Input } from '@material-ui/core';
import dynamic from 'next/dynamic';
import { Api } from '../../utils/api';
import { PostDto } from '../../utils/api/types';
import { useRouter } from 'next/router';

const Editor = dynamic(() => import('../Editor').then((m) => m.Editor), { ssr: false });

interface WriteFormProps {
  data?: PostDto;
}

export const WriteForm: React.FC<WriteFormProps> = ({ data }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [title, setTitle] = React.useState(data?.title || '');
  const [blocks, setBlocks] = React.useState([]);
  const onAddPost = async () => {
    try {
      setIsLoading(true);
      if (data) {
        await Api().post.update(data.id, { title, body: blocks });
      } else {
        const post = await Api().post.create({ title, body: blocks });
        console.log('oj');

        await router.push(`write/${post.id}`);
      }
    } catch (error) {
      console.warn(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
      <Input
        multiline={true}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        classes={{ root: styles.titleField }}
        placeholder="Заголовок"
      />
      <div className={styles.editor}>
        <Editor
          initialBlocks={data?.body}
          onChange={(blocks) => {
            setBlocks(blocks);
          }}
        />
      </div>
      <Button
        disabled={isLoading || !data ? !blocks.length || !title : false}
        onClick={onAddPost}
        variant="contained"
        color="primary">
        {data ? 'Сохранить' : 'Опубликовать'}
      </Button>
    </div>
  );
};
