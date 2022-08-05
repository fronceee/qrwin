import { useAppContext } from "../context"
import styles from '../styles/Home.module.css'

export default function PriceCard(props){
    const updatePrice = useAppContext().setCurrentPrice
    const currentPrice = useAppContext().currentPrice

    return (
        <div className={`${props.style} ${currentPrice === props.price ? styles.selectedCard : ''}`} onClick={() => {
            updatePrice(props.price)
        }}>
            <p>{props.price}</p>
        </div>
    )
}