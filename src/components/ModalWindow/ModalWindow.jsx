import "./ModalWindow.scss"; //TODO: Fix Styling

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
        <form className="modal-window" >
            <h2 className="modal-window__heading">Edit Box</h2>
            <div className="modal-window__input-space modal-window__input-space--dimensions">
                <div className="modal-window__input-space">
                    <label htmlFor="width" className="modal-window__label">
                        Width (in grid units):
                    </label>
                    <input
                        id="width"
                        type="number"
                        value={boxWidth}
                        onChange={(e) => setBoxWidth(Number(e.target.value))}
                        min={1}
                        max={Math.floor(containerWidth / gridSize)}
                    />
                </div>
                <div className="modal-window__input-space">
                    <label htmlFor="height" className="modal-window__label">
                        Height (in grid units):
                    </label>
                    <input
                        id="height"
                        type="number"
                        value={boxHeight}
                        onChange={(e) => setBoxHeight(Number(e.target.value))}
                        min={1}
                        max={Math.floor(containerHeight / gridSize)}
                    />
                </div>
            </div>
            <div className="modal-window__input-space">
                <label className="modal-window__label" htmlFor="type">
                    Type:
                </label>
                <select
                    id="type"
                    value={boxType}
                    onChange={(e) => setBoxType(e.target.value)}>
                    <option value="name">Name</option>
                    <option value="portrait">Portrait</option>
                    <option value="text">Text</option>
                    <option value="skill">Skill</option>
                </select>
            </div>
            {boxType === "name" && (
                <div className="modal-window__input-space">
                    <label htmlFor="name" className="modal-window__label">
                        Text:
                    </label>
                    <input
                        id="name"
                        type="text"
                        value={boxText}
                        onChange={(e) => setBoxText(e.target.value)}
                    />
                </div>
            )}
            {boxType === "portrait" && (
                <div className="modal-window__input-space">
                    <label htmlFor="image" className="modal-window__label">
                        Upload Image:
                    </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload} // Handle image file upload
                    />
                </div>
            )}
            {boxType === "text" && (
                <div className="modal-window__input-space">
                    <label htmlFor="text" className="modal-window__label">
                        Text:
                    </label>
                    <textarea
                        id="text"
                        className="modal-window__text-area"
                        value={boxText}
                        onChange={(e) => setBoxText(e.target.value)}
                    />
                </div>
            )}
            {boxType === "skill" && (
                <div className="modal-window__input-space modal-window__input-space--skills">
                    <div className="modal-window__input-space">
                        <label htmlFor="skill-name" className="modal-window__label">
                            Skill Name:
                        </label>
                        <input
                            id="skill-name"
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
                    <div className="modal-window__input-space">
                        <label htmlFor="dice-count" className="modal-window__label">
                            Number of Dice:
                        </label>
                        <input
                            id="dice-count"
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
                    <div htmlFor="dice-type" className="modal-window__input-space">
                        <label className="modal-window__label">
                            Type of Dice:
                        </label>
                        <input
                            id="dice-type"
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
                    <div className="modal-window__input-space">
                        <label htmlFor="modifier" className="modal-window__label">Modifier:</label>
                        <input
                            id="modifier"
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
            <div className="modal-window__buttons">
                <button
                    className="modal-window__button modal-window__button--save"
                    type="button"
                    onClick={handleModalSave}>
                    Save
                </button>
                <button
                    type="button"
                    className="modal-window__button modal-window__button--delete"
                    onClick={handleDeleteBox}>
                    Delete
                </button>
            </div>
        </form>
    );
}

export default ModalWindow;
