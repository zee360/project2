import React, { useEffect, useState } from 'react';
import useAuthContext from '../../auth/userAuthContext';
import Footer from '../../components/Footer/Footer';
import Header from '../../components/Header/Header';
import Products from '../../components/Products/Products';
import UserService from '../../services/user.service';

function Home() {
  const { user } = useAuthContext();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    UserService.getUsers().then((res) => {
      setUsers(res.data);
    });
  }, [UserService, setUsers]);

  return (
    <>
      <Header />
      <div className="container mx-auto ">
        <div className="flex flex-col">
          <Products />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
