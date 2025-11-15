import React, { useState, useRef, useEffect } from 'react';
import './TeleBOT.css';

const TeleBOT = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m TeleBOT, your AI assistant. How can I help you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [activeChat, setActiveChat] = useState('Current Conversation');
  const [chatHistory, setChatHistory] = useState({
    'Current Conversation': [
      {
        id: 1,
        role: 'assistant',
        content: 'Hello! I\'m TeleBOT, your AI assistant. How can I help you today?',
        timestamp: new Date()
      }
    ],
    'Project Discussion': [
      {
        id: 1,
        role: 'assistant',
        content: 'Welcome to Project Discussion! How can I help you with your project?',
        timestamp: new Date()
      }
    ],
    'Technical Questions': [
      {
        id: 1,
        role: 'assistant',
        content: 'Hello! I\'m here to help with technical questions. What would you like to know?',
        timestamp: new Date()
      }
    ]
  });
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isTyping) return;

    const messageContent = inputValue.trim();
    setInputValue('');
    setIsTyping(true);
    
    // Reset textarea height
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
    }

    // Add user message
    setMessages(prev => {
      const userMessage = {
        id: prev.length + 1,
        role: 'user',
        content: messageContent,
        timestamp: new Date()
      };
      return [...prev, userMessage];
    });

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's an interesting question! Let me help you with that.",
        "I understand what you're asking. Here's what I think...",
        "Great question! Based on what you've told me, I'd suggest...",
        "I'm here to help! Let me provide you with some insights on that.",
        "Thanks for asking! Here's my perspective on that topic.",
        "That's a thoughtful question. Let me break it down for you.",
        "I appreciate you sharing that with me. Here's what I can tell you...",
        "Interesting! Let me think about that and give you a helpful response."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => {
        const assistantMessage = {
          id: prev.length + 1,
          role: 'assistant',
          content: randomResponse,
          timestamp: new Date()
        };
        const updatedMessages = [...prev, assistantMessage];
        // Save to chat history
        setChatHistory(prevHistory => ({
          ...prevHistory,
          [activeChat]: updatedMessages
        }));
        return updatedMessages;
      });
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend(e);
    }
  };

  // Auto-resize textarea
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  // Load messages when active chat changes
  useEffect(() => {
    if (chatHistory[activeChat]) {
      setMessages(chatHistory[activeChat]);
    }
  }, [activeChat, chatHistory]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.header-btn-wrapper') && !event.target.closest('.header-btn')) {
        setShowSettings(false);
      }
      if (!event.target.closest('.user-profile-wrapper') && !event.target.closest('.user-profile')) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const clearChat = () => {
    const welcomeMessage = {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m TeleBOT, your AI assistant. How can I help you today?',
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    setChatHistory(prev => ({
      ...prev,
      [activeChat]: [welcomeMessage]
    }));
    setInputValue('');
    setIsTyping(false);
  };

  const handleSettings = () => {
    setShowSettings(!showSettings);
    setShowProfile(false);
  };

  const handleChatSelect = (chatName) => {
    setActiveChat(chatName);
    setShowSettings(false);
    setShowProfile(false);
    if (chatHistory[chatName]) {
      setMessages(chatHistory[chatName]);
    }
  };

  const handleProfileClick = () => {
    setShowProfile(!showProfile);
    setShowSettings(false);
  };

  const createNewChat = () => {
    const newChatName = `Chat ${Object.keys(chatHistory).length + 1}`;
    const welcomeMessage = {
      id: 1,
      role: 'assistant',
      content: 'Hello! I\'m TeleBOT, your AI assistant. How can I help you today?',
      timestamp: new Date()
    };
    setChatHistory(prev => ({
      ...prev,
      [newChatName]: [welcomeMessage]
    }));
    setActiveChat(newChatName);
    setMessages([welcomeMessage]);
    setInputValue('');
    setIsTyping(false);
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className="telebot-container">
      {/* Sidebar */}
      <aside className="telebot-sidebar">
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={createNewChat}>
            <i className="fas fa-plus"></i>
            <span>New Chat</span>
          </button>
        </div>
        <div className="sidebar-content">
          <div className="chat-history">
            <h3 className="history-title">Recent Chats</h3>
            {Object.keys(chatHistory).map((chatName) => (
              <div 
                key={chatName}
                className={`history-item ${activeChat === chatName ? 'active' : ''}`} 
                onClick={() => handleChatSelect(chatName)}
              >
                <i className="fas fa-comment"></i>
                <span>{chatName}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="sidebar-footer">
          <div className="user-profile-wrapper">
            <div className="user-profile" onClick={handleProfileClick}>
              <div className="profile-avatar">
                <i className="fas fa-user"></i>
              </div>
              <div className="profile-info">
                <span className="profile-name">User</span>
                <span className="profile-status">Online</span>
              </div>
            </div>
            {showProfile && (
              <div className="profile-dropdown">
                <div className="dropdown-item" onClick={() => { setShowProfile(false); }}>
                  <i className="fas fa-user-circle"></i>
                  <span>My Profile</span>
                </div>
                <div className="dropdown-item" onClick={() => { setShowProfile(false); }}>
                  <i className="fas fa-cog"></i>
                  <span>Account Settings</span>
                </div>
                <div className="dropdown-item" onClick={() => { setShowProfile(false); }}>
                  <i className="fas fa-history"></i>
                  <span>Chat History</span>
                </div>
                <div className="dropdown-item" onClick={() => { setShowProfile(false); }}>
                  <i className="fas fa-sign-out-alt"></i>
                  <span>Sign Out</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="telebot-main">
        <div className="chat-header">
          <div className="header-left">
            <h1 className="chat-title">TeleBOT</h1>
            <span className="chat-subtitle">AI Assistant</span>
          </div>
          <div className="header-actions">
            <div className="header-btn-wrapper">
              <button className="header-btn" title="Settings" onClick={handleSettings}>
                <i className="fas fa-cog"></i>
              </button>
              {showSettings && (
                <div className="settings-dropdown">
                  <div className="dropdown-item" onClick={() => { setShowSettings(false); }}>
                    <i className="fas fa-palette"></i>
                    <span>Theme Settings</span>
                  </div>
                  <div className="dropdown-item" onClick={() => { setShowSettings(false); }}>
                    <i className="fas fa-bell"></i>
                    <span>Notifications</span>
                  </div>
                  <div className="dropdown-item" onClick={() => { setShowSettings(false); }}>
                    <i className="fas fa-language"></i>
                    <span>Language</span>
                  </div>
                  <div className="dropdown-item" onClick={() => { setShowSettings(false); }}>
                    <i className="fas fa-keyboard"></i>
                    <span>Keyboard Shortcuts</span>
                  </div>
                </div>
              )}
            </div>
            <button className="header-btn" title="Clear Chat" onClick={clearChat}>
              <i className="fas fa-trash"></i>
            </button>
          </div>
        </div>

        <div className="chat-messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.role}`}>
              <div className="message-avatar">
                {message.role === 'user' ? (
                  <i className="fas fa-user"></i>
                ) : (
                  <i className="fas fa-robot"></i>
                )}
              </div>
              <div className="message-content">
                <div className="message-text">{message.content}</div>
                <div className="message-time">{formatTime(message.timestamp)}</div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message assistant typing">
              <div className="message-avatar">
                <i className="fas fa-robot"></i>
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        <div className="chat-input-container">
          <form onSubmit={handleSend} className="chat-input-form">
            <div className="input-wrapper">
              <textarea
                ref={inputRef}
                className="chat-input"
                placeholder="Message TeleBOT..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                rows="1"
              />
              <button 
                type="submit" 
                className="send-btn"
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                title="Send message"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
            <div className="input-footer">
              <span className="input-hint">
                <i className="fas fa-info-circle"></i>
                TeleBOT can make mistakes. Check important info.
              </span>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default TeleBOT;

