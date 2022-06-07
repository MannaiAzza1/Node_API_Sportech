const db = require("../models");
const Stat = db.stats;
// Create 
exports.create = async (req, res) => {
      
  if (!req.body.type) {
    res.status(400).send({ message: "Type can not be empty!" });
    return;
  }
  
  const stat = new Stat({
    title:req.body.title,
    desc:req.body.desc,
    type: req.body.type,
    unit: req.body.unit,
    scale: req.body.scale,
    link:req.body.link,
    isVisible: req.body.isVisible ? req.body.isVisible : false
  });
  stat
    .save(stat)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Stat"
      });
    });
  
};
// Retrieve 
exports.findAll = async (req, res) => {
    const type = req.query.title;
    var condition = type ? { title: { $regex: new RegExp(type), $options: "i" } } : {};
    Stat.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving stats."
        });
      });
  
};

exports.findOne = async (req, res) => {
    const id = req.params.id;
  Stat.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Stat with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Stat with id=" + id });
    });
  
};

exports.update = async (req, res) => {
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
      const id = req.params.id;
      Stat.findByIdAndUpdate(id, req.body,{ useFindAndModify: false , new:true })
        .then(data => {
          if (!data) {
            res.status(404).send({
              message: `Cannot update stat with id=${id}. Maybe  not found!`
            });
          } else res.send(data);
        })
        .catch(err => {
          res.status(500).send({
            message: "Error updating Stat with id=" + id
          });
        });
  
};

exports.delete = async (req, res) => {
    const id = req.params.id;
  Stat.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Stat with id=${id}. Maybe Stat was not found!`
        });
      } else {
        res.send({
          message: "Stat was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Stat with id=" + id
      });
    });
  
};
// Delete all 
exports.deleteAll = async (req, res) => {
    Stat.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Stats were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Stats."
      });
    });
  
};
// Find all Visible Stats
exports.findAllVisible = (req, res) => {
    Stat.find({ isVisible: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Stats."
      });
    });
  
};