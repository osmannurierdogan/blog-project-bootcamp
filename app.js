const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const PORT = process.env.PORT || 3000;
const app = express();
require('./mongodb-connection');

const PostService = require('./services/post-service');
//const PostModel = require('./models/post');

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

app.get('/', async (req, res) => {
	const renderedPosts = await PostService.findAll();
	res.render('home', {
		homeStartingContent: homeStartingContent,
		posts: renderedPosts,
	});
});
/* app.get('/home', (req, res) => {
	res.render('home', {
		homeStartingContent: homeStartingContent,
		posts: posts,
	});
}); */
app.get('/contact', (req, res) => {
	res.render('contact', { contactContent: contactContent });
});
app.get('/about', (req, res) => {
	res.render('about', { aboutContent: aboutContent });
});
app.get('/compose', (req, res) => {
	res.render('compose');
});

app.post('/compose', async (req, res) => {
	const slug = _.kebabCase(req.body.postTitle);
	const post = await PostService.add({
		title: req.body.postTitle,
		slug: slug,
		content: req.body.postText,
	});
	res.redirect('/');
});

app.get('/posts', async (req, res) => {
	const posts = await PostService.findAll();
	res.render('posts', { posts: posts });
});
app.get('/posts/:id', async (req, res) => {
	const post = await PostService.find(req.params.id);
	res.render('post', { post: post });
});

/* 
TODO
  app.get('/posts/:slug', async (req, res) => {
	//const parameterTitle = _.toLower();
	const post = await PostService.findBySlug(req.params.slug);
	res.render('post', { post: post });
}); */

app.listen(PORT, () => {
	console.log(`Server is running on ${PORT}...`);
});
