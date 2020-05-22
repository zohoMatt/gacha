import { action, computed, observable } from 'mobx';
import { Store } from './init';

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
    profile: string;
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
    resetUI() {
        this.profiles.profilesToCompare = [];
    }

    @action
    updateStatus(key: string, status: GraphProcessingStatus) {
        // todo
    }

    @action
    compareThem(keys: string[]) {
        this.profiles.profilesToCompare = keys;
    }
}
