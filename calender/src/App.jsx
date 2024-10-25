import { useState } from 'react'
import './App.css'
import leftarrow from "./assets/leftarrow.png"
import rightarrow from "./assets/rightarrow.png"

const daysOfWeeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];



function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const daysOfMonth = ()=>{
    const daysArray = [];
    const firstDay = new Date(selectedDate.getFullYear(),selectedDate.getMonth(),1);
    const lastDay = new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,0);
    
    for(let i=0; i<firstDay.getDay();i++){
      daysArray.push(null);
    }
    for(let i=1; i<=lastDay.getDate();i++){
      daysArray.push(new Date(selectedDate.getFullYear(),selectedDate.getMonth(),i));
    }

    return daysArray;
  }

  const isSameDate = (date1,date2)=>{
    return date1.getDate()===date2.getDate() && date1.getMonth()===date2.getMonth() && date1.getFullYear()===date2.getFullYear() 
  };
  
  const handlemonth=(e)=>{
    const newMonth = parseInt(e.target.value,10);
    setSelectedDate(new Date(selectedDate.getFullYear(),newMonth,1))
    }

    const handelYear=(e)=>{
      const newYear=parseInt(e.target.value,10);
      setSelectedDate(new Date(newYear,selectedDate.getMonth(),1));
    }

  
  
  return (
    <>
      <div className="calender">
        <div className="header">
          <button onClick={()=>{
            setSelectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()-1,1))}}>
            <img src={leftarrow} width={12} height={12} alt="" />
          </button>
          <select value={selectedDate.getMonth()} onChange={handlemonth}>
            {months.map((month,index)=>(
              <option key={index} value={index}>{month}</option>
            ))}
          </select>
          <select value={selectedDate.getFullYear()} onChange={handelYear}>
            {Array.from ({length : 10}, (_,i)=>selectedDate.getFullYear() - 5 +i ).map((year)=>(<option key={year} value={year}>{year}</option>))}
          </select>
          <button onClick={()=>{
            setSelectedDate(new Date(selectedDate.getFullYear(),selectedDate.getMonth()+1,1))}}>
            <img src={rightarrow} width={12} height={12}/>
          </button>
        </div>
        <div className="daysOfWeek">
          {daysOfWeeks.map((day) =>(
            <div key={day}>{day}</div>
          ))}
        </div>
        <div className="days">
          {daysOfMonth().map((day,index)=>(
            <div key={index} className={day? (isSameDate(day,new Date())) ?"day current" : "day" :"empty"}>{day?day.getDate():""}</div>
          ))}
        </div>
      </div>
      
    </>
  )
}

export default App
