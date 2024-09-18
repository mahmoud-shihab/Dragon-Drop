import { useState } from "react";
import "./Input.scss";

export default function Input({ onSubmit }) {
    const [input, setInput] = useState("");
    const handleSubmit = () => {
        if(!input) return
        onSubmit(input)
        setInput("")
    }
    const handleChange = (event) => setInput(event.target.value)
    return <div className="container">
        <input className="input" type="text" value={input} onChange={handleChange} />
        <button className="button" type="submit" onClick={handleSubmit}>Add Task</button>
    </div>;
}
