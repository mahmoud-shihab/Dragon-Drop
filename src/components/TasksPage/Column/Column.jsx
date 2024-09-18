import "./Column.scss";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import Task from "../Task/Task";

export default function Column({tasks}) {
    return (
        <div className="column">
            <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
                {tasks.map((task) => (
                    <Task key={task.id} id={task.id} title={task.title}/>
                ))}
            </SortableContext>
        </div>
    );
}
