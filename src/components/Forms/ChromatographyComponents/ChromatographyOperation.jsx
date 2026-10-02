import { DragDropProvider } from "@dnd-kit/react";
import { useSortable, isSortable } from "@dnd-kit/react/sortable";

import SortableColumn from "./SortableColumn";

const ChromatographyOperation = ({
    columns,
    updateColumns,
    removeColumn
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
    };

    return (
        <DragDropProvider onDragEnd={handleDragEnd}>

            <div className="chromatography-columns">

                {columns.map((column) => (
                    <SortableColumn
                        key={column.id}
                        column={column}
                        removeColumn={removeColumn}
                    />
                ))}

            </div>

        </DragDropProvider>
    );
};

export default ChromatographyOperation;