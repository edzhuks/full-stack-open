import {
    Diagnosis,
    Gender,
    HealthCheckRating,
    NewEntry,
    NewPatient,
} from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseString = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing string ' + name);
    }

    return name;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

const isGender = (param: string): param is Gender => {
    return Object.values(Gender)
        .map((v) => v.toString())
        .includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
    console.log('here');
    return Object.values(HealthCheckRating).includes(param);
};

const isNumber = (text: unknown): text is number => {
    return typeof text === 'number' || text instanceof Number;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
    if (!isNumber(rating) || !isHealthCheckRating(rating)) {
        throw new Error('Incorrect or missing health check rating: ' + rating);
    }
    return rating;
};

const parseDischarge = (
    discharge: unknown
): { date: string; criteria: string } => {
    if (
        !discharge ||
        typeof discharge !== 'object' ||
        !('date' in discharge) ||
        !('criteria' in discharge) ||
        !isString(discharge.date) ||
        !isDate(discharge.date) ||
        !isString(discharge.criteria)
    ) {
        throw new Error('Incorrect or missing discharge: ' + discharge);
    }
    return { date: discharge.date, criteria: discharge.criteria };
};
const parseSickLeave = (
    discharge: unknown
): { startDate: string; endDate: string } => {
    if (
        !discharge ||
        typeof discharge !== 'object' ||
        !('startDate' in discharge) ||
        !('endDate' in discharge) ||
        !isString(discharge.startDate) ||
        !isDate(discharge.startDate) ||
        !isString(discharge.endDate) ||
        !isDate(discharge.endDate)
    ) {
        throw new Error('Incorrect or missing sick leave: ' + discharge);
    }
    return { startDate: discharge.startDate, endDate: discharge.endDate };
};

export const toNewPatient = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if (
        'name' in object &&
        'dateOfBirth' in object &&
        'ssn' in object &&
        'gender' in object &&
        'occupation' in object
    ) {
        const newPatient: NewPatient = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation),
        };
        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing');
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> => {
    if (
        !object ||
        typeof object !== 'object' ||
        !('diagnosisCodes' in object)
    ) {
        // we will just trust the data to be in correct form
        console.log(object);

        return [] as Array<Diagnosis['code']>;
    }

    return object.diagnosisCodes as Array<Diagnosis['code']>;
};

export const toNewEntry = (object: unknown): NewEntry => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }
    if (
        'description' in object &&
        'date' in object &&
        'specialist' in object &&
        'type' in object
    ) {
        if (object.type === 'HealthCheck' && 'healthCheckRating' in object) {
            const newEntry: NewEntry = {
                description: parseString(object.description),
                date: parseDate(object.date),
                specialist: parseString(object.specialist),
                type: 'HealthCheck',
                healthCheckRating: parseHealthCheckRating(
                    object.healthCheckRating
                ),
            };
            if ('diagnosisCodes' in object) {
                newEntry.diagnosisCodes = parseDiagnosisCodes(object);
            }
            return newEntry;
        } else if (object.type === 'Hospital' && 'discharge' in object) {
            const newEntry: NewEntry = {
                description: parseString(object.description),
                date: parseDate(object.date),
                specialist: parseString(object.specialist),
                type: 'Hospital',
                discharge: parseDischarge(object.discharge),
            };
            if ('diagnosisCodes' in object) {
                newEntry.diagnosisCodes = parseDiagnosisCodes(object);
            }
            return newEntry;
        } else if (
            object.type === 'OccupationalHealthcare' &&
            'employerName' in object
        ) {
            const newEntry: NewEntry = {
                description: parseString(object.description),
                date: parseDate(object.date),
                specialist: parseString(object.specialist),
                type: 'OccupationalHealthcare',
                employerName: parseString(object.employerName),
            };
            if ('diagnosisCodes' in object) {
                newEntry.diagnosisCodes = parseDiagnosisCodes(object);
            }
            if ('sickLeave' in object) {
                newEntry.sickLeave = parseSickLeave(object.sickLeave);
            }
            return newEntry;
        }
    }

    throw new Error('Incorrect data: some fields are missing');
};
