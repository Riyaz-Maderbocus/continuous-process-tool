import { createContext, useState, useEffect, useContext } from "react";

export const UnitOperationContext = createContext();

export function UnitOperationProvider({children}) {
    const [unitOperations, setUnitOperations] = useState([1,2,3,4])

    // const addUnitOperation = (newUnitOperation) => {

    // }

    const addUnitOperation = () => {
        setUnitOperations((prev)=> {
            const newUnitOperation = Date.now();
            console.log(newUnitOperation)
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