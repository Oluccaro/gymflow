import { Modality } from "./modalityModel";

export type Deal = {
    id: number;
    description: string;
    price: number;
    chargeInterval: number;
    startDate: string;
    endDate: string;
    intervalNumber: number;
    intervalUnit: string;
    modalities: Modality[];
  };
  