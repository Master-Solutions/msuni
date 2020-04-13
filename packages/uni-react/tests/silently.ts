/* eslint-disable */
export const silentlyMock = () => {
	const spy = jest.spyOn(console, 'error');

	spy.mockImplementation(() => {});
	return spy;
};

export const silentlyRestore = (spy) => {
	spy.mockRestore();
};

export const silently = (fn) => {
	const spy = silentlyMock();

	try {
		fn();
	} finally {
		silentlyRestore(spy);
	}
};
