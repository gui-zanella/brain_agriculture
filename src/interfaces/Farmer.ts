export interface Crop {
    farmId: number;
    id: number;
    name: string;
    cropArea: number;
    cropTypeId: number;
}

export interface Farm {
    farmerId: number;
    id: number;
    name: string;
    city: string;
    state: string;
    arableArea: number;
    vegetationArea: number;
    totalArea: number;
    crops: Crop[];
}

export interface Farmer {
    name: string;
    cpfOrCnpj: string;

    farms: Farm[];

}