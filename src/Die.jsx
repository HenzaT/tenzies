export default function Die(props) {

  const styles = {
    backgroundColor: props.isHeld ? "#59E391" : "#ffffff"
  }
  return (
    <button
      className="dice"
      style={styles}
      onClick={() => props.hold(props.id)}
      aria-pressed={props.isHeld}
      aria-label={`die with value ${props.value},
      ${props.isHeld ? "held" : "not held"}`}
    >
      {props.ref}
      {props.value}
      {props.isHeld}
    </button>
  )
}
