import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <Link to="/client/add" className="btn btn-success btn-block">
      <span className="fas fa-plus mr-2" />
      Add Client
    </Link>
  );
};
