import { DragDropProvider } from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";
import { useState } from "react";
import FormTextInput from "../FormComponents/FormTextInput";
import FormNumberInputSmall from "../FormComponents/FormNumberInputSmall";
import SortableStep from "./SortableStep";
import StepTableHeaders from "./ChromatographyFormComponents/StepTableHeaders";

const SortableColumn = ({ 
    column,
    recommendedVol, 
    removeColumn, 
    index, 
    updateColumn,
    updateColumnSteps,
    updateStep,
    addStep,
    removeStep
 }) => {

    const {ref, isDragSource, handleRef} = useSortable({
        id: column.id, 
        index
    });

    const handleStepDragEnd = (event) => {
        if (event.canceled) return;

        const source = event.operation?.source;

        if (!source || !isSortable(source)) return;

        const { initialIndex, index: newIndex } = source;

        if (initialIndex === newIndex) return;

        const newSteps = [...column.steps];

        const [movedStep] = newSteps.splice(initialIndex, 1);

        if (!movedStep) return;

        newSteps.splice(newIndex, 0, movedStep);

        updateColumnSteps(column.id, newSteps);
    };

    // 131026 base col vol for calculations
    // let baseColVol = 1;
    const [baseColVol, setBaseColVol] = useState(recommendedVol ?? 1)

    // 131026 base col vol setter by input box update
    const updatebaseColVol = (e) => {
        setBaseColVol(
            e.target.value === "" ? "" : Number(e.target.value)
        );
    }

    // NEW FUNCTION TO HANDLE BASECOLVOL CHANGE 131026
    const handleBaseColVolChange = (rawValue) => {
            const newBaseVol = rawValue === "" ? "" : Number(rawValue);

            // Update the column volume input
            setBaseColVol(newBaseVol);

            // Only calculate with a valid, positive column volume
            if (newBaseVol === "" || !Number.isFinite(newBaseVol) || newBaseVol <= 0) {
                return;
            }

            // Recalculate all steps in this column
            const updatedSteps = column.steps.map(step => {
                const flowRate = Number(step.flowRate);
                const volCV = Number(step.volCV);

                const volML =
                    Number.isFinite(volCV) && volCV >= 0
                        ? newBaseVol * volCV
                        : NaN;

                const residenceTime =
                    Number.isFinite(flowRate) && flowRate > 0
                        ? newBaseVol / flowRate
                        : NaN;

                const timeMin =
                    Number.isFinite(volML) &&
                    Number.isFinite(flowRate) &&
                    flowRate > 0
                        ? volML / flowRate
                        : NaN;

                return {
                    ...step,
                    volML: Number.isFinite(volML) ? Number(volML.toFixed(3)) : "",
                    residenceTime: Number.isFinite(residenceTime)
                        ? Number(residenceTime.toFixed(3))
                        : "",
                    timeMin: Number.isFinite(timeMin)
                        ? Number(timeMin.toFixed(3))
                        : ""
                };
            });

            updateColumnSteps(column.id, updatedSteps);
        };
    return (
        <div
            ref={ref}
            className={`chromatography-column ${
                isDragSource ? "column-dragging" : ""
            }`}
        >
            <div className="sortable-column-drag-handle-container">
                <button type="button"
                ref={handleRef}
                className="sortable-column-drag-handle">
                    {/* ⋮⋮ */}
                    
                    <img src="./src/assets/ellipsis-h-icon.svg" alt="" 
                    className="sortable-column-drag-handle-image"/>
                </button>
            </div>

            <div className="chromatography-column-header">

                <h3>{column.name}</h3>

            <FormTextInput 
                name="column-name-change"
                value={column.name}
                onChange={(e) =>
                    updateColumn(
                        column.id,
                        "name",
                        e.target.value
                    )
                }
            />

            {/* Column volume change calculator */}
            <div className="">
                <FormNumberInputSmall
                    label="Calculated Column Volume"
                    name="base-column-vol"
                    value={baseColVol}
                    // onChange={(e)=> {
                    //     console.log("changed")
                    // }}
                    onChange={(e) => handleBaseColVolChange(e.target.value)}
                />

                {/* Copy value button */}
                <button
                type="button"
                onClick={()=> handleBaseColVolChange(recommendedVol ?? 1)}
                >Set As Calculated Value</button>
            </div>
            </div>

            <DragDropProvider onDragEnd={handleStepDragEnd}>
                <div className="chromatography-steps">
                    <StepTableHeaders />
                    {column.steps.map((step, stepIndex) => (
                        <SortableStep
                            key={step.id}
                            step={step}
                            index={stepIndex}
                            columnId={column.id}
                            updateStep={updateStep}
                            removeStep={removeStep}
                            baseColVol={baseColVol}
                        />
                    ))}

                </div>
            </DragDropProvider> 

            {/* Add step button */}
            <div>
                <button
                    type="button"
                    onClick={() => addStep(column.id)}
                >
                    + Add step
                </button>
            </div>

            {/* Remove column button */}
            <div>
                <button
                    type="button"
                    onClick={() => removeColumn(column.id)}
                >
                    🗑️ Remove this column
                </button>
            </div>


        </div>
    );
};

export default SortableColumn;