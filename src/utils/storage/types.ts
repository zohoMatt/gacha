/** ****************** Common ****************** */
import { EssentialProfileInput } from '../../mods/calculation/types';

export interface QuantityValue {
    value: number;
    unit: string;
}

export interface Params<T> {
    params: T;
}

export interface KeyID {
    key: string;
}

export interface BasicInfo {
    name: string;
    description: string;
    manufacturer?: string;
}

export interface RecordStatus {
    draft?: boolean;
    cited?: string[];
    valid?: boolean;
    processed?: GraphProcessingStatus;
}

// Used to store into local files
export type FullRecordType<T> = KeyID & BasicInfo & Params<T> & RecordStatus;

export interface StorageDataStructure<T> {
    version: string;
    data: T[];
}

export interface StorageInitOptions<T> {
    filename: string;
    defaultStore?: StorageDataStructure<T>;
}

/** ******** Contaminants ********* */

export interface ContaminantParams {
    fullName: string;
    molecularWeight: QuantityValue; // mg/mmol
    molarVolume: QuantityValue; // mL/gmol
    boilingPt: QuantityValue; // ℃
    liquidDensity: QuantityValue; // g/mL
    solubility: QuantityValue; // mg/L
    vaporPressure: QuantityValue; // Pa
    refractive: QuantityValue;
    cas: string;
}

export type ContaminantData = FullRecordType<ContaminantParams>;

/** ******** Adsorbents ********* */

export interface AdsorbentParams {
    density: QuantityValue; // g/cm^3
    particleRadius: QuantityValue; // cm
    particlePorosity: QuantityValue; // no unit
    adsorbentType: string;
}

export type AdsorbentData = FullRecordType<AdsorbentParams>;

/** ******** Experimental Profiles ********* */

export interface WaterInputParams {
    pressure: QuantityValue; // atm
    temperature: QuantityValue; // ℃
    useDensity: boolean; // g/cm^3
    useViscosity: boolean; // g/cm.s
}

export interface PsdmInputParams {
    totalRunTime: QuantityValue; // d
    firstPointDisplayed: QuantityValue; // d
    timeStep: QuantityValue; // d
    numOfAxialElms: number;
    axialCollocatPts: number;
    radialCollocatPts: number;
}

export interface BedInputParams {
    adsorbent: string | null;
    length: QuantityValue; // cm
    diameter: QuantityValue; // cm
    mass: QuantityValue; // g
    flowrate: QuantityValue; // mL/min
}

export interface CorrelationOrInput extends QuantityValue {
    correlation: boolean;
    // value is ignored when correlation === true
}

export interface AdsorptionInputParams {
    contaminant: string | null;
    initConcent: QuantityValue; // ug/L
    freundlich: {
        k: QuantityValue;
        nth: QuantityValue;
    };
    kinetics: {
        filmDiffusion: CorrelationOrInput; // cm/s,
        surfaceDiffusion: CorrelationOrInput; // cm^2/s
        poreDiffusion: CorrelationOrInput; // cm^2/s
        spdfr: QuantityValue;
        tortuosity: QuantityValue;
    };
}

export interface ExpProfileParams {
    water: WaterInputParams;
    psdm: PsdmInputParams;
    bed: BedInputParams;
    adsorption: AdsorptionInputParams;
}

export type ProfileData = FullRecordType<ExpProfileParams>;

/** ****************** Graph Data ****************** */

export enum GraphProcessingStatus {
    Idle,
    Processing,
    Error,
    Success
}

export type ProfileStatusTableData = {
    key: string;
    name: string;
    status: GraphProcessingStatus;
} & EssentialProfileInput;
