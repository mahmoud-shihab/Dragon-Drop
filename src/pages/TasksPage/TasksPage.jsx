import { useState } from "react";
import "./TasksPage.scss";
import {
    closestCorners,
    DndContext,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import Input from "../../components/TasksPage/Input/Input.jsx";
import Column from "../../components/TasksPage/Column/Column.jsx";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";

function TasksPage() {
    const [tasks, setTasks] = useState([
        { id: 1, title: "Add tests to homepage" },
        { id: 2, title: "Fix styling in about section" },
        { id: 3, title: "Learn how to center a div" },
    ]);

    const addTask = (title) =>
        setTasks((tasks) => [...tasks, { id: tasks.length + 1, title: title }]);

    const getTaskPosition = (id) => tasks.findIndex((task) => task.id === id);

    function handleDragEnd(event) {
        const { active, over } = event;
        if (active.id === over.id) {
            return;
        }

        setTasks((tasks) => {
            const originalPos = getTaskPosition(active.id);
            const newPos = getTaskPosition(over.id);

            return arrayMove(tasks, originalPos, newPos);
        });
    }

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    return (
        <div className="tasks-page">
            <h1>My Tasks ☑️</h1>
            <DndContext
                sensors={sensors}
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}>
                <Input onSubmit={addTask} />
                <Column tasks={tasks} />
            </DndContext>
        </div>
    );
}

export default TasksPage;
