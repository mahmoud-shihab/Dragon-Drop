import "./ModalWindow.scss"

function ModalWindow({
    handleModalSave,
    handleDeleteBox,
    gridSize,
    containerWidth,
    containerHeight,
    boxText,
    setBoxText,
    boxWidth,
    setBoxWidth,
    boxHeight,
    setBoxHeight,
    boxType,
    setBoxType,
    skillSettings,
    setSkillSettings,
}) {
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setBoxText(e.target.result); // Store the base64 string in the box content
            };
            reader.readAsDataURL(file); // Convert image to base64 string
        }
    };

    return (
        <form>
            <h2>Edit Box</h2>
            <div>
                <label>Type:</label>
                <select
                    value={boxType}
                    onChange={(e) => setBoxType(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="portrait">Portrait</option>
                    <option value="text">Text</option>
                    <option value="skill">Skill</option>
                </select>
            </div>
            {boxType === "name" && (
                <div>
                    <label>Text:</label>
                    <input
                        type="text"
                        value={boxText}
                        onChange={(e) => setBoxText(e.target.value)}
                    />
                </div>
            )}
            {boxType === "portrait" && (
                <div>
                    <label>Upload Image:</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload} // Handle image file upload
                    />
                </div>
            )}
            {boxType === "text" && (
                <div>
                    <label>Text:</label>
                    <textarea
                        className="modal-window__text-area"
                        value={boxText}
                        onChange={(e) => setBoxText(e.target.value)}
                        style={{ width: "100%" }}
                    />
                </div>
            )}
            {boxType === "skill" && (
                <div>
                    <div>
                        <label>Skill Name:</label>
                        <input
                            type="text"
                            value={skillSettings.skillName}
                            onChange={(e) =>
                                setSkillSettings({
                                    ...skillSettings,
                                    skillName: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <label>Number of Dice:</label>
                        <input
                            type="number"
                            value={skillSettings.diceCount}
                            onChange={(e) =>
                                setSkillSettings({
                                    ...skillSettings,
                                    diceCount: Number(e.target.value),
                                })
                            }
                            min={1}
                        />
                    </div>
                    <div>
                        <label>Type of Dice:</label>
                        <input
                            type="number"
                            value={skillSettings.diceType}
                            onChange={(e) =>
                                setSkillSettings({
                                    ...skillSettings,
                                    diceType: Number(e.target.value),
                                })
                            }
                            min={2}
                        />
                    </div>
                    <div>
                        <label>Modifier:</label>
                        <input
                            type="number"
                            value={skillSettings.modifier}
                            onChange={(e) =>
                                setSkillSettings({
                                    ...skillSettings,
                                    modifier: Number(e.target.value),
                                })
                            }
                        />
                    </div>
                </div>
            )}
            <div>
                <label>Width (in grid units):</label>
                <input
                    type="number"
                    value={boxWidth}
                    onChange={(e) => setBoxWidth(Number(e.target.value))}
                    min={1}
                    max={Math.floor(containerWidth / gridSize)}
                />
            </div>
            <div>
                <label>Height (in grid units):</label>
                <input
                    type="number"
                    value={boxHeight}
                    onChange={(e) => setBoxHeight(Number(e.target.value))}
                    min={1}
                    max={Math.floor(containerHeight / gridSize)}
                />
            </div>
            <button type="button" onClick={handleModalSave}>
                Save
            </button>
            <button
                type="button"
                onClick={handleDeleteBox}
                style={{
                    marginLeft: "10px",
                    backgroundColor: "red",
                    color: "white",
                }}>
                Delete
            </button>
        </form>
    );
}

export default ModalWindow;
