import React from "react";
import "./App.scss";

const App = () => {
  console.log(process.env.REACT_APP_TEST);
  return <div>{process.env.REACT_APP_TEST}</div>;
};
export default App;
