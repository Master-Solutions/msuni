interface Constructable<T> {
   new (...args: any[]): T;
}

export interface ContextConstructor {
   new (options: any): Context;
}

export interface Context {}
