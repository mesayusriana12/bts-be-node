require('dotenv').config({ path: require('find-config')('.env') })
const { Op } = require('sequelize')

const db = require('../models')
const Checklist = db.checklist
const ChecklistItem = db.checklistItem

exports.all = async (req, res) => {
  const userId = req.user.id

  const all = await Checklist.findAll({
    where: {
      userId: userId
    }
  }).then((checklists) => {
    res.status(200).json({
      status: 200,
      message: 'All Checklist.',
      data: checklists
    })
  }).catch((err) => {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error.',
      error: err
    })
  })
}

exports.store = async (req, res) => {
  const userId = req.user.id
  const { name } = req.body

  if (! name) {
    return res.status(400).json({
      status: 400,
      message: 'Please insert a name for the checklist.',
    })
  }

  const checklist = await Checklist.create({
    name: name,
    userId: userId
  }).then((checklist) => {
    res.status(201).json({
      status: 201,
      message: 'Checklist created.',
      data: checklist
    })
  }).catch((err) => {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error.',
      error: err
    })
  })
}

exports.delete = async (req, res) => {
  const userId = req.user.id
  const { checklistId } = req.params

  if (!checklistId) {
    return res.status(400).json({
      status: 400,
      message: 'Please insert the checklist ID.',
    })
  }

  const checklist = await Checklist.findOne({ where: { id: checklistId } })

  if (!checklist) {
    return res.status(404).json({
      status: 404,
      message: 'Checklist not found.',
    })
  }

  if (checklist.userId !== userId) {
    return res.status(403).json({
      status: 403,
      message: 'You are not authorized to delete this checklist.',
    })
  }

  const items = await ChecklistItem.findAll({ where: { checklistId: checklistId } })
  if (items.length > 0) {
    return res.status(403).json({
      status: 403,
      message: 'Checklist has items. Please delete the items first.',
    })
  }

  await Checklist.destroy({ where: { id: checklistId } })
  .then(() => {
    res.status(200).json({
      status: 200,
      message: 'Checklist deleted.',
    })
  }).catch((err) => {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error.',
      error: err
    })
  })
}