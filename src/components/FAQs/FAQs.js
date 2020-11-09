import React from 'react';

import { faqs } from './FAQs.module.sass';
import FAQItem from './FAQItem';

import { FAQS as list } from './FAQs.constant';

const FAQs = () => (
  <div className={faqs}>
    {list.map(({ question, answer }, index) => (
      <FAQItem
        key={index}
        number={index + 1}
        question={question}
        answer={answer}
      />
    ))}
  </div>
);

export default FAQs;
