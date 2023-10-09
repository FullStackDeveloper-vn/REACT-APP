import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null)
const CurrentUserContext = createContext(null)



export default function App() {
  const [theme, setTheme] = useState('light')
  // const [currentUser, setCurrentUser] = useState(null)

  return (
    <MyProviders theme={theme} setTheme={setTheme}>
      <WelcomePanel />
      <label>
        <input type="checkbox" checked={theme === 'dark'}
          onChange={(e) => {
            setTheme(e.target.checked ? 'dark' : 'light')
          }}
        />
        Use dark mode
      </label>
    </MyProviders>
  )
};

function MyProviders({ children, theme, setTheme }) {
  const [currentUser, setCurrentUser] = useState(null)
  return (
    <ThemeContext.Provider value={theme} >
      <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }} >
        {children}
      </CurrentUserContext.Provider>
    </ThemeContext.Provider>
  )
}
function WelcomePanel({ children }) {
  const { currentUser } = useContext(CurrentUserContext);
  return (
    <Panel title="Welcome">
      {currentUser !== null ?
        <Greeting /> :
        <LoginForm />
      }
    </Panel>
  );
}

function Greeting() {
  const { currentUser } = useContext(CurrentUserContext)
  return (
    <p>You logged in as {currentUser.name} </p>
  )
}

function LoginForm() {
  const { setCurrentUser } = useContext(CurrentUserContext)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const canLogin = firstName !== '' && lastName !== ''
  return (
    <>
      <label>
        First name {':'}
        <input required value={firstName}
          onChange={e => setFirstName(e.target.value)}
        />
      </label>
      <label>''
        Last name {':'}
        <input required value={lastName}
          onChange={e => setLastName(e.target.value)}
        />
      </label>
      <Button disabled={!canLogin} onClick={() => { setCurrentUser({ name: firstName + '' + lastName }) }} >Log in </Button>
    </>
  )
}

// function Form({children}) {
//   return (
//     <Panel title="Welcome" >
//       <LoginButton />
//     </Panel>
//   )
// }

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
  const theme = useContext(ThemeContext)
  const className = 'panel-' + theme
  return (
    <section className={className} >
      <h1> {title} </h1>
      {children}
    </section>
  )
}

function Button({ children, onClick }) {
  const theme = useContext(ThemeContext)
  const className = 'button-' + theme
  return (
    <button className={className} onClick={onClick} >
      {children}
    </button>
  )
  // do something
};
