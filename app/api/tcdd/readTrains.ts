import { QueryParams } from './route';
import { Root } from './types';

export async function readTrains(params: QueryParams) {
  console.log(params);
  const result = await fetch('http://localhost:3000/result.json');
  const json = (await result.json()) as Root;
  return json;
}
