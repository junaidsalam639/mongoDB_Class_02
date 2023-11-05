const app = require('express');
const router = app.Router();
const blogModel = require('../Schema/blog');
const sendResponse = require('../helpers/sendResponse');

router.post('/', async (req, res) => {
    try {
        console.log('body console----->', req.body);
        const blog = await blogModel.create({ ...req.body });
        sendResponse(res, 200, blog, 'Blog_Add', false);
    } catch (err) {
        sendResponse(res, 400, null, 'Blog_Not_Found', true);
    }
});


router.get('/', async (req, res) => {
    try {
        const blog = await blogModel.find().populate('user').exec();
        console.log('All_Blogs---->',blog)
        sendResponse(res, 200, blog, 'Blog_Get_All', false);
    } catch (err) {
        sendResponse(res, 400, null, 'Blog_Not_Found', true);
    }
})

router.put('/:id', async (req, res) => {
    try {
        console.log('body params----->', req.params.id);
        const blog = await blogModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
        sendResponse(res, 200, blog, 'Blog_Updated', false);
    } catch (err) {
        sendResponse(res, 400, null, 'Blog_Not_Found', true);
    }
})


router.delete('/:id', async (req, res) => {
    try {
        console.log('body params----->', req.params.id);
        const blog = await blogModel.findByIdAndDelete(req.params.id)
        sendResponse(res, 200, blog, 'Blog_Delete', false);
    } catch (err) {
        sendResponse(res, 400, null, 'Blog_Not_Found', true);
    }
})

module.exports = router

