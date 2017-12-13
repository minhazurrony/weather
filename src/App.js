import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, NavItem, Nav, Grid, Row, Col } from "react-bootstrap";

const PLACES = [
  { name: "Palo Alto", zip: "94303" },
  { name: "Sunny Vale", zip: "94088" },
  { name: "Santa Cruz", zip: "95062" },
  { name: "Honolulu", zip: "96803" }
];

class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const name = this.props.name;
    const Key = "&key=3a7bd1aa35574dd6867f9f5a05061c4a";
    const URL = "https://api.weatherbit.io/v2.0/current?city=" + name + Key;
    //const URL = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + Key;
    fetch(URL)
      .then(res => res.json())
      .then(json => {
        this.setState({ weatherData: json });
      });
  }
  render() {
    let weatherData = this.state.weatherData;
    if (!weatherData) return <div>Loading</div>;
    // return <div>{JSON.stringify(weatherData)}</div>;
    let weather_info = weatherData.data[0];

    return (
      <div>
        <h1>
          {weather_info.weather.description} in {weather_info.city_name}
        </h1>
        <p>Temperature: {weather_info.temp}</p>
        <p> App Temperature: {weather_info.app_temp}</p>
        <p>Clouds: {weather_info.clouds}</p>
        <p>Wind Speed: {weather_info.wind_spd}</p>
        <p>Wind Direction: {weather_info.wind_cdir_full}</p>
        <p>Sun Rise: {weather_info.sunrise}</p>
        <p>Sun Set: {weather_info.sunset}</p>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }

  render() {
    const activePlace = this.state.activePlace;
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>React Simple Weather App</Navbar.Brand>
          </Navbar.Header>
        </Navbar>
        <Grid>
          <Row>
            <Col md={4} sm={4}>
              <h3>Select a city</h3>
              <Nav
                bsStyle="pills"
                stacked
                activeKey={activePlace}
                onSelect={index => {
                  this.setState({ activePlace: index });
                }}
              >
                {PLACES.map((place, index) => (
                  <NavItem key={index} eventKey={index}>
                    {place.name}
                  </NavItem>
                ))}
              </Nav>
            </Col>
            <Col md={8} sm={8}>
              <WeatherDisplay
                key={activePlace}
                name={PLACES[activePlace].name}
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
