import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from './types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllEntries = () => {
    return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

export const createEntry = (object: NewDiaryEntry) => {
    console.log();

    return axios
        .post<DiaryEntry>(baseUrl, {
            ...object,
            weather: object.weather.toLocaleLowerCase(),
            visibility: object.visibility.toLocaleLowerCase(),
        })
        .then((response) => response.data);
};
