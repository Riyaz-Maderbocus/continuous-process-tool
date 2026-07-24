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
        {id: 3, title:"Bioreactor One", type: "bioreactor", typeFormatted:"Bioreactor", data: {
            vesselVolume: 1,
                    vvd: 2,
                    flowRatemlmin: 3,
                    flowRatelh: 4,
                    titremgml: 5,
                    titremgmin: 6
        }},
        {id: 1, title: "An operation", type: "chromatography", typeFormatted: "Chromatography", data: {
            column: "big one",
            col_length: 10,
            area: 5
        }},
        {id: 2, title: "A second operation", type: "buffer", typeFormatted:"Buffer Tank", data: {
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

    // Original Add unit operation, still works
    // const addUnitOperation = () => {
    //     setUnitOperations((prev)=> {
    //         const newUnitOperation = {
    //             id: Date.now(),
    //             title: "A new item",
    //             type: "generic",
    //             data: {
    //                 content: "I am new"
    //             }
    //         }
    //         // console.log(newUnitOperation)
    //         return [...prev, newUnitOperation]
    //     })
    // }
    const addUnitOperation = (title, type) => {
        setUnitOperations((prev)=> {
            let typeFormatted = ""
            let data;
            if (type == "chromatography"){
                typeFormatted = "Chromatography"
                data = {
                    content: "I am new"
                }

            } else if (type == "surgeTank"){
                typeFormatted = "Surge Tank"
                data = {
                    content: "I am new"
                }
            } else if (type == "bioreactor") {
                typeFormatted = "Bioreactor"
                data = {
                    vesselVolume: 0,
                    vvd: 0,
                    flowRatemlmin: 0,
                    flowRatelh: 0,
                    titremgml: 0,
                    titremgmin: 0

                }

            } else if (type == "filtration") {
                typeFormatted = "Filtration"
                                data = {
                    content: "I am new"
                }
            } else if (type == "sptff") {
                typeFormatted = "SPTFF"
                                data = {
                    content: "I am new"
                }
            }
            const newUnitOperation = {
                id: Date.now(),
                title: title,
                type: type,
                typeFormatted,
                data
            }
            // console.log(newUnitOperation)
            return [...prev, newUnitOperation]
        })
    }

    const removeAllUnitOperations = () => {
        // alert user of their action

        const confirmDeleteAll = window.confirm("Are you sure you want to delete all unit operations?")

        // Delete all
        if (confirmDeleteAll) {
            setUnitOperations([])
        }
    }

    // Delete card by ID
    const removeUnitOperation =(id) => {
         const confirmDelete = window.confirm("Are you sure you want to delete this unit operation?")
         if (confirmDelete) {
            setUnitOperations(unitOperations.filter((unitOperation)=> unitOperation.id !== id))
         }
    }
 

    return (
        <UnitOperationContext.Provider value={{unitOperations, setUnitOperations, addUnitOperation, removeAllUnitOperations, removeUnitOperation}}>
            {children}
        </UnitOperationContext.Provider>
    )
}

export function useUnitOperations() {
    return useContext(UnitOperationContext)
}