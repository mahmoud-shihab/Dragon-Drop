import { CSS } from "@dnd-kit/utilities";
import "./Task.scss";

import { useSortable } from "@dnd-kit/sortable";

export default function Task({ id, title }) {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id });

    const handleChange = () => {
        console.log("Checked")
    }

    const style = {
        transform : CSS.Transform.toString(transform),
        transition
    }

    return (
        <div ref={setNodeRef} {...attributes} {...listeners} style={style} className="task" id={id}>
            <input type="checkbox" className="task__checkbox" onChange={handleChange} />
            {title}
        </div>
    );
}
