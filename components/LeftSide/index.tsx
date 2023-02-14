import styles from './LeftSide.module.scss';
import {
  Textsms as TextsmsIcon,
  TrendingUp as TrendingUpIcon,
  WhatshotOutlined as FireIcon,
  List as ListIcon,
} from '@material-ui/icons';
import { Button } from '@material-ui/core';
import React from 'react';

export const LeftSide: React.FC = () => {
  return (
    <div className={styles.menu}>
      <ul>
        <li>
          <Button>
            <FireIcon />
            Лента
          </Button>
        </li>
        <li>
          <Button>
            <TextsmsIcon />
            Сообщения
          </Button>
        </li>
        <li>
          <Button>
            <TrendingUpIcon />
            Рейтинг TJ
          </Button>
        </li>
        <li>
          <Button>
            <ListIcon />
            Подписчики
          </Button>
        </li>
        <li>
          <Button></Button>
        </li>
        <li>
          <Button></Button>
        </li>
        <li>
          <Button></Button>
        </li>
      </ul>
    </div>
  );
};
