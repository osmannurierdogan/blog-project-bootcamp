const mongoose = require('mongoose');

const main = async () => {
	await mongoose.connect('mongodb://localhost:27017/bootcamp-blog', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	console.log("Connected to MongoDB");
};
main();
