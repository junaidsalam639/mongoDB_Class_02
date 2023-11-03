const app = require('express');
const router = app.Router();
const userModel = require('../Schema/user');
const bcrypt = require('bcrypt');

router.post('/' , async (req , res) => {
    console.log('body console----->' , req.body);
    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(req.body.password , salt);
    req.body.password = hash
    console.log('hash password-----> ', hash);
    const user = await userModel.create({...req.body})
    res.send({
        status : 200,
        user : user,
        msg : 'Post Called on User Route',
    });
});


router.get('/' , async (req , res) => {
    console.log('body query----->' , req.query);
    const user = await userModel.find();
    res.send({
        status : 200,
        user : user,
        msg : 'Get Called on User Route',
    });
})

router.put('/:id' , async (req , res) => {
    console.log('body params----->' , req.params.id);
    const user = await userModel.findByIdAndUpdate(req.params.id, {...req.body});
    res.send('put Called on User Route');
})


router.delete('/:id' , async (req , res) => {
    console.log('body params----->' , req.params.id);
    const user = await userModel.findByIdAndDelete(req.params.id)
    res.send('delete Called on User Route');
})

module.exports = router

