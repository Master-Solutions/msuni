import ResourceInfo from '../../../src/aspects/ResourceManagement/ResourceInfo';
import { ResourceManager } from '../../../src/aspects/ResourceManagement/ResourceManager';

describe('ResourceManager', () => {
	let rm;

	beforeEach(() => {
		rm = new ResourceManager();
	});

	it('#initialize', () => {
		expect(rm.store.length).toBe(0);
	});

	it('#add', () => {
		const ri = new ResourceInfo('testId', 'testType', '123');
		rm.add(ri);
		expect(rm.store[0]).toBe(ri);
	});
});
