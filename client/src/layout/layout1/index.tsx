import React from 'react';
import {Link, Outlet} from 'react-router-dom';

const Layout1 = () => {
  return (
    <div className='layout1'>
      <nav className='nav'>
        <Link to='/file'>File</Link>
        <Link to='/send-obj'>Send Obj</Link>
        <Link to='/blob'>Blob</Link>
        <Link to='/file-data'>/file-data</Link>
      </nav>
      <div className='wrapper'>{<Outlet />}</div>
    </div>
  );
};

export default Layout1;
