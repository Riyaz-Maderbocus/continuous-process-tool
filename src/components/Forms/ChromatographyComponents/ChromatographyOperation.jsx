import { DragDropProvider } from "@dnd-kit/react";
import { useSortable } from "@dnd-kit/react/sortable";

import SortableColumn from "./SortableColumn";

const ChromatographyOperation = ({
    columns,
    updateColumns,
    removeColumn
}) => {

    const handleDragEnd = (event) => {
        const { source } = event;

        if (!source) return;

        console.log("Dragged column:", source.id);

        // We'll implement reordering here
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