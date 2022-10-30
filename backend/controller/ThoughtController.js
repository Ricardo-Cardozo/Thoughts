const Thought = require('../model/Thought')

module.exports = class ThoughtController {
  static async register(req,res) {
    const {title, description} = req.body
    const thought = new Thought({
      title, description
    })
    
    //validation
    if (!title || !description) {
      return res.status(422).json({message: 'Title and description are required!'})
    }

    const titleExists = await Thought.findOne({title: title})
    if (titleExists) {
      return res.status(422).json({message: 'Thought already exists!'})
    }

    try {
      await thought.save()
      res.status(200).json({message: 'User registered with success!'})
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Ocurred an error, try later!'})
    }
  }

  static async getAll(req, res) {
    const thoughts = await Thought.find().sort('-createdAt')
    if (thoughts.length === 0) {
      return res.status(422).json({message: 'Not found thoughts, make a register!'})
    }
    try {
      res.status(200).json({
        thoughts
      })
    } catch (error) {
      res.status(500).json({message: "Ocurred an error, try later!"})
    }
  }

  static async update(req, res) {
    const id = req.params.id
    const { title, description } = req.body

    const thought = {title, description}

    if (!title || !description) {
      return res.status(422).json({message: 'Title and description are required!'})
    }

    const titleExists = await Thought.findOne({title: title})
    if (titleExists) {
      return res.status(422).json({message: 'Thought already exists!'})
    }

    try {
      await Thought.findByIdAndUpdate(id, thought)
      res.status(200).json({message: 'Update with success!'})
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Ocurred an error, try later!'})
    }
  }

  static async delete(req, res) {
    const id = req.params.id

    try {
      await Thought.findByIdAndDelete(id)
      res.status(200).json({message: 'Delete with success!'})
    } catch (error) {
      console.log(error)
      res.status(500).json({message: 'Ocurred an error, try later!'})
    }
  }

  static async search(req, res) {
    const search = req.params.key
    let data = await Thought.find({'$or': [{title: {$regex: search}}]})
    
    if (data.length === 0 || !data) {
      return res.status(404).json({message: 'Thought not found!'})
    }
    res.status(200).json({data: data})

  }

  static async getUpdate(req, res) {
    const id = req.params.id
    const thought = await Thought.findOne({_id: id})
    res.status(200).json({thought})
  }
}