import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  container,
  title,
  warning,
  deleteAction,
  back
} from './DeleteAccount.module.sass';
import Button from '../Button';
import DeleteModal from './DeleteModal';

const DeleteAccount = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={container}>
      <h4 className={title}>DELETE MY ACCOUNT</h4>
      <p className={warning}>
        Are you sure you want to delete your account? <br />
        Once deleted you can no longer access your account and all the balance
        will be lost.
      </p>
      <div className={deleteAction}>
        <div className={back}>
          <Link to="/account/profile">BACK</Link>
        </div>
        <Button theme="secondary" onClick={() => setIsModalOpen(true)}>
          DELETE
        </Button>
      </div>
      {isModalOpen && <DeleteModal close={() => setIsModalOpen(false)} />}
    </div>
  );
};

export default DeleteAccount;
