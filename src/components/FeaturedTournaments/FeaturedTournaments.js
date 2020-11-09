import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import cx from 'classnames';

import {
  container,
  multiple,
  featuredTournament
} from './FeaturedTournaments.module.sass';
import { GamesConsumer } from '../../contexts/GamesContext';
import { UserConsumer } from '../../contexts/UserContext';
import { TournamentCard, JoinTournamentModal } from '../GameCards';

const FeaturedTournaments = ({
  loadingFeaturedTournaments,
  featuredTournaments,
  getFeaturedTournaments,
  joinGameSuccess,
  resetGameSuccess,
  getProfile
}) => {
  const total = featuredTournaments.length;
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: total > 1 ? 1.15 : total,
    slidesToScroll: 1
  };

  const [openGameIndex, setOpenGameIndex] = useState(null);

  useEffect(getFeaturedTournaments, []);
  useEffect(() => {
    if (joinGameSuccess) {
      resetGameSuccess();
      getProfile();
      setOpenGameIndex(false);
    }
  }, [joinGameSuccess, resetGameSuccess, getProfile]);

  return (
    !loadingFeaturedTournaments && (
      <>
        <Slider
          className={cx(container, { [multiple]: total > 1 })}
          {...settings}
        >
          {featuredTournaments.map((data, index) => (
            <div key={index} className={featuredTournament}>
              <TournamentCard
                featuredCard
                {...data}
                gameIndex={index}
                openJoinModal={gameIndex => setOpenGameIndex(gameIndex)}
              />
            </div>
          ))}
        </Slider>
        {typeof openGameIndex === 'number' && (
          <JoinTournamentModal
            {...featuredTournaments[openGameIndex]}
            close={() => setOpenGameIndex(null)}
          />
        )}
      </>
    )
  );
};

export default UserConsumer(GamesConsumer(FeaturedTournaments));
