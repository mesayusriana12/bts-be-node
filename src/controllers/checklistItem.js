require('dotenv').config({ path: require('find-config')('.env') })
const { Op } = require('sequelize')

const db = require('../models')
const ChecklistItem = db.checklistItem

exports.getAll = async (req, res) => {
  const { checklistId } = req.params

  const all = await ChecklistItem.findAll({
    where: {
      checklistId: checklistId
    }
  }).then((checklistItems) => {
    res.status(200).json({
      status: 200,
      message: 'All Checklist Items.',
      data: checklistItems
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
  const { itemName } = req.body
  const { checklistId } = req.params

  if (! itemName) {
    return res.status(400).json({
      status: 400,
      message: 'Please insert a name for the checklist item.',
    })
  }

  const checklistItem = await ChecklistItem.create({
    itemName: itemName,
    checklistId: checklistId
  }).then((checklistItem) => {
    res.status(201).json({
      status: 201,
      message: 'Checklist Item created.',
      data: checklistItem
    })
  }).catch((err) => {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error.',
      error: err
    })
  })
}

exports.getOne = async (req, res) => {
  const { checklistItemId } = req.params

  const one = await ChecklistItem.findOne({
    where: {
      id: checklistItemId
    }
  }).then((checklistItem) => {
    res.status(200).json({
      status: 200,
      message: 'Checklist Item.',
      data: checklistItem
    })
  }).catch((err) => {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error.',
      error: err
    })
  })
}

exports.markAsDone = async (req, res) => {
  const { checklistId, checklistItemId } = req.params

  const checklistItem = await ChecklistItem.update({
    isDone: true
  }, {
    where: {
      id: checklistItemId,
      checklistId: checklistId
    }
  }).then((checklistItem) => {
    res.status(200).json({
      status: 200,
      message: 'Checklist Item marked as done.',
      data: checklistItem
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
  const { checklistId, checklistItemId } = req.params
  
  const find = await ChecklistItem.findOne({
    where: {
      id: checklistItemId,
      checklistId: checklistId
    }
  })

  // Check if the checklist item exists
  if (!find) {
    return res.status(404).json({
      status: 404,
      message: 'Checklist Item not found.',
    })
  }

  const checklistItem = await find.destroy({
    where: {
      id: checklistItemId,
      checklistId: checklistId
    }
  }).then((checklistItem) => {
    res.status(200).json({
      status: 200,
      message: 'Checklist Item deleted.',
      data: checklistItem
    })
  }).catch((err) => {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error.',
      error: err
    })
  })
}

exports.rename = async (req, res) => {
  const { checklistId, checklistItemId } = req.params
  const { itemName } = req.body

  if (! itemName) {
    return res.status(400).json({
      status: 400,
      message: 'Please insert a name for the checklist item.',
    })
  }

  const find = await ChecklistItem.findOne({
    where: {
      id: checklistItemId,
      checklistId: checklistId
    }
  })

  const checklistItem = await find.update({
    itemName: itemName
  }, {
    where: {
      id: checklistItemId,
      checklistId: checklistId
    }
  }).then((checklistItem) => {
    res.status(200).json({
      status: 200,
      message: 'Checklist Item renamed.',
      data: find
    })
  }).catch((err) => {
    res.status(500).json({
      status: 500,
      message: 'Internal Server Error.',
      error: err
    })
  })
}