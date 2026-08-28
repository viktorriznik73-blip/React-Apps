import React from 'react'; 
import { useState, useEffect } from 'react'; 
import './MessageList.css'
export default function MessageList({ messages }) {
  console.log(messages)
  return (
    <div className="messages-list">
      {messages.map((msg) => (
        <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
          {msg.sender === 'bot' && msg.isThinking ? (
            <div className='dot-container'>
              <span></span>
              <span></span>
              <span></span>
            </div>
          ) : (
          <p className={`message-bubble ${msg.sender}`}>{msg.text}</p>
          )}
        </div>
      ))}
    </div>
  );
}
