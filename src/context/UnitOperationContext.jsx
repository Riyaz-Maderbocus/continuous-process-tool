import { createContext, useState, useEffect, useContext } from "react";

export const UnitOperationContext = createContext();


// unitOperationCardSchema
//{ id: id,
// title: "string",
// type: "selection",
// data: {
//     bits
// }}
export function UnitOperationProvider({children}) {
    // const [unitOperations, setUnitOperations] = useState([1,2,3,4])
    const [unitOperations, setUnitOperations] = useState([
        {id: 1, title: "An operation", type: "chromatography", data: {
            column: "big one",
            col_length: 10,
            area: 5
        }},
        {id: 2, title: "A second operation", type: "buffer", data: {
            solvent: "Water",
            solute: "NaCl"
        }},
    
    ])

    // const addUnitOperation = (newUnitOperation) => {

    // }

    // const addUnitOperation = () => {
    //     setUnitOperations((prev)=> {
    //         const newUnitOperation = Date.now();
    //         console.log(newUnitOperation)
    //         return [...prev, newUnitOperation]
    //     })
    // }
    const addUnitOperation = () => {
        setUnitOperations((prev)=> {
            const newUnitOperation = {
                id: Date.now(),
                title: "A new item",
                type: "generic",
                data: {
                    content: "I am new"
                }
            }
            // console.log(newUnitOperation)
            return [...prev, newUnitOperation]
        })
    }

    return (
        <UnitOperationContext.Provider value={{unitOperations, setUnitOperations, addUnitOperation}}>
            {children}
        </UnitOperationContext.Provider>
    )
}

export function useUnitOperations() {
    return useContext(UnitOperationContext)
}