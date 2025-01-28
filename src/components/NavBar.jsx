import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const styles = {
    nav: {
      backgroundColor: '#333',
      padding: '1rem',
      marginBottom: '2rem'
    },
    list: {
      display: 'flex',
      gap: '2rem',
      listStyle: 'none',
      margin: 0,
      padding: 0
    },
    link: {
      color: 'white',
      textDecoration: 'none'
    }
  };

  return (
    <nav style={styles.nav}>
      <ul style={styles.list}>
        <li>
          <Link to="/" style={styles.link}>Home</Link>
        </li>
        <li>
          <Link to="/posts" style={styles.link}>Posts</Link>
        </li>
        <li>
          <Link to="/create" style={styles.link}>Create Post</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;