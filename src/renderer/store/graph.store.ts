import { action, computed, observable } from 'mobx';
import { Store } from './init';
import { EssentialProfileInput } from '../../mods/calculation/profile.maths';

export enum GraphProcessingStatus {
    Idle,
    Processing,
    Error,
    Success
}

export interface ProfileStatusUIStates {
    profilesToCompare: string[];
}

export interface GraphData {
    key: string;
    status: GraphProcessingStatus;
    data: any[];
}

export class GraphStore {
    protected root: Store;

    @observable public data: GraphData[] = [];

    @observable public profiles: ProfileStatusUIStates = {
        profilesToCompare: []
    };

    constructor(root: Store) {
        this.root = root;
    }

    @computed
    get profileStatusTableData() {
        // todo
        return [];
    }

    @action
    public getProfileViaKey(key: string): EssentialProfileInput {
        return {} as any;
    }

    @action
    public resetUI() {
        this.profiles.profilesToCompare = [];
    }

    @action
    public updateStatus(key: string, status: GraphProcessingStatus) {
        // todo
    }

    @action
    public compareThem(keys: string[]) {
        this.profiles.profilesToCompare = keys;
    }
}
