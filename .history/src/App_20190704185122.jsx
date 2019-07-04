import React from 'react';
import styled from '@emotion/styled';

import SlidingCard from './components/templates/SlidingCard.jsx';
import TemperatureCard from './components/templates/TemperatureCard.jsx';
import {Loader} from './components/molecules/Loaders.jsx';
import Const from './constants.js';
import $ from 'jquery';

const CarouselWrapper = styled(Loader)` 
  min-height: 110px;
`;

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

class App extends React.Component {

    constructor(props){
        super(props);
        this.state={data:{city:'',list:[]},selectedDate:[],
            options:Const.cities
        }

        //binding of methods
        this.setDate=this.setDate.bind(this);
        this.selectCity=this.selectCity.bind(this);
    }

    componentDidMount(){
        // by default for first option
        this.getWeather(this.state.options[0]);
    }


    setDate(selectedDate){
        console.log(selectedDate);
        let defaultWeather;
        const { list } =this.state.data;

        if(list && list.length > 0)  {
            list.some(date=>{
            if(date === selectedDate){
                defaultWeather=date;
            }
            });
            this.setState({selectedDate: defaultWeather});
        }
    }

    selectCity(e){
        this.setState({data:{list:[],city:''},selectedDate:[]})
        this.getWeather(this.state.options[e.target.value]);
    }

    // async call to fetch weather data
    async getWeather(option) {
        const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${option.name},${option.country}&appid=${Const.APP_ID}&cnt=7`);
        const response = await api_call.json();
        
        let { city, list = [] } = response;
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
    
    render(){
        const {options,data:{list,city}}=this.state;
        let selectedDate= this.state.selectedDate;
        if (selectedDate.length === 0 && list.length > 0) {
                selectedDate=list[0];
        }
        return (
            <Card>
                <SubCard> {selectedDate && selectedDate.date && list.length>0 && <TemperatureCard city={city} day={selectedDate} key={selectedDate.date}/>}
                    <select onChange={this.selectCity}>
                    {options.map((option,index)=><option key={index} value={index}>{option.name}</option>)}
                    </select>
                </SubCard>
                <CarouselWrapper showLoader={list.length === 0 ? true : false}>
                    <Carousel>
                        {list.map((day) => <SlidingCard onParticularDate={this.setDate} day={day} key={day.date} id={day.date} />)}
                    </Carousel>
                </CarouselWrapper>
            </Card>
        );
    }
}


export default App;