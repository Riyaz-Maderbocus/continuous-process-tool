import { DragDropProvider } from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";

import SortableColumn from "./SortableColumn";

const ChromatographyOperation = ({
    columns,
    updateColumns,
    removeColumn,
    updateColumn,
    updateColumnSteps,
    updateStep,
    addStep,
    removeStep
}) => {

    const handleDragEnd = (event) => {

        console.log("Drag ended:", event);

        if (event.canceled) {
            return;
        }

        const operation = event.operation;

        if (!operation) {
            return;
        }

        const source = operation.source;

        if (!source) {
            return;
        }

        if (!isSortable(source)) {
            return;
        }

        const {
            initialIndex,
            index
        } = source;

        console.log("Dragged column:", source.id);
        console.log("Initial index:", initialIndex);
        console.log("New index:", index);

        // Nothing changed
        if (initialIndex === index) {
            return;
        }

        // Make a copy
        const newColumns = [...columns];

        // Remove column from old position
        const [movedColumn] = newColumns.splice(
            initialIndex,
            1
        );

        // Insert it at new position
        newColumns.splice(
            index,
            0,
            movedColumn
        );

        // Give the new array back to FTChromUpdateForm
        updateColumns(newColumns);
        console.log("NEW COLUMN ORDER",
            newColumns.map(column => column.id)
        )
    };

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>

            <div className="chromatography-columns">

                {columns.map((column, index) => (
                    <SortableColumn
                        key={column.id}
                        column={column}
                        index={index}
                        removeColumn={removeColumn}
                        updateColumn={updateColumn}
                        updateColumnSteps={updateColumnSteps}
                        updateStep={updateStep}
                        addStep={addStep}
                        removeStep={removeStep}
                    />
                ))}

            </div>

        </DragDropProvider>
    );
};

export default ChromatographyOperation;