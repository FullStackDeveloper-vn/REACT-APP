import { createContext, useContext, useState } from "react";

const ThemeContext = createContext(null)

export default function App() {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={theme} >
      <Form />
      <label>
        <input type="checkbox" checked={theme === 'dark'} onChange={(e) => {
          setTheme(e.target.checked ? 'dark' : 'light')
        }} />
        Use dark mode
      </label>
    </ThemeContext.Provider>
  )

};

function Form() {
  return (
    <Panel title="Welcome" >
      <Button>SignUp</Button>
      <Button>Login</Button>
    </Panel>
  )
}

function Panel({ title, children }) {
  const theme = useContext(ThemeContext)
  const classname = 'panel-' + theme
  return (
    <section className={classname} >
      <h1> {title} </h1>
      {children}
    </section>
  )
}

function Button({ children }) {
  const theme = useContext(ThemeContext)
  const className = 'button-' + theme
  return (
    <button className={className} >
      {children}
    </button>
  )
  // do something
};
