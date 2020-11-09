import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { container } from './CreateGame.module.sass';
import BackArrow from '../../vectors/BackArrow';
import GameForm from './GameForm';
import Invites from './Invites';

const CreateGame = () => {
  const [createdGame, setCreatedGame] = useState(null);

  return (
    <section className={container}>
      <header>
        <Link to="/dashboard">
          <BackArrow />
        </Link>
        <h4>{createdGame ? createdGame.tableTitle : 'CREATE TABLE'}</h4>
      </header>
      {!createdGame ? (
        <GameForm onSuccess={setCreatedGame} />
      ) : (
        <Invites {...createdGame} />
      )}
    </section>
  );
};

export default CreateGame;
