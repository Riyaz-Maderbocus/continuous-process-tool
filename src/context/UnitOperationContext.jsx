import { createContext, useState, useEffect, useContext } from "react";

export const UnitOperationContext = createContext();

export function UnitOperationProvider({children}) {
    const [unitOperations, setUnitOperations] = useState([1,2,3,4])

    return (
        <UnitOperationContext.Provider value={{unitOperations, setUnitOperations}}>
            {children}
        </UnitOperationContext.Provider>
    )
}

export function useUnitOperations() {
    return useContext(UnitOperationContext)
}