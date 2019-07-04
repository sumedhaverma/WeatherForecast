

import React, { memo } from 'react';
import moment from 'moment';
import styled from '@emotion/styled';

import { Celsius } from "../../Common.jsx";
import StyleConst from '../../constants';

const WeatherImage = styled('img')`
  width: 50px;
  height: 50px;
  margin-right: 20px;
  border-radius: 50%;
  background-color: #d3d3d3;
`;
const Place = styled('div')`
  font-size: 18px;
  font-weight: bold;
  color:#878787;
`;

const Title = styled('div')`
  font-size: 14px;
  font-weight: 600;
  color:#878787;
`;

const Row = styled('div')`
display:flex;
align-items:center;
`;

const Subtitle = styled('div')`
  font-size: 14px;
  font-weight: 600;
  color:#878787;
  text-transform:capitalize;
`;

const HideXs = styled('div')`
  @media (max-height: ${StyleConst.xs}) and (orientation: landscape) {
    display: none;
  }
`;

const Temperature = styled(HideXs)`
  font-size: 24px;
`;



const Additional = styled(Subtitle)`
`;


const TemperatureCard = memo(props => {
    const day = props.day;
    return (
        <div>
            <Place>{`${props.city.name}, ${props.city.country}`}</Place>
            <div>
                  <Title>{moment.unix(day.date).format('ddd, MMM Do')}</Title>
                  <Subtitle>{day.main.description}</Subtitle>
                  <Additional>
                      humidity: {day.humidity} %,
                      speed: {day.speed} mps
                  </Additional>
            </div>
            <Row>
                  <WeatherImage src={`https://openweathermap.org/img/w/${day.main.icon}.png`}
                              alt={day.main.icon} />
                  <Temperature>
                      <strong>
                        <Celsius temp={day.temp.max} />
                      </strong>
                  </Temperature>
            </Row>
        </div>
    );
});

export default TemperatureCard;