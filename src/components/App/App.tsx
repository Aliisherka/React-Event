import { Layout } from 'antd';
import { FC, useEffect } from 'react';
import { useActions } from '../../hooks/useActions';
import { IUser } from '../../models/IUser';
import AppRoute from '../AppRoute/AppRoute';
import Navbar from '../Navbar/Navbar';
import './App.css';

const App: FC = () => {
  const {setUser, setIsAuth} = useActions();

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setUser({username: localStorage.getItem('username' || '')} as IUser);
      setIsAuth(true);
    }
  }, [setUser, setIsAuth])
  return (
    <Layout>
      <Navbar />
      <Layout.Content>
        <AppRoute />
      </Layout.Content>
    </Layout>
  );
}

export default App;
