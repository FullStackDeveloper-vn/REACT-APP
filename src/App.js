import React, { useState, useEffect } from "react";

const App = () => {
  const [bubbles, setBubbles] = useState([]);

  // Function to generate random number between min and max
  const getRandomNumber = (min, max) => {
    return Math.random() * (max - min) + min;
  };

  // Function to generate a new bubble
  const createBubble = () => {
    const bubble = {
      id: Date.now(),
      x: getRandomNumber(0, window.innerWidth), // random X position within the window width
      y: -50, // starting Y position above the screen
      size: getRandomNumber(50, 90), // random bubble size
      speed: 0.5 // random falling speed
    };

    setBubbles((prevState) => [...prevState, bubble]);
  };

  // Function to update bubble position on each animation frame
  const updateBubblePosition = () => {
    setBubbles((prevState) => {
      return prevState.map((bubble) => ({
        ...bubble,
        y: bubble.y + bubble.speed // update Y position by adding the falling speed
      }));
    });
  };

  // Function to remove bubbles that go below the screen
  const removeBubbles = () => {
    setBubbles((prevState) => {
      return prevState.filter((bubble) => bubble.y <= window.innerHeight);
    });
  };

  // Effect hook to create bubbles on component mount
  useEffect(() => {
    const interval = setInterval(createBubble, 500); // create a new bubble every 0.5 seconds

    // Clean up function to remove interval on component unmount
    return () => {
      clearInterval(interval);
    };
  }, []);

  // Effect hook to update bubble positions and remove bubbles
  useEffect(() => {
    const animationFrame = requestAnimationFrame(updateBubblePosition);

    // Clean up function to cancel animation frame on component unmount
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  });

  // Effect hook to remove bubbles that go below the screen
  useEffect(() => {
    removeBubbles();
  }, [bubbles]);

  return (
    <div className="bubble-container">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size
          }}
        />
      ))}
      <div className="screen" />
    </div>
  );
};

export default App;