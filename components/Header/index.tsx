import React from 'react';
import Link from 'next/link';
import {
  Paper,
  Button,
  IconButton,
  Avatar,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
  List,
  ListItem,
} from '@material-ui/core';
import {
  SearchOutlined as SearchIcon,
  CreateOutlined as PenIcon,
  SmsOutlined as MessageIcon,
  Menu as MenuIcon,
  ExpandMoreOutlined as ArrowBottom,
  NotificationsNoneOutlined as NotificationIcon,
  ArrowBack as ArrowBackIcon,
  AccountCircleOutlined as UserIcon,
} from '@material-ui/icons';

import styles from './Header.module.scss';
import { Login } from '../Forms/login';
import { Register } from '../Forms/register';
import { Main } from '../Forms/main';
import { useSelector } from 'react-redux';
import { selectUserData } from '../../redux/slices/user';
import { Api } from '../../utils/api';
import { PostDto } from '../../utils/api/types';

export const Header: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [formType, setFormType] = React.useState<'main' | 'login' | 'register'>('main');
  const userData = useSelector(selectUserData);

  React.useEffect(() => {
    if (open && userData) {
      setOpen(false);
    }
  }, [open, userData]);

  const [searchValue, setSearchValue] = React.useState('');
  const [serchingPosts, setSearchingPosts] = React.useState<PostDto[]>([]);

  const onSearch = async (e) => {
    setSearchValue(e.target.value);
    const data = await Api(null).post.search({ title: searchValue });
    setSearchingPosts(data.items);
  };

  return (
    <Paper classes={{ root: styles.root }} elevation={0}>
      <div className="d-flex align-center">
        <IconButton>
          <MenuIcon />
        </IconButton>
        <Link href="/">
          <img height={35} className="mr-20" src="/static/img/logo.svg" alt="Logo" />
        </Link>

        <div className={styles.searchBlock}>
          <SearchIcon />
          <input value={searchValue} onChange={onSearch} placeholder="Поиск" />
          {searchValue.length > 0 && (
            <Paper className={styles.autocomplete}>
              <List>
                {serchingPosts.map((post) => (
                  <Link key={post.id} href={`/news/${post.id}`}>
                    <ListItem button>{post.title}</ListItem>
                  </Link>
                ))}
              </List>
            </Paper>
          )}
        </div>

        <Link href={'./write'}>
          <Button variant="contained" className={styles.penButton}>
            Новая запись
          </Button>
        </Link>
      </div>
      <div className="d-flex align-center">
        <IconButton>
          <MessageIcon />
        </IconButton>
        <IconButton>
          <NotificationIcon />
        </IconButton>
        {userData ? (
          <Link href="/profile/1" className="d-flex align-center">
            <Avatar className={styles.avatar} alt="Remy Sharp" src="/images/logo.svg" />
            <ArrowBottom />
          </Link>
        ) : (
          <div className={styles.enterIcon} onClick={handleClickOpen}>
            <UserIcon /> Войти
          </div>
        )}
      </div>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
        <DialogContent>
          <DialogContentText>
            <Typography className={styles.title}>
              {formType === 'main' ? (
                'Вход в TJ'
              ) : (
                <div className={styles.linkBack} onClick={() => setFormType('main')}>
                  <ArrowBackIcon /> Перейти к авторизаций
                </div>
              )}
            </Typography>
            {formType === 'main' && <Main onClickLogin={() => setFormType('login')} />}
            {formType === 'login' && <Login onClickRegister={() => setFormType('register')} />}
            {formType === 'register' && <Register onClickAuthorize={() => setFormType('login')} />}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </Paper>
  );
};
