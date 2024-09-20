import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "./App.scss";

function App() {


    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="/sheets/:sheetID" element={<Home />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
