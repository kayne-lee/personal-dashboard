"use client"

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  const [timeOfDay, setTimeOfDay] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const [quote, setQuote] = useState('');

  useEffect(() => {
    // Function to get the time of day
    const getTimeOfDay = () => {
      const hour = new Date().getHours();
      if (hour >= 5 && hour < 12) return 'Good morning';
      if (hour >= 12 && hour < 18) return 'Good afternoon';
      return 'Good evening';
    };

    // Function to get the current time
    const getCurrentTime = () => {
      const date = new Date();
      const options = { 
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
      };
      return date.toLocaleString('en-US', options);
    };

    // Function to fetch a motivational quote
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        setQuote(data.content);
      } catch (error) {
        console.error('Error fetching quote:', error);
      }
    };

    setTimeOfDay(getTimeOfDay());
    setCurrentTime(getCurrentTime());
    fetchQuote();
  }, []);

  return (
    <motion.div
        className="bg-gray-900 text-white p-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <h1>{timeOfDay}, Kayne</h1>
        <p>It is {currentTime}.</p>
        <blockquote>{quote}</blockquote>
    </motion.div>
  );
};

export default Header;
