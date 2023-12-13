import React, { useEffect, useState } from 'react';

export default function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    // Simulate an API call to fetch more data
    setIsLoading(true);
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`);
    const newData = await response.json();
    setData([...data, ...newData]);
    // setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  const handleScroll = () => {
    // Check if the user has reached the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
    ) {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [page]);

  return (
    <div>
      {data.map((item) => (
        <div key={item.id}>
          {item.id} <br></br>
          {item.title}
          <p>{item.body} </p>
          <p>{item.body} </p>
          <p>{item.body} </p>
        </div>
      ))}
      {isLoading && <div>Loading...</div>}
    </div>
  );
};
