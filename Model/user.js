const app = require('express');
const router = app.Router();

router.post('/' , (req , res) => {
    console.log('body console----->' , req.body);
    res.send('Post Called on User Route');
})

router.get('/' , (req , res) => {
    console.log('body query----->' , req.query);
    res.send('Get Called on User Route');
})

router.put('/:id' , (req , res) => {
    console.log('body params----->' , req.params.id);
    res.send('put Called on User Route');
})


router.delete('/:id' , (req , res) => {
    console.log('body params----->' , req.params.id);
    res.send('delete Called on User Route');
})

module.exports = router