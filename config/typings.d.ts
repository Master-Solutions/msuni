declare module '*.json' {
	const value: any;
	export default value;
}
declare module '*.scss' {
	const content: any;
	export default content;
}
declare module '*.css' {
	interface ClassNames {
		[className: string]: string;
	}
	const classNames: ClassNames;
	export = classNames;
}
