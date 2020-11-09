import React, { Component, createRef } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';

import styles from './FAQs.module.sass';

class FAQItem extends Component {
  state = {};
  questionRef = createRef();
  answerRef = createRef();

  setStateHeights = () => {
    const questionHeight = this.question.getBoundingClientRect().height;
    const answerHeight = this.answer.getBoundingClientRect().height;

    this.setState({
      closedHeight: questionHeight,
      openedHeight: questionHeight + answerHeight + 50
    });
  };

  toggleCollapse = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  };

  componentDidMount() {
    this.question = this.questionRef.current;
    this.answer = this.answerRef.current;
    this.setStateHeights();

    window.addEventListener('resize', this.setStateHeights);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setStateHeights);
  }

  render() {
    const { number, question, answer } = this.props;
    const { isOpen, closedHeight, openedHeight } = this.state;
    const itemStyle = { maxHeight: isOpen ? openedHeight : closedHeight };

    return (
      <div className={styles.faqItem} style={itemStyle}>
        <div
          ref={this.questionRef}
          className={cx(styles.question, { [styles.isOpen]: isOpen })}
          onClick={this.toggleCollapse}
        >
          {number}. {question}
        </div>
        <div ref={this.answerRef} className={styles.answer}>
          {answer}
        </div>
      </div>
    );
  }
}

FAQItem.propTypes = {
  number: PropTypes.number.isRequired,
  question: PropTypes.node.isRequired,
  answer: PropTypes.node.isRequired
};

export default FAQItem;
