document.addEventListener("DOMContentLoaded", function () {
  const inputField = document.querySelector(".input input");
  const buttons = document.querySelectorAll(".button");
  let previousInput = "";
  let calculatorOn = false;

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const buttonText = this.textContent;

      if (calculatorOn || buttonText === "C") {
        if (buttonText === "=") {
          evaluateExpression();
        } else if (buttonText === "CE") {
          clearEverything();
        } else if (buttonText === "C") {
          toggleCalculator();
        } else if (buttonText === "DE") {
          deleteLastCharacter();
        } else {
          appendToInput(buttonText);
        }
      } else {
        alert("Press the 'C' button first to turn on the calculator.");
      }
    });
  });

  function toggleCalculator() {
    calculatorOn = !calculatorOn;
    if (calculatorOn === true) {
      inputField.value = "0";
    } else {
        inputField.value = "";
    }
  }

  function isOperator(text) {
    const operators = ["+", "-", "*", "/"];
    return operators.includes(text);
  }

  function evaluateExpression() {
    console.log("input field",inputField.value);
    console.log("previous input",previousInput);
    previousInput += inputField.value;
    try {
      const result = Function('"use strict";return (' + previousInput + ")")();
      inputField.value = result;
      previousInput = "";
    } catch (error) {
      inputField.value = "Error";
    }
  }

  function clearEverything() {
    inputField.value = "0";
    previousInput = "";
  }

  function deleteLastCharacter() {
    inputField.value = inputField.value.slice(0, -1);
    previousInput = previousInput.slice(0, -1);
  }

  function appendToInput(value) {
    if (isOperator(value)) {
      if (inputField.value !== "") {
        previousInput += inputField.value + value;
        inputField.value = "";
      } else if (previousInput !== "" && isOperator(previousInput.slice(-1))) {
        previousInput = previousInput.slice(0, -1) + value;
      }
    } else {
      if (inputField.value === "0") {
        inputField.value = value;
      } else {
        inputField.value += value;
      }
    }
  }
});
