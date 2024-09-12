import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Header from "./components/Header/Header";
import Playground from "./pages/Playground/Playground";
import TasksPage from "./pages/TasksPage/TasksPage";
import "./App.scss";
import Footer from "./components/Footer/Footer";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Navigate to="/" />} />
                <Route path="/tasks" element={<TasksPage />} />
                <Route path="/playground" element={<Playground />} />
            </Routes>
            <Footer />
        </>
    );
}

export default App;
