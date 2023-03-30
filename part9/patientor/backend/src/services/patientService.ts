import patients from '../../data/patients';
import {
    Entry,
    NewEntry,
    NewPatient,
    NonSensitivePatient,
    Patient,
} from '../types';
import { v1 as uuid } from 'uuid';

const getPatients = (): NonSensitivePatient[] => {
    return patients.map(({ id, name, gender, dateOfBirth, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const getPatientById = (id: string): Patient | undefined => {
    return patients.find((p) => p.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
    const newPatient = {
        id: uuid(),
        entries: [],
        ...patient,
    };
    patients.push(newPatient);
    return newPatient;
};

const addEntry = (patientId: string, entry: NewEntry): Entry => {
    const newEntry = {
        id: uuid(),
        ...entry,
    };
    patients.find((p) => p.id === patientId)?.entries.push(newEntry);
    return newEntry;
};

export default {
    getPatients,
    addPatient,
    getPatientById,
    addEntry
};
