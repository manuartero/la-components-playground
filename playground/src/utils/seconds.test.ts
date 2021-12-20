import { toHHMMSS } from './seconds';

describe('toHHMMSS', () => {
    test('returns {hh,mm,ss}', () => {
        const cases = [
            {
                input: 3540,
                output: {
                    hh: 0,
                    mm: 59,
                    ss: 0,
                },
            },
            {
                input: 3541,
                output: {
                    hh: 0,
                    mm: 59,
                    ss: 1,
                },
            },
            {
                input: 3641,
                output: {
                    hh: 1,
                    mm: 0,
                    ss: 41,
                },
            },
            {
                input: 42,
                output: {
                    hh: 0,
                    mm: 0,
                    ss: 42,
                },
            },
        ];
        for (const { input, output } of cases) {
            expect(output).toEqual(toHHMMSS(input));
        }
    });
});
