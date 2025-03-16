import fs from "node:fs";
import { Root } from "./types";
import sendEmail from "./sendMail";

export async function GET(request: Request) {
  const finalTrains = await prepareTrains();
  if (finalTrains.length > 0) {
    await sendEmail("trenler", JSON.stringify(finalTrains, null, 4));
  } else {
    log("Aramaya uyan tren bulunamadı");
  }
  return Response.json(finalTrains);
}

type SeatType = "BUSİNESS" | "EKONOMİ" | "TEKERLEKLİ SANDALYE";

async function fetchTrains() {
  try {
    const result = await fetch(
      "https://web-api-prod-ytp.tcddtasimacilik.gov.tr/tms/train/train-availability?environment=dev&userId=1",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-language": "tr",
          authorization:
            "eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJlVFFicDhDMmpiakp1cnUzQVk2a0ZnV196U29MQXZIMmJ5bTJ2OUg5THhRIn0.eyJleHAiOjE3MjEzODQ0NzAsImlhdCI6MTcyMTM4NDQxMCwianRpIjoiYWFlNjVkNzgtNmRkZS00ZGY4LWEwZWYtYjRkNzZiYjZlODNjIiwiaXNzIjoiaHR0cDovL3l0cC1wcm9kLW1hc3RlcjEudGNkZHRhc2ltYWNpbGlrLmdvdi50cjo4MDgwL3JlYWxtcy9tYXN0ZXIiLCJhdWQiOiJhY2NvdW50Iiwic3ViIjoiMDAzNDI3MmMtNTc2Yi00OTBlLWJhOTgtNTFkMzc1NWNhYjA3IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoidG1zIiwic2Vzc2lvbl9zdGF0ZSI6IjAwYzM4NTJiLTg1YjEtNDMxNS04OGIwLWQ0MWMxMTcyYzA0MSIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiZGVmYXVsdC1yb2xlcy1tYXN0ZXIiLCJvZmZsaW5lX2FjY2VzcyIsInVtYV9hdXRob3JpemF0aW9uIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsIm1hbmFnZS1hY2NvdW50LWxpbmtzIiwidmlldy1wcm9maWxlIl19fSwic2NvcGUiOiJvcGVuaWQgZW1haWwgcHJvZmlsZSIsInNpZCI6IjAwYzM4NTJiLTg1YjEtNDMxNS04OGIwLWQ0MWMxMTcyYzA0MSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwicHJlZmVycmVkX3VzZXJuYW1lIjoid2ViIiwiZ2l2ZW5fbmFtZSI6IiIsImZhbWlseV9uYW1lIjoiIn0.AIW_4Qws2wfwxyVg8dgHRT9jB3qNavob2C4mEQIQGl3urzW2jALPx-e51ZwHUb-TXB-X2RPHakonxKnWG6tDIP5aKhiidzXDcr6pDDoYU5DnQhMg1kywyOaMXsjLFjuYN5PAyGUMh6YSOVsg1PzNh-5GrJF44pS47JnB9zk03Pr08napjsZPoRB-5N4GQ49cnx7ePC82Y7YIc-gTew2baqKQPz9_v381Gbm2V38PZDH9KldlcWut7kqQYJFMJ7dkM_entPJn9lFk7R5h5j_06OlQEpWRMQTn9SQ1AYxxmZxBu5XYMKDkn4rzIIVCkdTPJNCt5PvjENjClKFeUA1DOg",
          "content-type": "application/json",
          "sec-ch-ua":
            '"Not(A:Brand";v="99", "Brave";v="133", "Chromium";v="133"',
          "sec-ch-ua-mobile": "?0",
          "sec-ch-ua-platform": '"Linux"',
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-site",
          "sec-gpc": "1",
          "unit-id": "3895",
        },
        referrerPolicy: "same-origin",
        body: '{"searchRoutes":[{"departureStationId":1142,"departureStationName":"BİLECİK YHT","arrivalStationId":48,"arrivalStationName":"İSTANBUL(PENDİK)","departureDate":"27-03-2025 21:00:00"}],"passengerTypeCounts":[{"id":0,"count":2}],"searchReservation":false,"searchType":"DOMESTIC"}',
        method: "POST",
      }
    );
    const json = await result.json();
    return json.trainLegs[0].trainAvailabilities as Root;
  } catch (error) {
    console.error("something went wrong while fetching the trains");
    console.log(error);
  }
}

async function readTrains() {
  const file = fs.readFileSync("result.json", { encoding: "utf8" });
  const json = JSON.parse(file) as Root;
  return json;
}

// const isTesting = process.env.NODE_ENV === "development";
const isTesting = false;

const prepareTrains = async () => {
  const func = isTesting ? readTrains : fetchTrains;
  const trains = await func();
  if (!trains) {
    throw new Error("cannot reach to trains");
  }
  const availableTrains = trains
    .map((x) => {
      const item = x.trains[0];
      const segmentCount = item.segments.length;
      const start = item.segments[0];
      const end = item.segments[segmentCount - 1];

      const seats: Record<SeatType, number> = {
        BUSİNESS: 0,
        EKONOMİ: 0,
        "TEKERLEKLİ SANDALYE": 0,
      };

      item.cars.forEach((x) => {
        x.availabilities.forEach((av) => {
          const code = (av.cabinClass?.name ?? "") as SeatType;
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
        date: new Date(item.trainDate).toISOString().split("T")[0],
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
      const targetTime = new Date("2025-03-28T17:00:00").getTime();
      return targetTime < x.start.timeRaw;
    });

  const finalTrains = availableTrains.filter(
    (x) => x.seats["BUSİNESS"] + x.seats["EKONOMİ"] > 0
  );

  return finalTrains;
};

function log(str: string) {
  const msg = `${new Date().toISOString()} - ${str}\n`;
  console.log(msg);
}
