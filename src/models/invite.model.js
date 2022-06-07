module.exports = mongoose => {
    const Invite = mongoose.model(
      "Invite",
      mongoose.Schema(
        {
          state:String,
          coach:
          {
              type:mongoose.Schema.Types.ObjectId,
          },
          player: 
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Player"
            }
          

        },
        
      )
    );
    return Invite;
  };