import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';

const Home = () => {
    const [data,setData] = useState({
        celius : 10,
        name : "London",
        humidity : 10,
        speed : 2,
        image : 'Images/clouds.png'
    })
     const [name, setName] = useState('');
     const [error , setError] = useState('')
    useEffect(()=>{
        
    },[])
    const handleClick = () =>{
        if(name !== ""){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=d473ef2bf0312b56b4cc03852eac1865`
        axios.get(apiUrl)
        .then(res=>{
            let imagePath = '';
            if(res.data.weather[0].main === "Clouds"){
                imagePath = "Images/clouds.png"
            }
           else if(res.data.weather[0].main === "Clear"){
                imagePath = "Images/clear.png"
            }
           else if(res.data.weather[0].main === "Rain"){
                imagePath = "Images/rain.png"
            }
           else if(res.data.weather[0].main === "Drizzle"){
                imagePath = "Images/drizzle.png"
            }
            else if(res.data.weather[0].main === "Mist"){
                imagePath = "Images/mist.png"
            }
            else{
                imagePath = 'Images/clouds.png'
            }
            setData({...data, celcius: res.data.main.temp, name: res.data.name, humidity : res.data.main.humidity, speed : res.data.wind.speed,image : imagePath})
            setError("")
        })
        .catch(err =>{
            if(err.response.status === 404){
                setError("Invalid City Name")
            }else{
                setError("")
            }
        });   
        }
    }
  return (
    <div className='container'>
        <div className='weather'>
            <div className='search'>
                <input type='text' placeholder='Enter City' onChange={(e)=>setName(e.target.value)}/>
                <button onClick={handleClick}><img src='/Images/search.png' alt='search' /></button>
            </div>
            <div className='error'>
                <p>{error}</p>
            </div>
            <div className='winfo'>
                <img src={data.image} alt='clouds' className='icon'/>
                <h1>{Math.round(data.celius)}°</h1>\
                <h2>{data.name}</h2>
                <div className='details'>
                    <div className='col'>
                        <img src='/Images/humidity.png' alt='' className='humidityImg'/>
                        <div className='humidity'>
                            <p>{Math.round(data.humidity)}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className='col'>
                        <img src='/Images/wind.png' alt='' className='humidityImg'/>
                        <div className='wind'>
                            <p>{Math.round(data.speed)}%</p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home