import './App.css';
import { FaStar, FaTrash } from "react-icons/fa";
import { useInput } from "./hooks";
import { useColors } from './ColorProvider';

const createArray = length => [...Array(length)];

function Star({ selected = false, onSelect }) {
  return <FaStar color={selected ? "red" : "gray"} onClick={onSelect} />;
}

function StarRating({ totalStars = 5, selectedStars, onStarRate }) {

  return <>
    {createArray(totalStars).map((star, index) =>
      <Star key={index} selected={selectedStars > index} onSelect={() => onStarRate(index + 1)} />
    )}
    <p>{selectedStars} of {totalStars}</p>
  </>
}

function Color({ id, title, color, rating}) {
  const {rateColor, removeColor} = useColors();

  return (<div className="box">
    <h1>{title}</h1>
    <div style={{ height: 50, backgroundColor: color }}></div>
    <h3>{color}</h3>
    <StarRating selectedStars={rating} onStarRate={(rating) => rateColor(id, rating)} />
    <button>
      <FaTrash onClick={() => removeColor(id)} />
    </button>
  </div>)
}

export function ColorList() {
  const {colors} = useColors();
  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
      {colors.map((color) => <Color {...color} />)}
    </div>
  );
}

export function AddColorForm() {
  const [titleProps, resetTxtTitle] = useInput("");
  const [colorProps, resetTxtColor] = useInput("#000000");

  const {addColor} = useColors();

  const submit = (e) => {
    e.preventDefault();
    console.log(titleProps);
    addColor(titleProps.value, colorProps.value);
    resetTxtTitle();
    resetTxtColor();
  }
  return (
    <div style={{ display: 'flex', textAlign: 'center', flexDirection: 'column', marginBottom: '2rem' }}>
      <h2>Add Color</h2>
      <form onSubmit={submit} style={{ display: 'flex', justifyContent: 'center' }}>
        <input type="text" placeholder="Color Name" {...titleProps} />
        <input type="color" placeholder="Color" {...colorProps} />
        <button type="submit">Add Color</button>
      </form>
    </div>
  );
}
function App() {

  return (
    <>
      <h1 style={{ textAlign: "center" }}>Color Organizer</h1>
      <AddColorForm />
      <ColorList /> 
    </>
  );
}

export default App;
