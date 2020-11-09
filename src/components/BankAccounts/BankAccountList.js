import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Slider from 'react-slick';

import {
  banksSlider,
  containSlides,
  showSlides,
  selectedBankDelete
} from './BankAccounts.module.sass';
import { UserConsumer } from '../../contexts/UserContext';
import BankCard from '../BankCard';
import Button from '../Button';

const BankAccountList = ({
  playerBankAccounts,
  authLoading,
  deleteBankAccount,
  onSelect,
  listLabel,
  canDelete,
  selectedColor
}) => {
  const [showSlider, setShowSlider] = useState(false);
  const [settings, setSettings] = useState(null);
  const [selectedBank, setSelectedBank] = useState(null);
  const [contain, setContain] = useState(false);
  const { name, accountNumber, id } = selectedBank || {};

  const sliderContainer = useRef(null);
  const addSlider = () => {
    const sliderEl = sliderContainer.current;
    const computedSlidesToShow = Math.ceil(sliderEl.clientWidth / 220);
    const slidesToShow =
      computedSlidesToShow === playerBankAccounts.length
        ? computedSlidesToShow - 1
        : Math.min(computedSlidesToShow, playerBankAccounts.length);

    const settings = {
      slidesToShow,
      dots: true,
      arrows: false,
      infinite: true,
      speed: 500,
      swipeToSlide: true
    };

    setSettings(settings);
    setContain(playerBankAccounts.length <= computedSlidesToShow);
    setTimeout(
      () =>
        (sliderEl.querySelector(
          '.slick-list'
        ).style.width = `${computedSlidesToShow * 220}px`),
      0
    );
    setTimeout(() => setShowSlider(true), 50);
  };

  const onBankSelect = bank => {
    onSelect && onSelect(bank);
    setSelectedBank(bank);
  };

  useEffect(addSlider, []);

  return (
    <>
      {listLabel && <h6>{listLabel}</h6>}
      <div ref={sliderContainer}>
        {settings && (
          <Slider
            className={cx(banksSlider, {
              [containSlides]: contain,
              [showSlides]: showSlider
            })}
            {...settings}
          >
            {playerBankAccounts.map((data, index) => (
              <div key={index}>
                <BankCard
                  {...data}
                  onSelect={onBankSelect}
                  selectedColor={selectedColor}
                  selectedBankId={selectedBank && selectedBank.id}
                />
              </div>
            ))}
          </Slider>
        )}
        {canDelete && selectedBank && (
          <div className={selectedBankDelete}>
            <div>
              <h4>{name}</h4>
              <p>
                ACCOUNT ENDING WITH{' '}
                <span>{accountNumber.substring(6, 10)}</span>
              </p>
            </div>
            <Button
              theme="secondary"
              disabled={authLoading}
              onClick={() => deleteBankAccount(id)}
            >
              REMOVE
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

BankAccountList.propTypes = {
  onSelect: PropTypes.func,
  listLabel: PropTypes.string,
  canDelete: PropTypes.bool,
  selectedColor: PropTypes.string
};

export default UserConsumer(BankAccountList);
