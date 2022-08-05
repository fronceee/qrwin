import {useState, useEffect} from "react"
import styles from '../styles/Home.module.css'
import generatePayload from 'promptpay-qr'
import { useAppContext } from "../context"
import { toDataURL } from "qrcode"
import PriceCard from "../components/PriceCard"
import { v4 as uuidv4 } from "uuid"


export default function Home() {
  const contextId = useAppContext().id
  const setContextId = useAppContext().setId
  const currentPrice = useAppContext().currentPrice
  const prices = useAppContext().prices
  const [ppId, setPpId] = useState("")
  const [isIdFilled, setIsIdFilled] = useState(false)
  const [qr, setQr] = useState("")

  console.log(ppId)
  const renderedCards = prices.map(data => {
    return (
      <PriceCard 
        price={data}
        style={styles.pricecard}
        key={uuidv4()}
        >
      </PriceCard>
    )
  })

  useEffect(() => {
    if (contextId.length > 0) {
      setPpId(contextId)
      console.log("checked!")
    }
  },[isIdFilled])
  
  
  function handleOnChange(e) {
    setPpId(e.target.value)
  }


  function handleSubmit(e) {
    e.preventDefault()
    setContextId(ppId)
    if (ppId === "") (
      alert("Please Enter your ID!")
    );
    else {
      const payload = currentPrice ? generatePayload(ppId,{amount: currentPrice}) : generatePayload(ppId,{})
      toDataURL(payload, (err,url) => {
        if (err) {
          console.log(err)
        }else if (url){
          setQr(url)
        }
      })
      setIsIdFilled(true)
    }
  }

  return isIdFilled ? (
    <div className={styles.qrBox}>
      <h1>{ppId}</h1>
      <h2>Amount: {currentPrice}</h2>
      <img src={qr}/>
      <button onClick={() => {
        setPpId("")
        setIsIdFilled(false)
      }}>Back</button>
    </div>
  ) : (
    (
      <div className={styles.container}>
      <form className={styles.qrId} onSubmit={handleSubmit}>
        <h1>Enter your promptPay Id:</h1>
        <input value={ppId} onChange={handleOnChange} type="number"></input>
        <div className={styles.cardHolder}>
          {renderedCards}
        </div>
        <button type="submit">Next</button>
      </form>  
    </div>
    )
  )
}
