const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set(express.static('public'));

app.set('view engine', 'pug');

const homeStartingContent =
	'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia suscipit molestiae rerum temporibus molestias. Reiciendis natus nisi error perspiciatis quis fuga, nemo quod vero quia? Magnam alias officia ea soluta? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia suscipit molestiae rerum temporibus molestias. Reiciendis natus nisi error perspiciatis quis fuga, nemo quod vero quia? Magnam alias officia ea soluta?';
const aboutContent =
	'Deserunt culpa minima iusto ullam, modi, beatae quae perferendis reiciendis obcaecati illo ex debitis, eaque laudantium magni totam ut ratione voluptas sunt! voluptate? Quasi optio dolor asperiores a laudantium est? Deserunt culpa minima iusto ullam, modi, beatae quae perferendis reiciendis obcaecati illo ex debitis, eaque laudantium magni totam ut ratione voluptas sunt! voluptate? Quasi optio dolor asperiores a laudantium est?';
const contactContent =
	'Doloribus, veniam recusandae! Nihil, assumenda veritatis dolorem corporis, ad quae libero temporibus neque incidunt sed debitis reiciendis natus facere, cumque doloremque dolor ab molestiae similique quam nobis amet? Ipsa, numquam. Doloribus, veniam recusandae! Nihil, assumenda veritatis dolorem corporis, ad quae libero temporibus neque incidunt sed debitis reiciendis natus facere, cumque doloremque dolor ab molestiae similique quam nobis amet? Ipsa, numquam.';
const posts = [];

app.get('/', (req, res) => {
	/* posts.forEach(post => {
		let previewText = '';
		if(post.content.length > 100){
			previewText = post.content.substring(0, 100) + "...";
		}
		// console.log('previewText :>> ', previewText);
	}); */
	res.render('home', {
		homeStartingContent: homeStartingContent,
		posts: posts,
	});
});
app.get('/home', (req, res) => {
	res.render('home', {
		homeStartingContent: homeStartingContent,
		posts: posts,
	});
});
app.get('/contact', (req, res) => {
	res.render('contact', { contactContent: contactContent });
});
app.get('/about', (req, res) => {
	res.render('about', { aboutContent: aboutContent });
});
app.get('/compose', (req, res) => {
	res.render('compose');
});
app.post('/compose', (req, res) => {
	// console.log('res :>> ', res);
	// res.render('index', { response: req.body.postTitle });
	/* const postTitle = req.body.postTitle;
  const postText = req.body.postText;
  res.send(postTitle + postText); */
	const post = {
		title: req.body.postTitle,
		content: req.body.postText,
	};
	posts.push(post);
	/* res.render('post', {
		postTitle: req.body.postTitle,
		postText: req.body.postText,
	}); */
	// console.log('posts :>> ', posts);
	// res.render('post', post);
	res.redirect('/');
});
app.get('/posts', (req, res) => {
	res.render('posts', { posts: posts });
});
app.get('/posts/:title', (req, res) => {
	const requestedPostTitle = _.lowerCase(req.params.title);
	// ! const requestedPostTitle = req.params.title.toLowerCase();
	//const filteredPost = posts.filter(post => post.title === requestedPostTitle);
	let newPost = {};
	posts.forEach((post) => {
		const searchedTitle = _.lowerCase(post.title);
		if (searchedTitle === requestedPostTitle) {
			// ! if (post.title.toLowerCase() === requestedPostTitle) {
			newPost = {
				title: post.title,
				content: post.content,
			};
			res.render('post', { newPost: newPost });
		} else {
			res.render('error');
		}
	});
});

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}...`);
});
