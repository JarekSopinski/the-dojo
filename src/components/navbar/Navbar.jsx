import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useLogout } from '../../hooks/useLogout';
import './Navbar.css';
import Temple from '../../assets/temple.svg';

export default function Navbar() {
  const { logout, isPending } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className='navbar'>
      <ul>

        <li className="logo">
          <img src={Temple} alt="dojo logo" />
          <span>The Dojo</span>
        </li>

        {!user && (
          <Fragment>
            <li><Link to={'/login'}>Login</Link></li>
            <li><Link to={'/signup'}>Signup</Link></li>
          </Fragment>

        )}

        {user && (
          <li>
            {isPending &&
              <button
                className="btn"
                disabled
              >Logging out...</button>
            }
            {!isPending &&
              <button
                className="btn"
                onClick={logout}
              >Logout</button>
            }
          </li>
        )}

      </ul>
    </nav>
  );
};