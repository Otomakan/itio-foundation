export default {
	getInfo: jest.fn().mockResolvedValue(Promise.resolve()),
	password : {
		createPasswordChangeRequest: jest.fn().mockResolvedValue(Promise.resolve()),
	}
}