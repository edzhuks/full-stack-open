import {useEffect, useState} from "react";
import axios from "axios";

const Fiter = ({filterValue, updateFilter}) => {
    return (
        <div>
            find countries <input value={filterValue} onChange={updateFilter}/>
        </div>
    )
}

const Country = ({country}) => {
    console.log(country)
    return (
        <div>
            <h1>{country.name.official}</h1>
            <p>
                capital {country.capital}<br/>
                area {country.area}
            </p>
            <h3>Languages:</h3>
            <ul>
                {Object.values(country.languages).map(l => <li key={l}>{l}</li>)}
            </ul>
            <img src={country.flags.png} alt={`flag of ${country.name.common}`}/>
        </div>
    )
}

const WeatherInfo = ({cityName, weather}) => {
    if (weather) {
        return (
            <div>
                <h2>Weather in {cityName}</h2>
                <p>temperature {weather.main.temp} Celcius</p>
                <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={'weather icon'}/>
                <p>wind {weather.wind.speed} m/s</p>
            </div>
        )
    }
}

const CountryListItem = ({country, showCountry}) => {
    return (
        <p>{country.name.common}
            <button onClick={() => showCountry(country.name.common)}>show</button>
        </p>
    )
}

const Countries = ({countries, showCountry}) => {
    if (countries) {
        if (countries.length > 10) {
            return <p>Too many countries, be more specfic</p>
        } else if (countries.length > 1) {
            return (
                <div>
                    {countries.map(c => <CountryListItem country={c} key={c.name.common} showCountry={showCountry}/>)}
                </div>
            )
        } else if (countries.length === 1) {
            return (
                <div>
                    <Country country={countries[0]}/>
                </div>
            )
        }
    }
}

const App = () => {
    const [filterValue, setFilterValue] = useState('')
    const [countries, setCountries] = useState(null)
    const [weather, setWeather] = useState(null)

    const api_key = process.env.REACT_APP_API_KEY

    const capital = countries && countries.length === 1 ? countries[0].capital : null

    useEffect(() => {
        console.log('filter changed to ', filterValue)
        if (filterValue) {
            console.log('fetching countries...')
            axios
                .get(`https://restcountries.com/v3.1/name/${filterValue}`)
                .then(response => {
                    setCountries(response.data)
                    if (response.data.length === 1) {
                        axios
                            .get(`https://api.openweathermap.org/data/2.5/weather?q=${response.data[0].capital},${response.data[0].cca3}&appid=${api_key}&units=metric`)
                            .then(response => {
                                setWeather(response.data)
                            })
                    }
                })
                .catch(error => {
                    setCountries(null)
                })
        }
    }, [filterValue])

    const updateFilter = (e) => {
        setFilterValue(e.target.value)
        setWeather(null)
    }

    const showCountry = (name) => {
        setFilterValue(name)
    }

    return (
        <div>
            <Fiter filterValue={filterValue} updateFilter={updateFilter}/>
            <Countries countries={countries} showCountry={showCountry}/>
            <WeatherInfo weather={weather} cityName={capital}/>
        </div>
    )
}

export default App;
