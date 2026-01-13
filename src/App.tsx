import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Home } from "./pages/Home";
import { Samples } from "./pages/Samples";
import { News } from "./pages/News";

export const App = () => {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>

        <aside style={{ width: 200, padding: 20 }}>
          <h3>GeoLab</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/samples">Samples</Link></li>
            <li><Link to="/news">News</Link></li>
          </ul>
        </aside>

        <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/samples" element={<Samples />}></Route>
            <Route path="/news" element={<News />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}
