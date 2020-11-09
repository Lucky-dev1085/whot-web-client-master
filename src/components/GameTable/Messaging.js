import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  messagesNotifications,
  chatArea,
  messagingArea,
  chatContent,
  messageItem,
  userMessage,
  opponentMessage,
  messagerSender,
  typeArea,
  mobileTypeArea,
  newMessageInput,
  mobileTextAreaGroup,
  messageActions,
  closeChartArea
} from './GameTable.module.sass';
import Button from '../Button';
import { TextArea } from '../FormControls';
import MessagesIcon from '../../vectors/MessagesIcon';
import CircleCloseIcon from '../../vectors/CircleCloseIcon';
import { isMobile } from '../../utils';
import { MESSAGE_MAX_TEXT as messageMaxText } from './GameTable.constant';

const Messaging = ({ player, messages, sendMessage, sendingMessage }) => {
  const [openMessages, setOpenMessages] = useState(false);
  const [openTextArea, setOpenTextArea] = useState(false);
  const [newMessage, setNewMessage] = useState('');
  const [readMessages, setReadMessages] = useState(0);
  const unread = messages.length - readMessages;

  const onNewMessageChange = (name, value) => {
    !sendingMessage && setNewMessage(value);
  };

  const desktopSendMessage = () => {
    if (!newMessage.trim()) {
      return;
    }
    setNewMessage('');
    sendMessage(newMessage);
  };

  const sendNewMessage = () => {
    if (!newMessage.trim()) {
      return closeNewMessage();
    }
    sendMessage(newMessage, closeNewMessage);
  };

  const closeNewMessage = () => {
    setOpenTextArea(false);
    setNewMessage('');
  };

  useEffect(() => {
    openMessages && setReadMessages(messages.length);
  }, [messages, openMessages]);

  return (
    <>
      <span
        onClick={() => setOpenMessages(true)}
        className={messagesNotifications}
      >
        <MessagesIcon />
        <span>{Boolean(unread) && <span>{unread} NEW</span>}</span>
      </span>
      {openMessages && (
        <div className={chatArea}>
          <div className={messagingArea}>
            <ChatContent messages={messages} player={player} />
            <div className={cx(typeArea, { [mobileTypeArea]: isMobile() })}>
              {isMobile() ? (
                <Button
                  onClick={() => setOpenTextArea(true)}
                  theme="transparent"
                  size="xs"
                  block
                >
                  Touch to type
                </Button>
              ) : (
                <TextArea
                  className={newMessageInput}
                  name="newMessage"
                  value={newMessage}
                  placeholder="Type a message"
                  maxLength={messageMaxText}
                  onChange={onNewMessageChange}
                  onEnter={desktopSendMessage}
                />
              )}
            </div>
          </div>
          <span
            onClick={() => setOpenMessages(false)}
            className={closeChartArea}
          >
            <CircleCloseIcon />
          </span>
        </div>
      )}
      {openTextArea && (
        <MobileTextArea
          value={newMessage}
          onChange={setNewMessage}
          onSend={sendNewMessage}
          cancel={closeNewMessage}
        />
      )}
    </>
  );
};

const ChatContent = ({ messages, player }) => {
  const chatContentArea = useRef(null);

  useEffect(() => {
    const contentArea = chatContentArea.current;
    contentArea.scrollTop = contentArea.scrollHeight;
  }, [messages]);

  return (
    <div ref={chatContentArea} className={chatContent}>
      <div>
        {messages.map(({ text, senderName }, index) => {
          const isUser = senderName === player;

          return (
            <div
              className={cx(
                messageItem,
                isUser ? userMessage : opponentMessage
              )}
              key={index}
            >
              <div>
                <p>{text}</p>
                {!isUser && <div className={messagerSender}>{senderName}</div>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const MobileTextArea = ({ value, onChange, onSend, cancel }) => {
  const textArea = useRef(null);
  useEffect(() => textArea.current.focus(), []);

  return (
    <div className={mobileTextAreaGroup}>
      <textarea
        ref={textArea}
        value={value}
        maxLength={messageMaxText}
        onChange={e => onChange(e.target.value)}
      />
      <div className={messageActions}>
        <Button onClick={onSend} theme="secondary" size="xs">
          Send
        </Button>
        <span onClick={cancel}>Cancel</span>
      </div>
    </div>
  );
};

Messaging.propTypes = {
  messages: PropTypes.array.isRequired,
  sendMessage: PropTypes.func.isRequired,
  sendingMessage: PropTypes.bool,
  player: PropTypes.string
};

export default Messaging;
