import { useDraggable } from "@dnd-kit/core";
import { restrictToParentElement } from "@dnd-kit/modifiers";
import "./DragBox.scss";

function DragBox({
    gridSize,
    containerWidth,
    containerHeight,
    id,
    position,
    type,
    size,
    content,
    onDoubleClick,
    onUpdateContent,
}) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: id.toString(),
        modifiers: [restrictToParentElement], // Apply restriction to parent element
    });

    const finalX = transform
        ? Math.min(
              Math.max(position.x + transform.x, 0),
              containerWidth - size.width * gridSize
          )
        : position.x;
    const finalY = transform
        ? Math.min(
              Math.max(position.y + transform.y, 0),
              containerHeight - size.height * gridSize
          )
        : position.y;

    const style = {
        transform: `translate3d(${finalX}px, ${finalY}px, 0)`,
        width: `${size.width * gridSize}px`,
        height: `${size.height * gridSize}px`,
    };

    const rollDice = (numberOfDice, typeOfDice, modifier) => {
        let total = 0;
        for (let i = 0; i < numberOfDice; i++) {
            total += Math.floor(Math.random() * typeOfDice) + 1;
        }
        let result = total + modifier;
        console.log(result);
        return `${total}+${modifier}=${result}`;
    };

    const handleSkillClick = (e) => {
        // console.log("Test")
        // e.stopPropagation(); // Stop event propagation to prevent triggering drag
        alert(
            `Result: ${rollDice(
                content.diceCount,
                content.diceType,
                content.modifier
            )}`
        );
    };

    const handleTextChange = (e) => {
        onUpdateContent(id, e.target.value);
    };

    return (
        <div
            className={`drag-box drag-box__${type}`}
            ref={setNodeRef}
            style={style}
            onClick={()=>console.log("Test")}
            onDoubleClick={() => onDoubleClick(id)}
            {...listeners}
            {...attributes}>
            {type === "name" && <p>{content}</p>}
            {type === "portrait" && content && (
                <img
                    src={content}
                    alt="Character"
                    style={{ width: "100%", height: "100%" }}
                />
            )}
            {type === "text" && (
                <textarea
                    className="drag-box__text-area"
                    value={content}
                    onChange={handleTextChange}
                />
            )}
            {type === "skill" && (
                <button className="drag-box__skill-button" onPointerUp={handleSkillClick} >
                    {content.skillName}:{" "}
                    {content.modifier >= 0
                        ? `+${content.modifier}`
                        : content.modifier}
                </button>
            )}
        </div>
    );
}

export default DragBox;
