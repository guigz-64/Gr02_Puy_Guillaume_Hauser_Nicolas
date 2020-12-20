const express = require("express")
let db = require("../lib/db");

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const messages = await db.messages.list()
    res.json(messages)
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res) => {
  try {
    const message = await db.messages.create(req.body)
    res.status(201).json(message)
  } catch (error) {
    console.log(error)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const message = await db.messages.get(req.params.id)
    res.json(message)
  } catch (error) {
    console.log(error)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const message = await db.messages.update(req.body)
    res.json(message)
  } catch (error) {
    console.log(error);
  }
})

module.exports = router