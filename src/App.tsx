import HomePage from "./component/HomePage/HomePage";
import { DataProvider } from "./context/DataProvider";

function App() {
  return (
    <div>
      <DataProvider>
        <HomePage />
      </DataProvider>
    </div>
  );
}

export default App;
