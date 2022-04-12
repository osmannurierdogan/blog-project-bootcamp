const express = require('express');
const router = express.Router();

const PostService = require('../services/Post-service');

router.get('/all', async (req, res) => {
	const Posts = await PostService.findAll();
	res.render('home', { items: Posts });
});

router.get('/:id', async (req, res) => {
	const Post = await PostService.find(req.params.id);
	res.render('data', { data: Post });
});

router.post('/', async (req, res) => {
	const Post = await PostService.add(req.body);
	res.send(Post);
});

router.delete('/:id', async (req, res) => {
	const Post = await PostService.del(req.params.id);
	res.send(Post);
});

module.exports = router;
