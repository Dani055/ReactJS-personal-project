const router = require('express').Router();
const feedController = require('../controllers/feed');
const isAuth = require('../middleware/is-auth');

router.get('/cars', feedController.getCars);
router.post('/car/create', feedController.createCar);
router.post('/car/rent/:carId', feedController.rentCar);
router.get('/cars/myrents', feedController.getMyRents);
router.get('/car/edit/:carId', feedController.getCarById);
router.post('/car/edit/:carId', feedController.editCar);
router.post('/car/delete/:carId', feedController.deleteCar);
router.post('/car/unrent/:carId', feedController.removeRent);
module.exports = router;