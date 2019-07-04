import React, { Fragment } from 'react';
import styled from '@emotion/styled';

import SlidingCard from './SlidingCard.jsx';
import TemperatureCard from './TemperatureCard.jsx';
import { Loader } from '../../components/molecules/Loaders.jsx';

const CarouselWrapper = styled(Loader)` 
  min-height: 110px;
`;


const APP_ID = '093c63d1d6dd2f0f77c6f14d91a19042'; 

const Card = styled('div')`
border:0.4px solid #878787;
padding:20px;
margin:10px;
`;

const SubCard = styled('div')`
display:flex;
justify-content:space-between;
margin-bottom:20px;
`;

const Carousel = styled('div')`
display:flex;
overflow:auto;
`;

class MapPage extends React.Component {
constructor(props){
    super(props);
    this.state={data:{city:'',list:[]},selectedDate:[],
        options:[{country:'Singapore',id: 1768496,name: 'Punggol'},
        {country:'Singapore',id: 308638,name: 'Tengah'},
        {country:'Singapore',id: 519677,name: 'Kranji'},
        {country:'Singapore',id: 760343,name: 'Simei'},
        {country:'Singapore',id: 730900,name: 'Woodlands'}]
    }
this.setDate=this.setDate.bind(this);
this.selectCity=this.selectCity.bind(this);
}


    setDate(selectedDate){
let defaultWeather;
const {list}=this.state.data;
if(list && list.length>0)  {
    list.some(date=>{
    if(date === selectedDate){
        defaultWeather=date;
    }
});

this.setState({selectedDate: defaultWeather});
}
    }

    selectCity(e){
        console.log(e.target.value);
        this.setState({data:{list:[]}})
this.getWeatherr(this.state.options[e.target.value]);
       // this.setState({selectedCity:this.state.options[e.target.value]})
    }

    async getWeatherr(option) {
console.log(option);
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${option.name},${option.country}&appid=${APP_ID}&cnt=7`);
        const response = await api_call.json();
        
        let { city, list = [] } = response;
        console.log(response);
        list = list.map(day => {
            return {
                date: day.dt,
                humidity: day.humidity,
                speed: day.speed,
                temp: day.temp,
                main: {
                    icon: day.weather[0].icon,
                    description: day.weather[0].description
                }
            };
        });

        this.setState({data:{ city, list }});

      }

      componentDidMount(){
        this.getWeatherr(this.state.options[0]);
      }
    
    
    render(){
console.log(this.state.data);
   const {options,data:{list,city}}=this.state;
   console.log(city)
    let selectedDate= this.state.selectedDate;
    if (selectedDate.length==0 && list.length>0) {
            selectedDate=list[0];
    }
    return (
        <Card>
            <SubCard> {selectedDate && selectedDate.date && <TemperatureCard city={city} day={selectedDate} key={selectedDate.date}/>}
            <select onChange={this.selectCity}>
  {options.map((option,index)=><option key={index} value={index}>{option.name}</option>)}
</select>

            </SubCard>
                <CarouselWrapper showLoader={list.length==0 ? true:false}>
                <Carousel>
                    {list.map((day) => <SlidingCard onParticularDate={this.setDate} day={day} key={day.date} />)}
                </Carousel>
            </CarouselWrapper>

        </Card>
    );
}
}


export default MapPage;