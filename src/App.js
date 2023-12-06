import axios from "axios"
import { useState,useEffect } from "react"

export default function App() {
  const [items,setItems] = useState([])
  const [error,setError] = useState(null)

  useEffect(() => {
    axios('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
  console.log(response.data)

        setItems(response.data)
        setError(null)
      })
      .catch(setError)
  },[])

  if(error) return <p>An error occurred</p>
  return (
    <ul>
    {items.map(item => (
      <li key={item.id}>
        {item.name} <br></br> {item.email}
      </li>
    ))}
  </ul>
  )
}

// Fix Something