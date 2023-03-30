interface trainingData {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: 1 | 2 | 3;
    ratingDescription: string;
    target: number;
    average: number;
}

export const calculateExercises = (
    dailyHours: number[],
    target: number
): trainingData => {
    const average = dailyHours.reduce((a, b) => a + b, 0) / dailyHours.length;
    return {
        periodLength: dailyHours.length,
        trainingDays: dailyHours.filter((x) => x > 0).length,
        success: average > target,
        rating: average < target ? 1 : average - target < 0.5 ? 2 : 3,
        ratingDescription: average < target ? 'bad' : 'good',
        target,
        average,
    };
};
if (process.argv.length > 2) {
    const target = Number(process.argv[2]);
    const data: number[] = process.argv.slice(3).map((x) => Number(x));

    if (isNaN(target) || data.includes(NaN)) {
        throw new Error('Provided target and/or data were not numbers');
    }

    console.log(calculateExercises(data, target));
}
