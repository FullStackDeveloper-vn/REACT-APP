import { createContext, useContext, useState } from "react";

// const ThemeContext = createContext(null)
const CurrentUserContext = createContext(null)



export default function App() {
  // const [theme, setTheme] = useState('light')
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }} >
      <Form />
    </CurrentUserContext.Provider>
  )

};

function Form({ children }) {
  return (
    <Panel title="Welcome" >
      <LoginButton />
    </Panel>
  )
}

function LoginButton() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext)
  if (currentUser !== null) {
    console.log(currentUser)
    return <p>You logged in as {currentUser.name} </p>
  }

  return (
    <Button onClick={() => {
      setCurrentUser({ name: 'Hoang' })
    }} > Login in Avika </Button>
  )
}

function Panel({ title, children }) {
  return (
    <section className="panel" >
      <h1> {title} </h1>
      {children}
    </section>
  )
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick} >
      {children}
    </button>
  )
  // do something
};
