import React, { useEffect, useRef } from 'react';

function Snowfall({ count }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const snowflakes = [];

    const createSnowflake = () => ({
      x: Math.random() * canvas.width,
      y: 0,
      radius: Math.random() * 2 + 1,
      speed: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.5,
    });



    const drawSnowflake = (snowflake) => {
      ctx.beginPath();
      ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2, false);
      ctx.fillStyle = `rgba(255, 255, 255, ${snowflake.opacity})`;
      ctx.fill();
    };

    const updateSnowflakes = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      snowflakes.forEach((snowflake, index) => {
        snowflake.y += snowflake.speed;

        if (snowflake.y > canvas.height) {
          snowflakes.splice(index, 1);
        }

        drawSnowflake(snowflake);
      });

      while (snowflakes.length < count) {
        snowflakes.push(createSnowflake());
      }
    };

    const animate = () => {
      updateSnowflakes();
      requestAnimationFrame(animate);
    };

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    animate();

    // Clean up event listeners when component unmounts
    return () => cancelAnimationFrame(animate);
  }, [count]);

  return <canvas ref={canvasRef} />;
};


export default function App() {
  return (
    <div className='bg'>
      {/* You can adjust the count prop to control the number of snowflakes */}
      <Snowfall count={100} />
    </div>
  );
};
