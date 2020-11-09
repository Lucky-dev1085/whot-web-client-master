import React from 'react';

import { faqs } from './Home.module.sass';
import SectionTitle from '../../components/SectionTitle';
import FAQs from '../../components/FAQs';
import BoltIcon from '../../vectors/BoltIcon';

const FAQsList = () => (
  <div className={faqs}>
    <SectionTitle label="FAQs" icon={<BoltIcon />} />
    <FAQs />
  </div>
);

export default FAQsList;
