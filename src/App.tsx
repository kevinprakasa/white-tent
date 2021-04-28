import logo from "./logo.svg";
import "./App.css";
import "@progress/kendo-theme-default/dist/all.css";
import { Calendar } from "@progress/kendo-react-dateinputs";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <Calendar />
    </div>
  );
}

export default App;
