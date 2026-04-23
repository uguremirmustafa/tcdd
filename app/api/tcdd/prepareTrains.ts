import { fetchTrains } from './fetchTrains';
import { readTrains } from './readTrains';
import { QueryParams } from './route';
import { SeatType } from './types';

const isTesting = false;

export const prepareTrains = async (params: QueryParams) => {
  const [year, month, day] = params.date.split('-');
  const [sHour, sMinutes] = params.startHour
    ? params.startHour.split(':')
    : [0, 0];
  const startTime = new Date(`${year}-${month}-${day}`).setHours(
    Number(sHour),
    Number(sMinutes),
    1,
  );
  const [eHour, eMinutes] = params?.endHour
    ? params.endHour.split(':')
    : [23, 59];
  const endTime = new Date(`${year}-${month}-${day}`).setHours(
    Number(eHour),
    Number(eMinutes),
    59,
  );

  const func = isTesting ? readTrains : fetchTrains;
  const trains = await func(params);
  if (!trains) {
    throw new Error('cannot reach to trains');
  }
  const availableTrains = trains.trainLegs[0].trainAvailabilities
    .map((x) => {
      const item = x.trains[0];
      const segmentCount = item.segments.length;
      const start = item.segments[0];
      const end = item.segments[segmentCount - 1];

      const seats: Record<SeatType, number> = {
        BUSİNESS: 0,
        EKONOMİ: 0,
        'TEKERLEKLİ SANDALYE': 0,
      };

      item.cars.forEach((x) => {
        x.availabilities.forEach((av) => {
          const code = (av.cabinClass?.name ?? '') as SeatType;
          if (Object.keys(seats).includes(code)) {
            seats[code] = seats[code] + av.availability;
          }
        });
      });

      const total = Object.entries(seats).reduce((acc, cur) => {
        return acc + cur[1];
      }, 0);

      return {
        name: item.name,
        seats,
        total,
        date: new Date(item.trainDate).toISOString().split('T')[0],
        start: {
          time: new Date(start.departureTime).toLocaleTimeString(),
          timeRaw: start.departureTime,
          station: start.segment.departureStation.name,
        },
        end: {
          time: new Date(end.arrivalTime).toLocaleTimeString(),
          timeRaw: end.arrivalTime,
          station: end.segment.arrivalStation.name,
        },
      };
    })
    .filter((x) => {
      return startTime < x.start.timeRaw && x.start.timeRaw < endTime;
    });

  const finalTrains = availableTrains.filter(
    (x) => x.seats['BUSİNESS'] + x.seats['EKONOMİ'] > 0,
  );

  return finalTrains;
};
