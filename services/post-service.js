const BaseService = require('./base-service');
const PostModel = require('../models/post');
class PostService extends BaseService {
	/* constructor() {
		model = PostModel;
	} */
	/* constructor(model) {
		model = PostModel;
	} */
  model = PostModel;
}
module.exports = new PostService();
