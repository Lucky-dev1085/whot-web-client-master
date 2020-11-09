import React from 'react';
import PropTypes from 'prop-types';

import { sectionTitle, sectionIcon } from './SectionTitle.module.sass';

const SectionTitle = ({ label, icon }) => (
  <h2 className={sectionTitle}>
    <span className={sectionIcon}>{icon}</span>
    <span>{label}</span>
  </h2>
);

SectionTitle.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired
};

export default SectionTitle;
