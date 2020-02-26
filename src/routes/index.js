const app = require('express');
const router = app.Router();

router.get('/', (req, res, next) => {
    res.send('hola mundo')
});

module.exports = router;