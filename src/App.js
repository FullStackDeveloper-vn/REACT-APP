import { useState, useEffect } from "react";
import { FadeInAnimation } from "./animation";
import { useRef } from "react";

function Welcome() {
  const ref = useRef(null)

  useEffect(() => {
    const animation = new FadeInAnimation(ref.current)
    animation.start(1000)
    return () => {
      animation.stop()
    }
  }, [])
  return (
    <h1
      ref={ref}
      style={{
        opacity: 0, color: 'white', fontSize: 50,
        backgroundImage: 'radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%)'
      }}
    > Welcome </h1>
  )
}

export default function App() {
  const [show, setShow] = useState(false)
  return (
    <>
      <button onClick={() => setShow(!show)} >
        {show ? 'Remove' : 'Show'}
      </button>
      <hr />
      {show && <Welcome />}
    </>
  )

};
