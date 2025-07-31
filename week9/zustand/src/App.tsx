import "./App.css";
import Counter from "./components/Counter";
import RandomNumberGenerator from "./components/RandomNumberGenerator";

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-10">
        <Counter />
        <RandomNumberGenerator />
      </div>
    </div>
  );
}

export default App;
