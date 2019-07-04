import React from "react";


class TemperatureCard extends React.Component {

    render(){
        const {location,date,type,temp}=this.props;
        return(<div>
<label>{location}</label>
<label>{date}</label>
<label>{type}</label>
<div><img alt="img"/><label>{temp}</label></div>
        </div>)
    }
}

TemperatureCard.defaultProps={
    location: "Singapore",
    date:now(),
    type:"Mostly cloudy",
    temp:"32"
}

