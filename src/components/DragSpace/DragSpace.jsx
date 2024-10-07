import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Modal from "react-modal";
import { v4 as uuidv4 } from "uuid"; // Import uuid
import axios from "axios";
import "./DragSpace.scss";
import ModalWindow from "../ModalWindow/ModalWindow";
import AddNewBoxButton from "../AddNewBoxButton/AddNewBoxButton";
import DragBox from "../DragBox/DragBox";
import {
    DndContext,
    useSensors,
    useSensor,
    MouseSensor,
    TouchSensor,
} from "@dnd-kit/core";
import { createSnapModifier } from "@dnd-kit/modifiers";

const gridSize = 100; // Size of the grid squares
const containerWidth = 1000; // Width of the container div
const containerHeight = 1000; // Height of the container div
const containerPadding = 10;

Modal.setAppElement("#root"); // Necessary for accessibility

function clampPos(box, delta, boxes) {
    let x = box.position.x + delta.x;
    let y = box.position.y + delta.y;

    // Check boundaries
    x = Math.min(Math.max(x, 0), containerWidth - box.size.width * gridSize);
    y = Math.min(Math.max(y, 0), containerHeight - box.size.height * gridSize);

    // Collision detection with other boxes
    const newPosition = { x, y };
    for (let otherBox of boxes) {
        if (
            otherBox.id !== box.id &&
            isColliding(newPosition, box.size, otherBox)
        ) {
            return box.position; // Revert to the original position if there's a collision
        }
    }

    return newPosition;
}

function isColliding(position, size, otherBox) {
    const otherBoxPos = otherBox.position;
    const otherBoxSize = otherBox.size;

    return !(
        position.x + size.width * gridSize <= otherBoxPos.x ||
        position.x >= otherBoxPos.x + otherBoxSize.width * gridSize ||
        position.y + size.height * gridSize <= otherBoxPos.y ||
        position.y >= otherBoxPos.y + otherBoxSize.height * gridSize
    );
}

function findOpenPosition(newBoxSize, boxes) {
    const maxX = containerWidth - newBoxSize.width * gridSize;
    const maxY = containerHeight - newBoxSize.height * gridSize;

    for (let y = 0; y <= maxY; y += gridSize) {
        for (let x = 0; x <= maxX; x += gridSize) {
            const position = { x, y };
            const collision = boxes.some((box) =>
                isColliding(position, newBoxSize, box)
            );
            if (!collision) {
                return position;
            }
        }
    }
    return { x: 0, y: 0 }; // Fallback to (0, 0) if no space is found
}

function DragSpace() {
    const params = useParams();
    const [boxes, setBoxes] = useState([]);

    async function getSheet() {
        const { data } = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/api/v1/sheets/${params.sheetID}`
        );
        setBoxes(data.character_sheet);
    }

    useEffect(() => {
        if (params.sheetID !== undefined) {
            getSheet();
        } else {
            setBoxes([]);
        }
    }, [params.sheetID]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBox, setSelectedBox] = useState(null);
    const [boxText, setBoxText] = useState("");
    const [boxWidth, setBoxWidth] = useState(1);
    const [boxHeight, setBoxHeight] = useState(1);
    const [boxType, setBoxType] = useState("name");
    const [skillSettings, setSkillSettings] = useState({
        skillName: "",
        diceCount: 1,
        diceType: 6,
        modifier: 0,
    });
    const sensors = useSensors(
        useSensor(MouseSensor, {
            activationConstraint: {
                distance: 5,
            },
        }),
        useSensor(TouchSensor)
    );

    const addBox = () => {
        const newBoxSize = { width: 1, height: 1 };
        const newBoxPosition = findOpenPosition(newBoxSize, boxes);

        const newBox = {
            id: uuidv4(),
            position: newBoxPosition,
            size: newBoxSize,
            content: "", // Default empty content
            type: "name",
        };

        setBoxes((prevBoxes) => [...prevBoxes, newBox]);

        // Set the newly created box as the selected box
        setSelectedBox(newBox);
        setBoxType(newBox.type);
        setBoxText(newBox.content);
        setBoxWidth(newBox.size.width);
        setBoxHeight(newBox.size.height);

        // Open the modal
        setIsModalOpen(true);
    };

    const handleDragEnd = (event) => {
        const { id } = event.active;
        const { delta } = event;

        if (!delta) return; // Ensure delta exists

        setBoxes((prevBoxes) =>
            prevBoxes.map((box) =>
                box.id.toString() === id
                    ? {
                          ...box,
                          position: clampPos(box, delta, prevBoxes),
                      }
                    : box
            )
        );
    };

    const handleBoxDoubleClick = (id) => {
        const box = boxes.find((box) => box.id === id);
        setSelectedBox(box);
        setBoxType(box.type);
        if (box.type === "skill") {
            setSkillSettings(box.content);
        } else {
            setBoxText(box.content);
        }
        setBoxWidth(box.size.width);
        setBoxHeight(box.size.height);
        setIsModalOpen(true);
    };

    const handleModalSave = () => {
        setBoxes((prevBoxes) =>
            prevBoxes
                .map((box) =>
                    box.id === selectedBox.id
                        ? {
                              ...box,
                              size: { width: boxWidth, height: boxHeight },
                              type: boxType,
                              content:
                                  boxType === "skill" ? skillSettings : boxText,
                          }
                        : box
                )
                .filter((box) => box.content !== "")
        );
        setIsModalOpen(false);
    };

    const handleDeleteBox = () => {
        setBoxes((prevBoxes) =>
            prevBoxes.filter((box) => box.id !== selectedBox.id)
        );
        setIsModalOpen(false);
    };

    const handleUpdateContent = (id, newContent) => {
        setBoxes((prevBoxes) =>
            prevBoxes.map((box) =>
                box.id === id ? { ...box, content: newContent } : box
            )
        );
    };

    const afterOpenModal = () => {};
    const closeModal = () => {
        setIsModalOpen(false);
        setBoxes((prevBoxes) => prevBoxes.filter((box) => box.content !== ""));
    };

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            modifiers={[createSnapModifier(gridSize)]} // Apply snap modifier globally
        >
            <div
                className="drag-space"
                style={{
                    width: `${containerWidth + containerPadding * 2}px`,
                    height: `${containerHeight + containerPadding * 2}px`,
                    position: "relative",
                    overflow: "hidden",
                    padding: `${containerPadding}px`,
                }}>
                {boxes?.map((box) => (
                    <DragBox
                        key={box.id}
                        id={box.id}
                        gridSize={gridSize}
                        containerWidth={containerWidth}
                        containerHeight={containerHeight}
                        position={box.position}
                        type={box.type}
                        size={box.size}
                        content={box.content}
                        onDoubleClick={handleBoxDoubleClick}
                        onUpdateContent={handleUpdateContent}
                    />
                ))}
            </div>
            <AddNewBoxButton handleAddBox={addBox} />
            <button type="button" onClick={() => console.log(boxes)}>
                Check Structure
            </button>

            <Modal
                className="Modal"
                overlayClassName="Overlay"
                isOpen={isModalOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Edit Box">
                <ModalWindow
                    handleModalSave={handleModalSave}
                    handleDeleteBox={handleDeleteBox}
                    gridSize={gridSize}
                    containerWidth={containerWidth}
                    containerHeight={containerHeight}
                    boxText={boxText}
                    setBoxText={setBoxText}
                    boxWidth={boxWidth}
                    setBoxWidth={setBoxWidth}
                    boxHeight={boxHeight}
                    setBoxHeight={setBoxHeight}
                    boxType={boxType}
                    setBoxType={setBoxType}
                    skillSettings={skillSettings}
                    setSkillSettings={setSkillSettings}
                />
            </Modal>
        </DndContext>
    );
}

export default DragSpace;
