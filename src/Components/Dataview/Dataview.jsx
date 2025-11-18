import { useRef, useState,useEffect } from 'preact/compat';
import wallet from '../../assets/wallet.png';
import depositImg from '../../assets/deposit.jpg';
import vodafoneImg from '../../assets/vodafone.png';
import doneImg from '../../assets/done.jpg';
import './Dataview.css';


function Dataview(props) {
  const inputRef = useRef(null)
  const [dynamicWidth, setDynamicWidth] = useState(props.money.length *15)
  const [money, setMoney] = useState(props.money)

  useEffect(()=>{
    setDynamicWidth(props.money.length *15 )
    setMoney(props.money)

  },[props.money])

  const handleChange = (e) =>{
    if (e.target.value){
      props.handleMoneyChange(parseFloat(e.target.value))
      setDynamicWidth(e.target.value.toString().length *15 )
    }else{
      setDynamicWidth(30)
      props.handleMoneyChange(0)
    }
  }
  // Wallet/popup states
  const [showDeposit, setShowDeposit] = useState(false);
  const [showVodafone, setShowVodafone] = useState(false);
  const [showDone, setShowDone] = useState(false);
  const [vodNumber, setVodNumber] = useState('');
  const [screenshot, setScreenshot] = useState(null);

  const onWalletClick = () => {
    setShowDeposit(true);
  }

  const onDepositClick = () => {
    setShowDeposit(false);
    setShowVodafone(true);
  }

  const onConfirmPayment = () => {
    // simulate confirmation, show done image
    setShowVodafone(false);
    setShowDone(true);
    try { localStorage.setItem('seenLogin','1'); } catch(e){}
  }

  const onCloseDone = () => {
    setShowDone(false);
  }
  return (
    <>
      <div class=" d-flex money-container     rounded- mt-2 me-0 ">
        <img class="wallet"  src={wallet} width="55px" onClick={onWalletClick}></img>
        <div class="  money text-center    rounded-pill   " >
          <span>   ج.م  </span>
          <input type="text" min="0" pattern="^[1-9]\d*(?[\.]\d{3})?$" lang="en" value={props.money }  style={{ width: dynamicWidth, maxWidth:dynamicWidth }} onChange={handleChange}   class="total-input"/>
        </div> 
      </div>

      {showDeposit && (
        <div className="overlay" onClick={() => setShowDeposit(false)}>
          <img className="overlay-img" src={depositImg} alt="deposit" onClick={(e)=>{e.stopPropagation(); onDepositClick();}} />
        </div>
      )}

      {showVodafone && (
        <div className="overlay" onClick={() => setShowVodafone(false)}>
          <div className="vodafone-card" onClick={(e)=>e.stopPropagation()}>
            <img src={vodafoneImg} className="vodafone-logo" alt="vodafone" />
            <input className="text-input" placeholder="رقم فودافون كاش" value={vodNumber} onInput={(e)=>setVodNumber(e.target.value)} />
            <label className="upload-label">أضف سكرين شوت</label>
            <input type="file" accept="image/*" onChange={(e)=>setScreenshot(e.target.files && e.target.files[0])} />
            <button className="confirm-btn" disabled={!vodNumber} onClick={onConfirmPayment}>تأكيد الدفع</button>
          </div>
        </div>
      )}

      {showDone && (
        <div className="overlay">
          <div className="done-wrap">
            <button className="done-close" onClick={onCloseDone}>✖</button>
            <img src={doneImg} className="done-img" alt="done" />
          </div>
        </div>
      )}
    </>
  )
}

export default Dataview