export type MenuItemType = {
	name: string;
	title?: string;
	type?: string;
	icon?: string;
	items?: MenuItemType[];

	state?: object;
	data?: object;
};
