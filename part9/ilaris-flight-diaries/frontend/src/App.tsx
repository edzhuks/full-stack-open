import { useState, useEffect } from 'react';
import { DiaryEntry, Visibility, Weather } from './types';
import { getAllEntries, createEntry } from './diaryEntryService';
import axios from 'axios';
const App = () => {
    const [error, setError] = useState('');
    const [entries, setEntries] = useState<DiaryEntry[]>([]);
    const [date, setDate] = useState('');
    const [visibility, setVisibility] = useState(Visibility.Good);
    const [weather, setWeather] = useState(Weather.Sunny);
    const [comment, setComment] = useState('');

    useEffect(() => {
        getAllEntries().then((data) => {
            setEntries(data);
        });
    }, []);

    const entryCreation = (event: React.SyntheticEvent) => {
        event.preventDefault();

        createEntry({
            date,
            visibility,
            weather,
            comment,
        })
            .then((data) => {
                setEntries(entries.concat(data));
                setDate('');
                setComment('');
                setWeather(Weather.Sunny);
                setVisibility(Visibility.Good);
            })
            .catch((error) => {
                if (axios.isAxiosError(error) && error.response) {
                    setError(error.response.data);
                }
                setTimeout(() => setError(''), 5000);
            });
    };

    return (
        <div>
            <h2>Add new entry</h2>
            <h3 style={{ color: 'red' }}>{error}</h3>
            <form onSubmit={entryCreation}>
                date
                <input
                    value={date}
                    type="date"
                    onChange={(event) => setDate(event.target.value)}
                />
                <br />
                <div>
                    visibility
                    {(Object.keys(Visibility) as Array<Visibility>).map((v) => (
                        <div key={v}>
                            {v}
                            <input
                                defaultChecked={
                                    v.toLocaleLowerCase() === visibility
                                }
                                type="radio"
                                name="visibility"
                                onChange={() => setVisibility(v)}
                            />
                        </div>
                    ))}
                </div>
                <br />
                <div>
                    weather
                    {(Object.keys(Weather) as Array<Weather>).map((v) => (
                        <div key={v}>
                            {v}
                            <input
                                defaultChecked={
                                    v.toLocaleLowerCase() === weather
                                }
                                type="radio"
                                name="weather"
                                onChange={() => setWeather(v)}
                            />
                        </div>
                    ))}
                </div>
                <br />
                comment
                <input
                    value={comment}
                    type="text"
                    onChange={(event) => setComment(event.target.value)}
                />
                <br />
                <button type="submit">add</button>
            </form>
            <h2>Diary entries</h2>
            {entries.map((entry) => (
                <div key={entry.id}>
                    <h4>{entry.date}</h4>
                    <p>
                        visibility: {entry.visibility}
                        <br />
                        weather: {entry.weather}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default App;
