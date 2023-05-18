import Router from 'next/router';
import { useEffect } from 'react';
import { isAuth } from '@/actions/authActions';

const Admin = ({ children }) => {
  useEffect(() => {
    if (!isAuth()) {
      Router.push(`/signin`);
    } else if (!isAuth().isAdmin) {
      Router.push(`/`);
    }
  }, []);

  return <>{children}</>;
};

export default Admin;
