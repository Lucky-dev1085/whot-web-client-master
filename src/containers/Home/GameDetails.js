import React from 'react';

import {
  gameDetails,
  gameRules,
  gameFeatures,
  targetIcon,
  shapes,
  featuresHeading
} from './Home.module.sass';
import SectionTitle from '../../components/SectionTitle';
import BoltIcon from '../../vectors/BoltIcon';
import TargetIcon from '../../vectors/TargetIcon';
import {
  SHAPES_LIST as shapesList,
  FEATURES_LIST as featuresList
} from './Home.constants';

const GameDetails = () => (
  <div className={gameDetails}>
    <div className={gameRules}>
      <SectionTitle label="Game Rules" icon={<BoltIcon />} />
      <p>
        Mauris neque nunc, ornare a velit ut, pretium finibus tellus. Curabitur
        ut lorem. Mauris neque nunc, ornare a velit ut, pretium finibus tellus.
        Curabitur ut lorem.
      </p>
      <ul className={shapes}>
        {shapesList.map(({ icon, label }) => (
          <li key={label}>
            {icon}
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
    <div className={gameFeatures}>
      <SectionTitle
        label="How Betting Works"
        icon={<TargetIcon className={targetIcon} />}
      />
      <p>
        Mauris neque nunc, ornare a velit ut, pretium finibus tellus. Curabitur
        ut lorem. Mauris neque nunc, ornare a velit ut, pretium finibus tellus.
        Curabitur ut lorem.
      </p>

      <h4 className={featuresHeading}>KEY FEATURES</h4>
      <ul className={shapes}>
        {featuresList.map(({ icon, label }) => (
          <li key={label}>
            {icon}
            <span>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default GameDetails;
