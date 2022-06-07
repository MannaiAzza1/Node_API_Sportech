module.exports = (mongoose) => {
  const Stat = mongoose.model(
    "Stat",
    mongoose.Schema({
      type: String,
      unit: String,
      desc:String,
      title:String,
      scale: String,
      link: String,
      isVisible: Boolean,
      program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "programs",
      },
    })
  );
  return Stat;
};
