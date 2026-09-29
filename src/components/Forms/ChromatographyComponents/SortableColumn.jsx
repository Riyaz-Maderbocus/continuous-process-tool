import { useSortable } from "@dnd-kit/react/sortable";

const SortableColumn = ({ column, removeColumn }) => {

    const {
        ref,
        isDragSource
    } = useSortable({
        id: column.id
    });

    return (
        <div
            ref={ref}
            className={`chromatography-column ${
                isDragSource ? "column-dragging" : ""
            }`}
        >

            <div className="chromatography-column-header">

                <h3>{column.name}</h3>

                {/* <button type="button">
                    ⋮⋮
                </button> */}

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