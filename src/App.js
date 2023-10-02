import { useState } from "react";

function Lists({ arr }) {

  return (
    <>
      <ul>
        {arr.map((a) => (
          <li>{a}</li>
        ))}
      </ul>
    </>
  )
}

export default function App() {
  const [arr, setArr] = useState([''])

  function renderLists() {
    if (arr.length < 5) {
      setArr([
        ...arr, ['x']
      ])
      clearInterval(intervalID)
    }
  }

  const intervalID = setInterval(renderLists, 1000);

  console.log(arr.length);
  return (
    <>
      <Lists arr={arr} />
    </>
  )
};
