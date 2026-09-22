import { DragDropProvider } from "@dnd-kit/react";

import ChromatographyColumn from "./ChromatographyColumn";

const ChromatographyOperation = ({
    columns,
    onStepsChange
}) => {

    const handleDragEnd = (event) => {
        console.log(event);
    };

    return (
        <DragDropProvider
            onDragEnd={handleDragEnd}
        >

            <div className="chromatography-columns">

                {columns.map((column) => (
                    <ChromatographyColumn
                        key={column.id}
                        column={column}
                        onStepsChange={onStepsChange}
                    />
                ))}

            </div>

        </DragDropProvider>
    );
};

export default ChromatographyOperation;