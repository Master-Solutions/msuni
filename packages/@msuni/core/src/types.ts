export type AnyFunction<A = any> = (...input: any[]) => A
export type AnyConstructor<A = object> = new (...input: any[]) => A

export type Types<T extends AnyFunction> = InstanceType<ReturnType<T>>

