export type AnyFunction<A = any> = (...input: any[]) => A;
export type AnyConstructor<A = object> = new (...input: any[]) => A;

export type Mixin<T extends AnyFunction> = InstanceType<ReturnType<T>>;

export type Container<T> = { value: T };

export type Tree<T> = {
   value: T;
   left: Tree<T>;
   right: Tree<T>;
};

export type LinkedList<T> = T & { next: LinkedList<T> };

type Keys = 'option1' | 'option2';
type Flags = { [K in Keys]: boolean };

export type Predicate<T> = (i: T) => boolean;

// type Predicate = (i: any) => boolean;

// const and = (p1: Predicate, p2: Predicate) =>
//     (i: any) => p1(i) && p2(i);
//
// const or = (p1: Predicate, p2: Predicate) =>
//     (i: any) => p1(i) || p2(i);
//
// const not = (p: Predicate) =>
//     (i: any) => !p(i);

// const isNull = (i: any) => i === null;
//
// const isUndefined = (i: any) => i === undefined;
