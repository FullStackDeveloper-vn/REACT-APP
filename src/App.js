import { useState, useEffect, ref } from "react";

export default function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [arr, setArr] = useState([]);

  useEffect(() => {
    fetch("https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/637261")
      .then(res => res.text())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result.split(''));
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  function renderLists() {
    if (arr.length < items.length) {
      let l = arr.length
      setArr([
        ...arr, items[l]
      ])
      clearInterval(intervalID)
    }
  }

  let intervalID = setInterval(renderLists, 500)

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Lists array={arr} />
    );
  }
}

function Lists({ array }) {
  return (
    <>
      <ul>
        {array.map((element, index) => (
          <li key={index}>{element}</li>
        ))}
      </ul>
    </>
  )
}