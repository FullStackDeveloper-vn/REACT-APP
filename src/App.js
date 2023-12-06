import useSWR from "swr"

const fetcher = (...args) => fetch(...args)
  .then((res) => res.json())

export default function App() {
  const { data, error } = useSWR(
    'https://jsonplaceholder.typicode.com/users',
    fetcher
  )

  if (error) return <p>An error occurred</p>;
  if (!data) return <p>Loading</p>;
  console.log(data)
  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>
          {item.id} <br></br>
          {item.name} <br></br> {item.email} <hr></hr>
        </li>
      ))}
    </ul>
  )
}

// Fix Something