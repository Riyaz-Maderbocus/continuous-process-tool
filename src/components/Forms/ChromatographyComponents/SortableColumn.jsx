import { DragDropProvider } from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";
import FormTextInput from "../FormComponents/FormTextInput";
import SortableStep from "./SortableStep";
import StepTableHeaders from "./ChromatographyFormComponents/StepTableHeaders";

const SortableColumn = ({ 
    column, 
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