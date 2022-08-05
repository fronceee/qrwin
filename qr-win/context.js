import { createContext, useContext, useState } from "react";

const appContext = createContext()

export function AppWrapper(props) {

    const [ppId, setPpId] = useState("test")
    const [prices, setPrices] = useState([
        15, 20, 25, 30, 35, 40, 45, 50, 55, 60
    ])

    const [currentPrice, setCurrentPrice] = useState(0)

    function setId(newId) {
        setPpId(newId)
    }

    return (
        <appContext.Provider value={
                {
                    id:ppId,
                    setId:setId,
                    prices:prices,
                    setPrices:setPrices,
                    currentPrice:currentPrice,
                    setCurrentPrice:setCurrentPrice
                }
            }>
            {props.children}
        </appContext.Provider>
    )
}

export function useAppContext() {
    return useContext(appContext)
}