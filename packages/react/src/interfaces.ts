interface IConstructable<T> {
    new(...args: any[]): T;
}


export interface IContextConstructor {
    new (options: any): IContext;
}

export interface IContext {
}