const db = require("../models");
const Competence = db.competences;
const Player = db.players;
// Create
exports.create = (req, res) => {
  if (!req.body.desc) {
    res.status(400).send({ message: "Description can not be empty!" });
    return;
  }

  const competence = new Competence({
    nb_stars: req.body.nb_stars,
    title: req.body.title,
    desc: req.body.desc,
    link: req.body.link,
    isVisible: req.body.isVisible ? req.body.isVisible : false,
    players:req.body.players,
    
  });

  competence.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    
    res.send({
      message: "added!",
      title: competence.title,
      description: competence.desc,
      link : competence.link,
      players :competence.players
          });
    
    
  });
};
// Retrieve
exports.findAll = (req, res) => {
  const type = req.query.title;
  var condition = type
    ? { title: { $regex: new RegExp(type), $options: "i" } }
    : {};
  Competence.find(condition)
    .then((data) => {
      res.send(data);
      console.log(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving stats.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Competence.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Competence with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Competence with id=" + id });
    });
};

exports.update = async (req, res) => {
  if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
    const id = req.params.id;
    Competence.findByIdAndUpdate(id, req.body, { useFindAndModify: false , new:true })
      .then(data => {
        if (!data) {
          res.status(404).send(`Cannot update Competence with id=${id}. Maybe  not found!`
          );
          
        } 
        if(data)
        {res.send(data)}
      })
      .catch(err => {
        res.status(500).send(
           "Error updating Competence with id=" + id
        );
      });
      

};
exports.delete = (req, res) => {
  const id = req.params.id;
  Competence.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Competence with id=${id}. Maybe Competence was not found!`,
        });
      } else {
        res.send("Competence was deleted successfully!",
        );
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Competence with id=" + id,
      });
    });
};
// Delete all
exports.deleteAll = (req, res) => {
  Competence.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Competences were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Competences.",
      });
    });
};
// Find all Visible Stats
exports.findAllVisible = (req, res) => {
  Competence.find({ isVisible: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Stats.",
      });
    });
};
