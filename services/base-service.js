module.exports = class Service {
	constructor(model, dbPath) {
		this.model = model;
		this.dbPath = dbPath;
	}
	async findAll() {
		// ! return this.model.find().populate('meetups'); ! Brings the all details of the meetups.
		return this.model.find();
	}

	async add(item) {
		return this.model.create(item);
	}

	async delete(itemId) {
		return this.model.deleteOne({ _id: itemId });
	}

	async find(itemId) {
		return this.model.findById(itemId);
	}

	async findBySlug({slug: itemSlug}) {
		return this.model.findOne({ slug: itemSlug });
	}
};
