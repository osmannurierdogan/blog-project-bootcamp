const mongoose = require('mongoose');

const main = async () => {
	//await mongoose.connect('mongodb://localhost:27017/bootcamp-blog', {
	await mongoose.connect(
		'mongodb://quiet-liger-2d1b66.netlify.app/bootcamp-blog',
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
	);
	console.log("Connected to MongoDB");
};
main();
