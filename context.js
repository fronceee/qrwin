import { createContext, useContext, useState } from "react";

const appContext = createContext()

export function AppWrapper(props) {

    const [ppId, setPpId] = useState("test")

    function setId(newId) {
        setPpId(newId)
    }

    return (
        <appContext.Provider value={
            {id:ppId,
            setId:setId}
            }>
            {props.children}
        </appContext.Provider>
    )
}

export function useAppContext() {
    return useContext(appContext)
}