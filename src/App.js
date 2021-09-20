import React from 'react';
import './App.css';

import 'weather-icons/css/weather-icons.min.css'
import Weather from './components/weather.component';
import Form from './components/form.components';
import 'bootstrap/dist/css/bootstrap.min.css';

//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const API_key = 'bc3d98559e12ee1926f3c32fd0b4fb6d';

class App extends React.Component {

  constructor(){
    super();
    this.state = {
      city: undefined,
      country: undefined,
      icon: undefined,
      main: undefined,
      celsius: undefined,
      temp_max: undefined,
      temp_min: undefined,
      discription: "",
      error: false
    };
    

    this.weatherIcon = {
      Thunderstorm: "wi-thunderstorm",
      Drizzle: "wi-sleet",
      Rain: "wi-storm-showers",
      Snow: "wi-snow",
      Atmosphere: "wi-fog",
      Clear: "wi-day-sunny",
      Clouds: "wi-day-fog"
    };
  }

  calCelsius(temp){
    let cell = Math.floor(temp - 273.15);
    return cell;
  }
  
  get_WeatherIcon(icons, rangeID){
    switch(true){
      case rangeID >= 200 && rangeID <=232: 
        this.setState({icon: this.weatherIcon.Thunderstorm});
        break;

      case rangeID >= 300 && rangeID <= 321: 
        this.setState({icon: this.weatherIcon.Drizzle});
        break;

      case rangeID >= 500 && rangeID <=531: 
        this.setState({icon: this.weatherIcon.Rain});
        break;

      case rangeID >= 600 && rangeID <=622: 
        this.setState({icon: this.weatherIcon.Snow});
        break;

      case rangeID >= 701 && rangeID <= 781: 
        this.setState({icon: this.weatherIcon.Atmosphere});
        break;

      case rangeID === 800: 
        this.setState({icon: this.weatherIcon.Clear});
        break;

      case rangeID >= 801 && rangeID <= 804: 
        this.setState({icon: this.weatherIcon.Clouds});
        break;

      default: 
        this.setState({icon: this.weatherIcon.Clouds});
    }
  }

  getWeather = async(e) => {

    e.preventDefault();

    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;

    if(city && country) {
      const api_call = await fetch(
        `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`
      );

      const res = await api_call.json();
      console.log(res);

      this.setState({
        city: `${res.name}, ${res.sys.country}`,
        celsius: this.calCelsius(res.main.temp),
        temp_max: this.calCelsius(res.main.temp_max),
        temp_min: this.calCelsius(res.main.temp_min),
        discription: res.weather[0].description,
        error: false
      });
      this.get_WeatherIcon(this.weatherIcon, res.weather[0].id);
    }else{
      this.setState({error: true});
    }
  };
  
  render() {
    return(
      <div className="App">
        <Form loadweather={this.getWeather} error={this.state.error}/>
        <Weather 
          city={this.state.city} 
          country={this.state.country}
          temp_celsius={this.state.celsius}  
          temp_max = {this.state.temp_max}
          temp_min = {this.state.temp_min}
          discription={this.state.discription}
          weatherIcon={this.state.icon}
        ></Weather>
      </div>
    );
  }
}


export default App;
