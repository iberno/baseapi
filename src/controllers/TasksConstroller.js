const express = require('express')
const authMiddleware = require('../middlware/AuthMiddleware')

const router = express.Router();

router.use(authMiddleware);

router.get('/', (req, res) => {
  res.send({ message: 'Rota com autenticação requirida!' })
})

module.exports = app => app.use('/tasks', router)