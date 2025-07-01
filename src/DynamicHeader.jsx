import React, { useContext } from 'react';
import AdminHeader from './Admin/Header';
import Header from './Components/Header/Header';
import { UserContext } from './Components/Auth/authContext'

function DynamicHeader() {
    const { user } = useContext(UserContext);

    if (!user) return <Header />; // or show loading...

    return user.role === 'admin' ? <AdminHeader /> : <Header />;
}

export default DynamicHeader;
