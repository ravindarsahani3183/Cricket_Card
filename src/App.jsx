import Home from "./container/Home";
import { Route, Routes } from "react-router-dom";
import Tournament from "./container/Tournament";
import Series from "./container/Series";
import Toss from "./container/Toss";
function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="bg-green-200">
      {/* <Home /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tournament" element={<Tournament />} />
         <Route path="/series" element={<Series />} />
         <Route path="/toss" element={<Toss />} />
      </Routes>
    </div>
  );
}

export default App;
