const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/', Controller.home)
router.get('/join', Controller.joinGet)
router.post('/profile/:id/detail', Controller.joinPost)
router.get('/profile/:id/detail', Controller.profilGet)
router.get('/profile/:id/edit', Controller.update)
router.post('/profile/:id/edit', Controller.updatePost)
router.post('/home/:id', Controller.loginPost)
router.get('/home/:id', Controller.getHome)
router.post('/post/:id', Controller.postImg)
router.post('/post/:id/profil', Controller.postImgProfile)
router.get('/post/:id/delete', Controller.delete)


module.exports = router