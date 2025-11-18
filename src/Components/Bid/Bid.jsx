import { useState } from 'preact/hooks';
import './Bid.css';
function Bid(props) {
    const [enteredMoney, setEnteredMoney] = useState('');
    const [error, setError] = useState('');
    // use money from props (passed from parent) rather than reading localStorage directly
    // robust numeric parsing: remove any non-digit/dot/minus characters
    const balance = Number(String(props.money || '0').replace(/[^0-9.-]+/g, '')) || 0;

    const watchChange = (e) =>{
      const v = e.currentTarget.value;
      // allow empty input
      if (v === '') {
        setEnteredMoney('');
        setError('');
        return;
      }
      // accept numbers only (allow decimal); clean formatting (e.g., remove commas)
      const cleaned = String(v).replace(/[^0-9.-]+/g, '');
      const num = Number(cleaned);
      if (Number.isNaN(num)) {
        setEnteredMoney(v);
        setError('');
        return;
      }
      // validation: cannot exceed balance
      if (num > balance) {
        setError('لا يوجد في حسابك رصيد كافي للرهان');
      } else if (num <= 0) {
        setError('المبلغ يجب أن يكون أكبر من 0');
      } else {
        setError('');
      }
      setEnteredMoney(String(cleaned));
      // debug
      console.log('Bid.watchChange:', { raw: v, cleaned, num, balance, error: (num>balance? 'insufficient': (num<=0? '<=0':'')) });
    }
    // props.handleMoneyChange(money)
    const handleSubmit = (e) =>{
      e.preventDefault();
      const num = Number(String(enteredMoney).replace(/[^0-9.-]+/g, ''));
      console.log('Bid.handleSubmit:', { enteredMoney, num, balance });
      if (!enteredMoney || Number.isNaN(num)) {
        setError('أدخل مبلغاً صالحاً');
        return;
      }
      if (num <= 0) {
        setError('المبلغ يجب أن يكون أكبر من 0');
        return;
      }
      if (num > balance) {
        setError('لا يوجد في حسابك رصيد كافي للرهان');
        return;
      }
      setError('');
      props.handleBidAmount(enteredMoney)
      props.handleToggle()
    }
  return (
    <div class="bid-wrapper d-flex flex-column fixed-bottom  w-100 ">
        <div className="row flex-row-reverse mb-4 justify-content-around">
        <button className=" btn  mt-0  rounded custombtn"> أدنى</button>
        <button className=" btn  mt-0  rounded custombtn "> X2</button>
        <button className=" btn  mt-0 rounded custombtn"> X/2</button>
        <button className=" btn  mt-0 rounded custombtn"> أقصى</button>
        </div>
        <form className="d-flex flex-column" onSubmit={handleSubmit}>
        	<input value={enteredMoney} onInput={watchChange} className="  bid-amount mt-2" id="bid"  type="number" step="any" placeholder=" " />
        	<label class="bid-label" for ="bid" > إدخال مبلغ الرهان </label>
        {error ? <div className="bid-error" style={{color:'#ff6b6b',marginTop:'6px'}}>{error}</div> : null}
        	<button disabled={!!error || !enteredMoney} className=" btn bid-btn mt-0 rounded ">وضع الرهان</button>
        </form>
    </div>
  )
}

export default Bid