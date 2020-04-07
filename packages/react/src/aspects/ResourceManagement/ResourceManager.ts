import ResourceInfo from "./ResourceInfo";
import {Predicate} from "../../types";

export interface IResourceManager {
    find(findOptions: Predicate<ResourceInfo>): ResourceInfo[]
    findByType(type: string): ResourceInfo[]

    findOne(findOptions: Predicate<ResourceInfo>): ResourceInfo
    findByTypeAndId(type: string, id: string): ResourceInfo

    add(ri: ResourceInfo): ResourceInfo
}

export class ResourceManager implements IResourceManager {
    readonly store: ResourceInfo[];

    constructor() {
        this.store = [];
    }

    find(findOptions?: Predicate<ResourceInfo>): ResourceInfo[] {
        return this.store.filter(findOptions);
    }

    findByType(type: string): ResourceInfo[] {
        return this.find((ri) => ri.type === type);
    }

    findOne(findOptions?: Predicate<ResourceInfo>): ResourceInfo {
        return this.store.find(findOptions);
    }

    findByTypeAndId(type: string, id: string): ResourceInfo {
        return this.findOne((ri) => ri.type === type && ri.id === id);
    }

    add(ri: ResourceInfo): ResourceInfo {
        this.store.push(ri);
        return ri;
    }
}