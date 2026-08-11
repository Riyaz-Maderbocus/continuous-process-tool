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
        {id: 8, title: "FT Chrom", type: "ftchrom", typeFormatted: "Flowthrough Chromatography", data: {
            columnSizeRecommendation: {
                inputFlowRate: 0.7,
                inputConc: 9.17,
                loadRate: 6.42,
                noColumns: 1,
                residenceTime: 11.43,
                maxLoadChallenge: 2400,
                requiredColumnVol: 8,
                maxLoadVol: 2093.8,
                maxLoopTimeOneColumn: 2991.1,
                maxCycleTimeAllColumns: 2991.1,
            },

            columnDimensionsCalculator: {
                columnVol: 8,
                columnDiameter: 7.7,
                bedHeight: 0.2,
                linearFlowRate: 0.9,
                maxLoadVol: 2094,
            },

            massBalance: {
                predictedYield: 92,
                outputConc: 8.44,
            },

  
            chromatographyOperation: {
                columnOne: {
                    name: "Column 1",
                    steps: [
                        {step: "Sample application",
                            buffer: "Feed",
                            flowRate: 0.7,
                            residenceTime: 11.4,
                            volCV: 250,
                            volML: 2000,
                            timeMin: 2857.1
                        }
                    ]
                },
                columnTwo: {
                    name: "Column 2",
                    steps: [
                        {step: "",
                            buffer: "",
                            flowRate: 0,
                            residenceTime: 0,
                            volCV: 0,
                            volML: 0,
                            timeMin: 0
                        }
                    ],
                    hold: 0,
                    nextColTotal: 0,
                    idle: 2857.1 
                },
                columnThree: {
                    name: "Column 3",
                    steps: [
                        {step: "",
                            buffer: "",
                            flowRate: 0,
                            residenceTime: 0,
                            volCV: 0,
                            volML: 0,
                            timeMin: 0
                        }
                    ],
                    hold: 0,
                    nextColTotal: 0,
                    idle: 2857.1 
                },
            },
            
            summary: {
                loopTimeMin: 2857.1,
                loopTimeH: 47.62,
                loopTimeLimit: "Column 1",
                loadChallenge: 2292.50,
                outputFlowRateMLMin: 0.7,
                outputFlowRateLH: 0.04,
            }, 

            bufferVolumes: [
                {   
                    buffer: "Feed",
                    volPerLoopML: 2000,
                    volPerDayL: 1.01,
                    totalVolL: 30.2
                }
            ],

            columnLifetime: {
                noCycles: 1,
                columnLifetimeH: 47.6,
                columnLifetimeD: 2,
                noColumnsRequired: 16
            }


        }
        },
        {id: 7, title:"Viral Inactivation", type: "vi", typeFormatted: "Viral Inactivation", data:{
            feedAverageFlowRate: 0.5,
            feedFlowRateSetpoint: 2,
            feedVolume: 250,
            feedTime: 125,
            acidFlowRate: 20,
            acidVolume: 37.5,
            acidTime: 1.875,
            holdTime: 30,
            baseFlowRate: 20,
            baseVolume: 30,
            baseTime: 1.5,
            tankFlowRate: 1,
            tankTime: 317.5,
            tankAverageFlowRate: 0.7,
            totalTankVolume: 317.5,
            totalCycleTime: 475.9,
            bufferAcidVolPerLoop: 37.5,
            bufferAcidVolPerDay: 0.11,
            bufferAcidTotalVol: 3.4,
            bufferBaseVolPerLoop: 30,
            bufferBaseVolPerDay: 0.09,
            bufferBaseTotalVol: 2.72,
            inputConc: 11.64,
            predictedYield: 100,
            outputConc: 9.17
        }},
        {id: 6, title: "ILDF", type: "ildf", typeFormatted: "ILDF", data: {
            singleFilterArea: 88,
            noFilters: 2,
            totalFilterArea: 176,
            feedFlowRate: 5,
            bufferFlowRatemlmin: 2,
            bufferFlowRateLh: 0.12,
            bufferFlowRateLday: 2.88,
            permeateFlux: 6.8,
            inputConc: 2,
            predictedYield: 99,
            outputConc: 1.98,
            totalBufferVolume: 86.4
        }},
        {id: 5, title: "ILC", type: "ilc", typeFormatted: "ILC", data: {
            singleFilterArea: 88,
            noFilters: 3,
            totalFilterArea: 264,
            feedFlowRate: 0.7,
            retentateFlowRate: 0.5,
            permeateFlowRatemlmin: 0.2,
            permeateFlowRateLh: 0.012,
            permeateFlux: 0.5,
            inputConc: 2,
            predictedYield: 99,
            outputConc: 2.772
        }},
        {id: 4, title: "Filtration operation", type: "filtration", typeFormatted: "Filtration", data: {
            filterType: "DoHC",
            filterArea: 0.1,
            flowRate: 2.8,
            flux: 1.68,
            filterCapacity: 150,
            lifetime: 89.29,
            noFilters: 13,
            inputConc: 2,
            predictedYield: 99,
            outputConc: 1.98,

        }},
        {id: 3, title:"Bioreactor One", type: "bioreactor", typeFormatted:"Bioreactor", data: {
            vesselVolume: 2.5,
                    vvd: 2,
                    flowRatemlmin: 3.47,
                    flowRatelh: 0.21,
                    titremgml: 2,
                    titremgmin: 6.94
        }},    
    ])

    const time = {
        totalDays: 30
    }

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
            if (type === "chromatography"){
                typeFormatted = "Chromatography"
                data = {
                    content: "I am new"
                }

            } else if (type === "surgeTank"){
                typeFormatted = "Surge Tank"
                data = {
                    content: "I am new"
                }
            } else if (type === "bioreactor") {
                typeFormatted = "Bioreactor"
                data = {
                    vesselVolume: 0,
                    vvd: 0,
                    flowRatemlmin: 0,
                    flowRatelh: 0,
                    titremgml: 0,
                    titremgmin: 0,
       

                }

            } else if (type === "filtration") {
                typeFormatted = "Filtration"
                                data = {
                    filterType: "",
                    filterArea: 0,
                    flowRate: 0,
                    flux: 0,
                    filterCapacity: 0,
                    lifetime: 0,
                    nofilters: 0,
                    inputConc: 0,
                    predictedYield: 0,
                }
            } else if (type === "ilc"){
                typeFormatted= "ILC", 
                data= {
                    singleFilterArea: 0,
                    noFilters: 0,
                    totalFilterArea: 0,
                    feedFlowRate: 0,
                    retentateFlowRate: 0,
                    permeateFlowRatemlmin: 0,
                    permeateFlowRateLh: 0,
                    permeateFlux: 0,
                    inputConc: 0,
                    predictedYield: 0,
                    outputConc: 0
                }
            } else if (type === "ildf"){
                typeFormatted = "ILDF",
                data= {
                    singleFilterArea: 0,
                    noFilters: 0,
                    totalFilterArea: 0,
                    feedFlowRate: 0,
                    bufferFlowRatemlmin: 0,
                    bufferFlowRateLh: 0,
                    bufferFlowRateLday: 0,
                    permeateFlux: 0,
                    inputConc: 0,
                    predictedYield: 0,
                    outputConc: 0,
                    totalBufferVolume: 0,
                }
            } else if (type === "vi"){
                typeFormatted = "Viral Inactivation" 
                data = {
                    feedAverageFlowRate: 0,
                    feedFlowRateSetpoint: 0,
                    feedVolume: 0,
                    feedTime: 0,
                    acidFlowRate: 0,
                    acidVolume: 0,
                    acidTime: 0,
                    holdTime: 0,
                    baseFlowRate: 0,
                    baseVolume: 0,
                    baseTime: 0,
                    tankFlowRate: 0,
                    tankTime: 0,
                    tankAverageFlowRate: 0,
                    totalTankVolume: 0,
                    totalCycleTime: 0,
                    bufferAcidVolPerLoop: 0,
                    bufferAcidVolPerDay: 0,
                    bufferAcidTotalVol: 0,
                    bufferBaseVolPerLoop: 0,
                    bufferBaseVolPerDay: 0,
                    bufferBaseTotalVol: 0,
                    inputConc: 0,
                    predictedYield: 0,
                    outputConc: 0
        }} else if (type === "sptff") {
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

    // Update unit operation data

    const updateUnitOperationData = (id, title, data) => {
    // const confirmUpdate = window.confirm(
    //     "Are you sure you want to update the unit operation?"
    // );

    // if (!confirmUpdate) return;

    setUnitOperations(previousUnitOperations =>
        previousUnitOperations.map(unitOperation => {
            if (unitOperation.id === id) {
                return {
                    ...unitOperation,
                    title,
                    data
                };
            }

            return unitOperation;
        })
    );
};

    return (
        <UnitOperationContext.Provider value={{unitOperations, setUnitOperations, addUnitOperation, 
        removeAllUnitOperations, removeUnitOperation, updateUnitOperationData, time}}>
            {children}
        </UnitOperationContext.Provider>
    )
}

export function useUnitOperations() {
    return useContext(UnitOperationContext)
}