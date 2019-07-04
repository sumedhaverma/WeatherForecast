/**
 * Created by ivan on 02.07.18.
 */

import React, { memo } from 'react';
import moment from 'moment';
import styled from '@emotion/styled';

import { Celsius } from "../../Common.jsx";
import StyleConst from '../../style/constants';

const Card = styled('div')`
display:flex;
align-items:center;
justify-content:center;
flex-direction:column;
margin:5px;
  flex: 0 0 100px;
  padding: 10px;
  border: 1px solid rgba(0, 0, 0, 0);
  background-color: rgb(245, 245, 245);
  
  @media (max-height: ${StyleConst.xs}) and (orientation: landscape) {
      padding: 8px;
  }
`;

const Header = styled('div')`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 10px;
`;

const WeatherImage = styled('img')`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #d3d3d3;
`;

const Title = styled('div')`
  font-size: 16px;
  color:#bababa;
`;

const Subtitle = styled('div')`
  font-size: 14px;
  font-weight: bold;
`;

const HideXs = styled('div')`
  @media (max-height: ${StyleConst.xs}) and (orientation: landscape) {
    display: none;
  }
`;

const Temperature = styled(HideXs)`
  font-size: 16px;
  margin-top:4px;
  color:#878787;
`;

const Additional = styled(HideXs)``;

const WeatherCard = memo(props => {
    const day = props.day;

    return (
        <Card onClick={()=>props.onParticularDate(day)}>
                    <Title>{moment.unix(day.date).format('ddd')}</Title>

                <WeatherImage src={`https://openweathermap.org/img/w/${day.main.icon}.png`}
                              alt={day.main.icon} />


            <Temperature>
                <strong>
                    <Celsius temp={day.temp.max} />
                </strong>
                | <Celsius temp={day.temp.min} />
            </Temperature>

            
        </Card>
    );
});

export default WeatherCard;