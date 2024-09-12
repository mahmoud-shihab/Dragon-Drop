import { Link } from "react-router-dom";
import "./Home.scss";

function Home() {
    return (
        <ul>
            <li><Link to="/playground">Playground</Link></li>
            <li><Link to="/tasks">Tasks</Link></li>
        </ul>
    );
}

export default Home;
