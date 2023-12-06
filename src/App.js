import { useQuery } from "react-query";
import useSWR from "swr"

const fetcher = () =>
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((res) => res.json())

export default function App() {
  const { isLoading, error, data } = useQuery(['contacts'], fetcher)

  if (error) return <p>An error occurred</p>;
  if (isLoading) return <p>Loading</p>;
  console.log(data)

  return (
    <ul>
      {data.map(item => (
        <li key={item.id}>
          {item.id} <br></br>
          {item.name} <br></br> {item.email} <br></br>
          {item.company.catchPhrase}
          <hr></hr>
        </li>
      ))}
    </ul>
  )
}

// Fix Something