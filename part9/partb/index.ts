import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());
app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const weight = Number(req.query.weight);
    const height = Number(req.query.height);
    if (isNaN(weight) || isNaN(height)) {
        res.send({ error: 'malformed parameters' });
        return;
    }
    res.send({
        weight,
        height,
        bmi: calculateBmi(height, weight),
    });
});

app.post('/exercises', (req, res) => {
    if (!('target' in req.body) || !('daily_exercises' in req.body)) {
        res.send({ error: 'missing parameters' });
        return;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    const targett = Number(target); 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    const data: number[] = daily_exercises as number[];

    if (isNaN(targett) || data.includes(NaN)) {
        res.send({ error: 'malformed parameters' });
        return;
    }
    const result = calculateExercises(data, targett);
    res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
