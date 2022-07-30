import {useState} from "react"
import styles from '../styles/Home.module.css'
import generatePayload from 'promptpay-qr'
import { useAppContext } from "../context"
import { toDataURL } from "qrcode"

export default function Home() {
  const [ppId, setPpId] = useState("")
  const contextId = useAppContext().id
  const [isIdFilled, setIsIdFilled] = useState(false)
  const [qr, setQr] = useState("")
  
  
  function handleOnChange(e) {
    setPpId(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (ppId === "") (
      alert("Please Enter your ID!")
    );
    else {
      const payload = generatePayload(ppId,{})
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
        <button type="submit">Submit</button>
      </form>  
    </div>
    )
  )
}
