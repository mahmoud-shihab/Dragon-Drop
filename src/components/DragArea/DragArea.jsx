import "./DragArea.scss";
import {
    DndContext,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { createSnapModifier } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

function DragArea() {
    const gridSize = 20; // pixels
    const snapToGridModifier = createSnapModifier(gridSize);
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor)
    );

    return (
        <div className="drag-area">
            <DndContext
                modifiers={[snapToGridModifier]}
                sensors={sensors}></DndContext>
        </div>
    );
}

export default DragArea;
