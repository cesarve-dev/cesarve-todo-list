/* eslint-disable react/prop-types */
import { NavLink } from 'react-router';
import styles from './Header.module.css';

const Header = ({ title }) => {
  return (
    <div className={styles.headerContainer}>
      <h1>{title}</h1> {/* don't forget to center H1*/}
      <nav className={styles.navbar}>
        <NavLink
          to={'/'}
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          Home
        </NavLink>
        <NavLink
          to={'/about'}
          className={({ isActive }) =>
            isActive ? styles.active : styles.inactive
          }
        >
          About
        </NavLink>
      </nav>
    </div>
  );
};

export default Header;
