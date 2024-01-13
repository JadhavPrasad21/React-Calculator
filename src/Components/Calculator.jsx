import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faMinus,
  faXmark,
  faDivide,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export default function Calculator() {
  // State to store input values and result/error messages
  const [numbers, setNumbers] = useState({ num1: "", num2: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  //icons
  const add = <FontAwesomeIcon icon={faPlus} />;
  const subtract = <FontAwesomeIcon icon={faMinus} />;
  const multiply = <FontAwesomeIcon icon={faXmark} />;
  const div = <FontAwesomeIcon icon={faDivide} />;

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setNumbers((prevNumbers) => {
      return {
        ...prevNumbers,
        [name]: value,
      };
    });
    console.log(value);
  }

  // Validate input values
  const validateInput = (num1, num2) => {
    if (num1 === "" || num2 === "" || isNaN(num1) || isNaN(num2)) {
      setError("Error!");
      setResult("Number cannot be empty");
      return false;
    }
    setError("Success");
    return true;
  };

  // Perform calculation based on the selected operation
  function calculate(operation) {
    if (validateInput(numbers.num1, numbers.num2)) {
      let res;

      if (operation === "add") {
        res = parseFloat(numbers.num1) + parseFloat(numbers.num2);
      } else if (operation === "subtract") {
        res = parseFloat(numbers.num1) - parseFloat(numbers.num2);
      } else if (operation === "multiply") {
        res = parseFloat(numbers.num1) * parseFloat(numbers.num2);
      } else if (operation === "divide") {
        if (numbers.num1 === "0") {
          setError("Error!");
          setResult("Cannot divide by zero");
          return;
        }
        res = parseFloat(numbers.num1) / parseFloat(numbers.num2);
      }

      setResult(res);
    }
  }

  return (
    <>
      <div className="--calculator">
        <div>
          <h1 className="--cal-heading">React Calculator</h1>
          <input
            type="number"
            className="--input"
            placeholder="num1"
            value={numbers.num1}
            name="num1"
            onChange={handleChange}
          />
          <input
            type="number"
            className="--input"
            placeholder="num1"
            value={numbers.num2}
            name="num2"
            onChange={handleChange}
          />
        </div>
        <div className="--buttons-div">
          <button className="--button" onClick={() => calculate("add")}>
            {add}
          </button>
          <button className="--button" onClick={() => calculate("subtract")}>
            {subtract}
          </button>
          <button className="--button" onClick={() => calculate("multiply")}>
            {multiply}
          </button>
          <button className="--button" onClick={() => calculate("divide")}>
            {div}
          </button>
        </div>
        <div className="--errors">
          {error && (
            <p style={{ color: error === "Error!" ? "red" : "green" }}>
              {error}
            </p>
          )}
          {result && <p>Result - {result}</p>}
        </div>
      </div>
    </>
  );
}
