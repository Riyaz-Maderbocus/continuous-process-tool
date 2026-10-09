import { useSortable } from "@dnd-kit/react/sortable";

const SortableStep = ({ step, index }) => {
    const {
        ref,
        isDragSource,
        handleRef
    } = useSortable({
        id: step.id,
        index
    });

    return (
        <div
            ref={ref}
            className={`chromatography-step ${
                isDragSource ? "step-dragging" : ""
            }`}
        >
            <button
                type="button"
                ref={handleRef}
                className="step-drag-handle"
                aria-label={`Reorder ${step.step}`}
            >
                ⠿
            </button>

            <span>{step.step}</span>

            {/* Your step input fields can go here */}
        </div>
    );
};
 
export default SortableStep;