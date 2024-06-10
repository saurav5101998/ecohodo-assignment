import React from "react";
import logo from "./logo.svg";
import "./App.css";
import DynamicForm from "./dynamicForms/DynamicForm";

function App() {
  return (
    <div className="App">
      <div>
        <h1>Dynamic Form</h1>
        <DynamicForm />
      </div>
    </div>
  );
}

export default App;
