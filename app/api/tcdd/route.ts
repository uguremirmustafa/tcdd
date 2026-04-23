import sendEmail from './sendMail';
import type { NextRequest } from 'next/server';
import { prepareTrains } from './prepareTrains';

export type QueryParams = {
  date: string;
  passengerCount: number;
  startHour: string | null;
  endHour: string | null;
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');
  if (!date) {
    return Response.json({ message: 'date is not provided' });
  }

  try {
    const finalTrains = await prepareTrains({
      date,
      passengerCount: searchParams.get('passengerCount')
        ? Number(searchParams.get('passengerCount'))
        : 1,
      endHour: searchParams.get('endHour'),
      startHour: searchParams.get('startHour'),
    });
    if (finalTrains.length > 0) {
      await sendEmail(
        'trenler',
        JSON.stringify(finalTrains, null, 4),
        searchParams.get('emailTo') ?? 'uguremirmustafa@gmail.com',
      );
    }
    return Response.json(finalTrains);
  } catch (error) {
    return Response.json({ message: String(error) });
  }
}
