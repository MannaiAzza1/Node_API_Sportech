module.exports = mongoose => {
    const Competence = mongoose.model(
      "Competence",
      mongoose.Schema(
        {
          nb_stars:Number,
          title:String,
          desc: String,
          link:String,
          isVisible:Boolean,
          players: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Player"
            }
          ]

        },
        
      )
    );
    return Competence;
  };