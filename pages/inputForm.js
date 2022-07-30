import { useAppContext } from "../context"


export default function inputForm(props) {
    const [ppId, setPpId] = useState("")
    const contextId = useAppContext().id
    const contextSetId = useAppContext().setId
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

    return (
        <div className={styles.container}>
            <form className={styles.qrId} onSubmit={handleSubmit}>
                <h1>Enter your promptPay Id:</h1>
                <input value={ppId} onChange={handleOnChange} type="number"></input>
                <button type="submit">Submit</button>
            </form>  
        </div>
    )
}