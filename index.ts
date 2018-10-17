/* eslint-disable no-console */
import * as meow from 'meow';
import {format, parse, addMinutes, subMinutes} from 'date-fns';

const timeFormat = 'HH:mm';

const createTime = (time: string): Date => {
    const date = new Date();

    return parse(time, timeFormat, date);
};

const makeVariation = (time: Date): string => {
    const shiftDirection = [addMinutes, subMinutes];
    const shiftDir =
        shiftDirection[Math.floor(Math.random() * shiftDirection.length)];
    const timeDiff = Math.ceil(Math.random() * 6);
    return format(shiftDir(time, timeDiff), timeFormat);
};

const pad = (number) => {
    return number < 10 ? `0${number}` : number;
};

const startTimeMor = createTime('08:00');
const endTimeMor = createTime('12:00');
const startTimeAft = createTime('13:00');
const endTimeAft = createTime('17:48');

const cli = meow(`
Usage
$ ponto <days> --start 1 --end 30
`);

const days = cli.flags.end ? cli.flags.end : 31;
let currentDay = cli.flags.start ? cli.flags.start : 1;

while (currentDay <= days) {
    const enterMor = makeVariation(startTimeMor);
    const exitMor = makeVariation(endTimeMor);
    const enterAft = makeVariation(startTimeAft);
    const exitAft = makeVariation(endTimeAft);
    console.log(
        `Day ${pad(
            currentDay
        )} - ${enterMor} | ${exitMor} | ${enterAft} | ${exitAft}`
    );
    currentDay++;
}
