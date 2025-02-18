const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const roomSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    messages: {
      type: [messageSchema],
      default: [],
    },
  },
  { timestamps: true }
);

const namespaceSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    required: true,
  },
  rooms: {
    type: [roomSchema],
    default: [],
  },
});

const NamespaceModel = mongoose.model("Namespace", namespaceSchema);

module.exports = NamespaceModel;
