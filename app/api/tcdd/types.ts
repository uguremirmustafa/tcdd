/* eslint-disable @typescript-eslint/no-explicit-any */
export type Root = Root2[];

export interface Root2 {
  trains: Train[];
  totalTripTime: number;
  minPrice: number;
  connection: boolean;
  dayChanged: boolean;
}

export interface Train {
  id: number;
  number: string;
  name: string;
  commercialName: string;
  type: string;
  line: any;
  reversed: boolean;
  scheduleId: number;
  departureStationId: number;
  arrivalStationId: number;
  minPrice: MinPrice;
  reservationLockTime: number;
  reservable: boolean;
  bookingClassCapacities: BookingClassCapacity[];
  segments: Segment[];
  cars: Car[];
  trainSegments: TrainSegment[];
  totalDistance: number;
  availableFareInfo: AvailableFareInfo[];
  cabinClassAvailabilities: CabinClassAvailability[];
  trainDate: number;
  trainNumber: string;
  skipsDay: boolean;
}

export interface MinPrice {
  type: any;
  priceAmount: number;
  priceCurrency: string;
}

export interface BookingClassCapacity {
  id: number;
  trainId: number;
  bookingClassId: number;
  capacity: number;
}

export interface Segment {
  id: number;
  departureTime: number;
  arrivalTime: number;
  stops: boolean;
  duration: number;
  stopDuration: number;
  distance: number;
  segment: Segment2;
}

export interface Segment2 {
  id: number;
  name: string;
  departureStation: DepartureStation;
  arrivalStation: ArrivalStation;
  lineId: number;
  lineOrder: number;
}

export interface DepartureStation {
  id: number;
  stationNumber: string;
  areaCode: number;
  name: string;
  stationStatus: StationStatus;
  stationType: StationType;
  unitId: number;
  cityId: number;
  districtId: number;
  neighbourhoodId: number;
  uicCode: any;
  technicalUnit: string;
  stationChefId: number;
  detail: string;
  showOnQuery: boolean;
  passengerDrop: boolean;
  ticketSaleActive: boolean;
  active: boolean;
  email: string;
  orangeDeskEmail: string;
  address: string;
  longitude: number;
  latitude: number;
  altitude: number;
  startKm: number;
  endKm: number;
  showOnMap: boolean;
  passengerAdmission: boolean;
  disabledAccessibility: boolean;
  phones: any;
  workingDays: any;
  hardwares: any;
  physicalProperties: any;
  stationPlatforms: any;
  salesChannels: any;
  IATACode: any;
}

export interface StationStatus {
  id: number;
  name: any;
  detail: any;
}

export interface StationType {
  id: number;
  name: any;
  detail: any;
}

export interface ArrivalStation {
  id: number;
  stationNumber: string;
  areaCode: number;
  name: string;
  stationStatus: StationStatus2;
  stationType: StationType2;
  unitId: number;
  cityId: number;
  districtId: number;
  neighbourhoodId: number;
  uicCode: any;
  technicalUnit: string;
  stationChefId: number;
  detail: string;
  showOnQuery: boolean;
  passengerDrop: boolean;
  ticketSaleActive: boolean;
  active: boolean;
  email: string;
  orangeDeskEmail: string;
  address: string;
  longitude: number;
  latitude: number;
  altitude: number;
  startKm: number;
  endKm: number;
  showOnMap: boolean;
  passengerAdmission: boolean;
  disabledAccessibility: boolean;
  phones: any;
  workingDays: any;
  hardwares: any;
  physicalProperties: any;
  stationPlatforms: any;
  salesChannels: any;
  IATACode: any;
}

export interface StationStatus2 {
  id: number;
  name: any;
  detail: any;
}

export interface StationType2 {
  id: number;
  name: any;
  detail: any;
}

export interface Car {
  id: number;
  name: string;
  trainId: number;
  templateId: number;
  carIndex: number;
  unlabeled: boolean;
  capacity: number;
  cabinClassId: number;
  availabilities: Availability[];
}

export interface Availability {
  trainCarId: number;
  trainCarName: any;
  cabinClass?: CabinClass;
  availability: number;
  pricingList: PricingList[];
  additionalServices?: AdditionalService2[];
}

export interface CabinClass {
  id: number;
  code: string;
  name: string;
  additionalServices?: AdditionalService[];
  bookingClassModels: any;
  showAvailabilityOnQuery: boolean;
}

export interface AdditionalService {
  id: number;
  additionalServiceTypeId: number;
  name: string;
  description: string;
  code: string;
  active: boolean;
  freeForPermi: boolean;
  actAsGroup: boolean;
  basePrice: BasePrice[];
  pricingPeriods: any;
}

export interface BasePrice {
  id: number;
  additionalServiceId: number;
  type: string;
  priceAmount: number;
  priceCurrency: string;
  startDate: string;
  endDate: string;
}

export interface PricingList {
  basePricingId: number;
  bookingClass: BookingClass;
  cabinClassId: number;
  basePricingType: string;
  fareBasis: FareBasis;
  basePrice: BasePrice2;
  crudePrice: CrudePrice;
  baseTransportationCost: BaseTransportationCost;
  availability: number;
}

export interface BookingClass {
  id: number;
  code: string;
  name: string;
  cabinClass: CabinClass2;
  fareFamily: FareFamily;
}

export interface CabinClass2 {
  id: number;
  code: any;
  name: any;
  additionalServices: any;
  bookingClassModels: any;
  showAvailabilityOnQuery: boolean;
}

export interface FareFamily {
  id: number;
  name: string;
}

export interface FareBasis {
  code: string;
  factor: number;
  price: Price;
}

export interface Price {
  type: any;
  priceAmount: number;
  priceCurrency: string;
}

export interface BasePrice2 {
  type: any;
  priceAmount: number;
  priceCurrency: string;
}

export interface CrudePrice {
  type: any;
  priceAmount: number;
  priceCurrency: string;
}

export interface BaseTransportationCost {
  type: any;
  priceAmount: number;
  priceCurrency: string;
}

export interface AdditionalService2 {
  additionalService: AdditionalService3;
  priceAmount: number;
  currency: string;
}

export interface AdditionalService3 {
  id: number;
  additionalServiceTypeId: number;
  name: string;
  description: string;
  code: string;
  active: boolean;
  freeForPermi: boolean;
  actAsGroup: boolean;
  basePrice: BasePrice3[];
  pricingPeriods: any;
}

export interface BasePrice3 {
  id: number;
  additionalServiceId: number;
  type: string;
  priceAmount: number;
  priceCurrency: string;
  startDate: string;
  endDate: string;
}

export interface TrainSegment {
  departureStationId: number;
  arrivalStationId: number;
  departureTime: string;
  arrivalTime: string;
}

export interface AvailableFareInfo {
  fareFamily: FareFamily2;
  cabinClasses: CabinClass3[];
}

export interface FareFamily2 {
  id: number;
  name: string;
}

export interface CabinClass3 {
  cabinClass: CabinClass4;
  availabilityCount: number;
  minPrice?: number;
  minPriceCurrency?: string;
  bookingClassAvailabilities: BookingClassAvailability[];
}

export interface CabinClass4 {
  id: number;
  code: string;
  name: string;
  additionalServices?: AdditionalService4[];
  bookingClassModels: any;
  showAvailabilityOnQuery: boolean;
}

export interface AdditionalService4 {
  id: number;
  additionalServiceTypeId: number;
  name: string;
  description: string;
  code: string;
  active: boolean;
  freeForPermi: boolean;
  actAsGroup: boolean;
  basePrice: BasePrice4[];
  pricingPeriods: any;
}

export interface BasePrice4 {
  id: number;
  additionalServiceId: number;
  type: string;
  priceAmount: number;
  priceCurrency: string;
  startDate: string;
  endDate: string;
}

export interface BookingClassAvailability {
  bookingClass: BookingClass2;
  price: number;
  currency: string;
  availability: number;
}

export interface BookingClass2 {
  id: number;
  code: string;
  name: string;
  cabinClass: CabinClass5;
  fareFamily: FareFamily3;
}

export interface CabinClass5 {
  id: number;
  code: any;
  name: any;
  additionalServices: any;
  bookingClassModels: any;
  showAvailabilityOnQuery: boolean;
}

export interface FareFamily3 {
  id: number;
  name: string;
}

export interface CabinClassAvailability {
  cabinClass: CabinClass6;
  availabilityCount: number;
}

export interface CabinClass6 {
  id: number;
  code: string;
  name: string;
  additionalServices: any;
  bookingClassModels: any;
  showAvailabilityOnQuery: boolean;
}
