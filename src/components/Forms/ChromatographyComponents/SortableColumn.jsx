import { useSortable } from "@dnd-kit/react/sortable";
import FormTextInput from "../FormComponents/FormTextInput";

const SortableColumn = ({ 
    column, 
    removeColumn, 
    index, 
    updateColumn }) => {

    const {ref, isDragSource, handleRef} = useSortable({
        id: column.id, 
        index
    });

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

            <div className="chromatography-steps">

                {column.steps.map((step) => (
                    <div key={step.id}>
                        {step.step}
                    </div>
                ))}

            </div>

            <button
                type="button"
                onClick={() => removeColumn(column.id)}
            >
                ×
            </button>

        </div>
    );
};

export default SortableColumn;