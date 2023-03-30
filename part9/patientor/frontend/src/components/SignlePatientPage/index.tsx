import { useEffect, useState } from 'react';

import {
    Patient,
    Gender,
    Diagnosis,
    Entry,
    HealthCheckRating,
} from '../../types';
import { NewEntry } from '../../types';
import patientService from '../../services/patients';
import diagnoseService from '../../services/diagnoses';
import { useParams } from 'react-router-dom';
import {
    Female,
    HealthAndSafety,
    Favorite,
    Male,
    Transgender,
    LocalHospital,
    WorkRounded,
} from '@mui/icons-material';
import { Button, Input, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryForm = ({
    sendEntry,
    diagnosisCodes,
}: {
    sendEntry: (e: NewEntry) => void;
    diagnosisCodes: Array<Diagnosis['code']>;
}) => {
    const [open, setOpen] = useState(true);
    const [entryType, setEntryType] = useState<
        'HealthCheck' | 'Hospital' | 'OccupationalHealthcare'
    >('HealthCheck');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');
    const [specialist, setSpecialist] = useState('');
    const [healthCheckRating, setHealthCheckRating] =
        useState<HealthCheckRating>(HealthCheckRating.Healthy);
    const [selectedDiagnosisCodes, setSelectedDiagnosisCodes] = useState<
        Array<Diagnosis['code']>
    >([]);
    const [dischargeDate, setDischargeDate] = useState('');
    const [criteria, setCriteria] = useState('');
    const [sickLeaveStartDate, setSickLeaveStartDate] = useState('');
    const [sickLeaveEndDate, setSickLeaveEndDate] = useState('');
    const [employer, setEmployer] = useState('');

    const handleSubmit = (event: React.SyntheticEvent) => {
        event.preventDefault();
        switch (entryType) {
            case 'HealthCheck': {
                const newEntry = {
                    type: entryType,
                    description,
                    date,
                    specialist,
                    healthCheckRating,
                    diagnosisCodes: selectedDiagnosisCodes,
                };
                sendEntry(newEntry);
                break;
            }
            case 'Hospital': {
                const newwEntry = {
                    type: entryType,
                    description,
                    date,
                    specialist,
                    discharge: { date: dischargeDate, criteria },
                    diagnosisCodes: selectedDiagnosisCodes,
                };
                sendEntry(newwEntry);
                break;
            }
            case 'OccupationalHealthcare': {
                const newwwEntry: NewEntry = {
                    type: entryType,
                    description,
                    date,
                    specialist,
                    employerName: employer,
                    diagnosisCodes: selectedDiagnosisCodes,
                };
                if (sickLeaveStartDate && sickLeaveEndDate) {
                    newwwEntry.sickLeave = {
                        startDate: sickLeaveStartDate,
                        endDate: sickLeaveEndDate,
                    };
                }
                sendEntry(newwwEntry);
            }
        }
    };

    if (!open) {
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}>
                Add new entry
            </Button>
        );
    }
    return (
        <div style={{ borderWidth: 5, borderStyle: 'dotted' }}>
            <h4>New Entry</h4>
            <b>entry type </b>
            Health Check
            <input
                defaultChecked={entryType === 'HealthCheck'}
                type="radio"
                name="entryType"
                onChange={() => setEntryType('HealthCheck')}
            />
            Hospital
            <input
                defaultChecked={entryType === 'Hospital'}
                type="radio"
                name="entryType"
                onChange={() => setEntryType('Hospital')}
            />
            Occupational Healthcare
            <input
                defaultChecked={entryType === 'OccupationalHealthcare'}
                type="radio"
                name="entryType"
                onChange={() => setEntryType('OccupationalHealthcare')}
            />
            <form onSubmit={handleSubmit}>
                description
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <br />
                date
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <br />
                specialist
                <input
                    type="text"
                    value={specialist}
                    onChange={(e) => setSpecialist(e.target.value)}
                />
                <br />
                Diagnosis codes
                <Select
                    multiple
                    value={selectedDiagnosisCodes}
                    onChange={(e) => {
                        typeof e.target.value === 'string'
                            ? setSelectedDiagnosisCodes(
                                  e.target.value.split(',')
                              )
                            : setSelectedDiagnosisCodes(e.target.value);
                    }}>
                    {diagnosisCodes.map((c) => (
                        <MenuItem key={c} value={c}>
                            {c}
                        </MenuItem>
                    ))}
                </Select>
                <br />
                {entryType === 'HealthCheck' && (
                    <>
                        healthCheckRating
                        <select
                            value={healthCheckRating}
                            onChange={(e) =>
                                setHealthCheckRating(Number(e.target.value))
                            }>
                            <option value={HealthCheckRating.Healthy}>
                                Healthy
                            </option>
                            <option value={1}>Low Risk</option>
                            <option value={2}>High Risk</option>
                            <option value={3}>Critical Risk</option>
                        </select>
                        <br />
                    </>
                )}
                {entryType === 'Hospital' && (
                    <>
                        discharge
                        <br />
                        date
                        <input
                            type="date"
                            value={dischargeDate}
                            onChange={(e) => setDischargeDate(e.target.value)}
                        />
                        <br />
                        criteria
                        <input
                            type="text"
                            value={criteria}
                            onChange={(e) => setCriteria(e.target.value)}
                        />
                        <br />
                    </>
                )}
                {entryType === 'OccupationalHealthcare' && (
                    <>
                        employer
                        <input
                            type="text"
                            value={employer}
                            onChange={(e) => setEmployer(e.target.value)}
                        />
                        <br />
                        sick leave
                        <br />
                        start date
                        <input
                            type="date"
                            value={sickLeaveStartDate}
                            onChange={(e) =>
                                setSickLeaveStartDate(e.target.value)
                            }
                        />
                        <br />
                        end date
                        <input
                            type="date"
                            value={sickLeaveEndDate}
                            onChange={(e) =>
                                setSickLeaveEndDate(e.target.value)
                            }
                        />
                        <br />
                    </>
                )}
                <Button variant="contained" color="success" type="submit">
                    Add
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => setOpen(false)}>
                    Close form
                </Button>
            </form>
        </div>
    );
};

const EntryDetails = ({
    entry,
    diagnoses,
}: {
    entry: Entry;
    diagnoses: Diagnosis[];
}) => {
    switch (entry.type) {
        case 'HealthCheck':
            return (
                <div style={{ backgroundColor: ' lavender' }}>
                    <p>
                        {entry.date} <HealthAndSafety />
                    </p>
                    <p>
                        <i>{entry.description}</i>
                    </p>
                    <Favorite
                        style={{
                            color:
                                entry.healthCheckRating ===
                                HealthCheckRating.Healthy
                                    ? 'green'
                                    : entry.healthCheckRating ===
                                      HealthCheckRating.LowRisk
                                    ? 'yellow'
                                    : entry.healthCheckRating ===
                                      HealthCheckRating.HighRisk
                                    ? 'orange'
                                    : 'red',
                        }}
                    />
                    {entry.diagnosisCodes && (
                        <ul>
                            {entry.diagnosisCodes.map((c) => (
                                <li key={c}>
                                    {c}{' '}
                                    {diagnoses.find((d) => d.code === c)?.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    <p>diagnose by {entry.specialist}</p>
                </div>
            );
        case 'Hospital':
            return (
                <div style={{ backgroundColor: 'lightgreen' }}>
                    <p>
                        {entry.date} <LocalHospital />
                    </p>
                    <p>
                        <i>{entry.description}</i>
                    </p>
                    <p>
                        discharged on {entry.discharge.date} because{' '}
                        {entry.discharge.criteria}
                    </p>
                    {entry.diagnosisCodes && (
                        <ul>
                            {entry.diagnosisCodes.map((c) => (
                                <li key={c}>
                                    {c}{' '}
                                    {diagnoses.find((d) => d.code === c)?.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    <p>diagnose by {entry.specialist}</p>
                </div>
            );
        case 'OccupationalHealthcare':
            return (
                <div style={{ backgroundColor: ' pink' }}>
                    <p>
                        {entry.date} <WorkRounded /> {entry.employerName}
                    </p>
                    <p>
                        <i>{entry.description}</i>
                    </p>
                    {entry.sickLeave && (
                        <p>
                            on sick leave from {entry.sickLeave.startDate} until{' '}
                            {entry.sickLeave.endDate}
                        </p>
                    )}
                    {entry.diagnosisCodes && (
                        <ul>
                            {entry.diagnosisCodes.map((c) => (
                                <li key={c}>
                                    {c}{' '}
                                    {diagnoses.find((d) => d.code === c)?.name}
                                </li>
                            ))}
                        </ul>
                    )}
                    <p>diagnose by {entry.specialist}</p>
                </div>
            );
        default:
            return assertNever(entry);
    }
};

const SinglePatientPage = () => {
    const { id } = useParams();
    const [patient, setPatient] = useState<Patient | undefined>(undefined);
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
    const [error, setError] = useState('');
    useEffect(() => {
        if (id) {
            patientService.getById(id).then((p) => setPatient(p));
        }
        diagnoseService.getAll().then((d) => setDiagnoses(d));
    }, []);

    const sendEntry = (entry: NewEntry) => {
        patientService
            .addEntry(id!, entry)
            .then((e) =>
                setPatient({ ...patient!, entries: patient!.entries.concat(e) })
            )
            .catch((error) => {
                if (axios.isAxiosError(error) && error.response) {
                    setError(error.response.data);
                }
                setTimeout(() => setError(''), 5000);
            });
    };

    if (!patient) {
        return <p>loading...</p>;
    }

    return (
        <div className="App">
            <h2>
                {patient.name}
                {patient.gender === Gender.Male ? (
                    <Male />
                ) : patient.gender === Gender.Female ? (
                    <Female />
                ) : (
                    <Transgender />
                )}
            </h2>

            <p>ssn: {patient.ssn}</p>
            <p>occupation: {patient.occupation}</p>
            <p>date of birth: {patient.dateOfBirth}</p>
            <h3 style={{ color: 'red' }}>{error}</h3>
            <EntryForm
                sendEntry={sendEntry}
                diagnosisCodes={diagnoses.map((d) => d.code)}
            />
            <h3>entries</h3>
            {patient.entries.map((entry) => (
                <EntryDetails
                    key={entry.id}
                    entry={entry}
                    diagnoses={diagnoses}
                />
            ))}
        </div>
    );
};

export default SinglePatientPage;
