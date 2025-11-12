import Home from "./container/Home";
import { Route, Routes } from "react-router-dom";
import Tournament from "./container/Tournament";
import Series from "./container/Series";
import Toss from "./container/Toss";
import MultiplePlayer from "./container/MultiplePlayer";
import Battle from "./container/Battle";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="bg-green-200 pb-5">
      {/* <Home /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/series" element={<Series />} />
        <Route path="/toss" element={<Toss />} />
        <Route path="/multiplePlayer" element={<MultiplePlayer />} />
      </Routes>
    </div>
  );
}

export default App;
