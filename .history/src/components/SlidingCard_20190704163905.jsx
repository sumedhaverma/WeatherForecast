import React from 'react';
import { prependOnceListener } from 'cluster';

 const EachCard = React.memo((props) => {
    return (<div>
        <label>{props.day}</label>
        <img alt="img"/>
        <label>{props.temp}</label>
    </div>)
});

export default class DateBar extends React.Component{

    render(){
        return(
<div>{this.props.datesWithTemp.map(info=>{
    <EachCard {...info}/>
})}</div>
        )
    }
}

DateBar.defaultProps={
    datesWithTemp:[
        {day:'Mon',
    temp:'32'
    },
    {day:'Tue',
    temp:'31'
    }
    ]
}