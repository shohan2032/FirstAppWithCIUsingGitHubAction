/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UserController from '#controllers/UserController'
import router from '@adonisjs/core/services/router'

router.get('/test1', async () => {
  return {
    "id": 1,
    "name": 'john',
    "password": 'dummy',
  }
})


router.get('/users', [UserController, 'index']) // Get all users
router.post('/users', [UserController, 'store']) // Create a user
router.get('/users/:id', [UserController, 'show']) // Get a single user
router.put('/users/:id', [UserController, 'update']) // Update a user
router.delete('/users/:id', [UserController, 'destroy']) //