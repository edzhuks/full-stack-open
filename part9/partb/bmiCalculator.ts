export const calculateBmi = (height: number, weight: number): string => {
    const bmi = weight / ((height / 100) ^ 2);
    if (bmi < 18.5) {
        return 'Underweight';
    } else if (bmi < 24.9) {
        return 'Normal weight';
    } else if (bmi < 29.9) {
        return 'Overweight';
    } else {
        return 'Obese';
    }
};

if (process.argv.length > 2) {
    const a = Number(process.argv[2]);
    const b = Number(process.argv[3]);

    if (isNaN(a) || isNaN(b)) {
        throw new Error('Provided height and/or weight were not numbers');
    }

    console.log(calculateBmi(a, b));
}
