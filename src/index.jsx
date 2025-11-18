import { render } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import Bid from './Components/Bid/Bid';
import Dataview from './Components/Dataview/Dataview';
import Profit from './Components/Profit/Profit';
import LoginScreen from './Components/LoginScreen/LoginScreen';
import './style.css';
import "bootstrap/dist/css/bootstrap.min.css";
import  'bootstrap';
import BiddingSpinner from './Components/BiddingSpinner/BiddingSpinner';
import apple from './assets/aog.png';
import banner from './assets/banner.jpg';

export function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		try { return !!localStorage.getItem('seenLogin'); } catch(e) { return false; }
	});
	
	if (!isLoggedIn) {
		return <LoginScreen onLoginSuccess={() => setIsLoggedIn(true)} />;
	}
	// Ensure a sensible default balance. If no value exists or it's "0", set to "1000" once.
	try {
		const stored = localStorage.getItem("money");
		// treat missing or any numeric-zero ("0", "0.00", 0) as empty and set default
		const num = Number(String(stored || '').replace(/[^0-9.-]+/g, ''));
		if (stored === null || stored === undefined || Number.isNaN(num) || num === 0) {
			localStorage.setItem("money", "1000");
		}
	} catch (e) {
		// ignore (e.g. SSR or private mode)
	}
	const [money, setMoney] = useState(() => {
		try { return localStorage.getItem("money") || "1000" } catch(e){ return "1000" }
	});
	// const money = localStorage.setItem("money",money.toString())
	const [bidAmount, setBidAmount] = useState(0);
	const [profit, setProfit] = useState(0)
	const [toggle, setToggle] = useState(false)
	const [profitToggle,setProfitToggle] = useState(false)

	// Keep localStorage in sync whenever `money` changes.
	useEffect(()=>{
		try { localStorage.setItem("money", String(money)); } catch(e){}
	},[money])

	const handleMoneyChange = (amount)=> {
		const s = String(amount);
		setMoney(s)
		try { localStorage.setItem("money", s); } catch(e){}
		console.log(localStorage.getItem("money"))
	}

	const handleToggle = ()=>{
		setToggle(!toggle)
	}


	const handleBidAmount = (amt)=>{
		setBidAmount(amt)
		const Remaining = parseFloat(String(money || "0")) - parseFloat(String(amt || "0"))
		const remStr = String(Number.isNaN(Remaining) ? 0 : Remaining.toFixed(2))
		setMoney(remStr)
		try { localStorage.setItem("money", remStr); } catch(e){}
	}

	const handleProfit = (amt)=>{
		setProfit(amt)
		// console.log(profit)
	}

	const handleProfitToggle = ()=>{
		setProfitToggle(true)
	}

	const handleTotal = () =>{
		const numValue = parseFloat(String(money || "0")) + parseFloat(String(profit || "0"))
		const result = numValue.toFixed(2) + ""
		setMoney(result)
		localStorage.setItem("money", result)
		console.log(result)
	}

	return (
		<div class="">
			<img class="banner" src={banner}></img>
		{toggle?
		<div class="d-flex flex-column">
			<Dataview money = {money} handleMoneyChange= {handleMoneyChange}></Dataview>
				
			<Profit toggle = {profitToggle} profit = {profit} money = {money} handleProfit = {handleTotal}/>
			
			<BiddingSpinner handleProfitToggle = {handleProfitToggle} bidAmount={bidAmount} handleProfit={handleProfit}/> 
		
			</div>:
		<div class=" custom-bg-color  ">
			<Dataview money = {money} handleMoneyChange= {handleMoneyChange}></Dataview>
			
			 <h3 className="custom-banner">! جرب حظك! تذوق تفاح الثلج الأبيض</h3>
			<img className="rounded-4 mt-4 me-0 " width = "150px" src={apple} />
			<Bid money={money} handleBidAmount = {handleBidAmount} bidAmount = {bidAmount} handleMoneyChange= {handleMoneyChange} handleToggle={handleToggle} ></Bid>
			</div>}
		</div>
	);
}



render(<App />, document.getElementById('app'));
