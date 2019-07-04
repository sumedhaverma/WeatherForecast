import React from 'react';
import { prependOnceListener } from 'cluster';

 const EachCard = React.memo((props) => {
    return (<div>
        <label>{props.day}</label>
        <img alt="img"/>
        <label>{props.temp}</label>
    </div>)
});

export default class DateBar{

    render(){
        return(){
<div>{this.props.datesWithTemp.map(info=>{
    <EachCard {...info}/>
})}</div>
        }
    }
}