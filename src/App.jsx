import { Route, Routes } from "react-router-dom";

import Home from "./pages/Home";

import "./App.scss";

const App = () => {
    return (
        <div className="app-container">
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </div>
    );
};

export default App;
