import mongoose from "mongoose";

const heroSchema = new mongoose.Schema(
  {
  badge: {
    type: String,
    default: "",
    trim: true,
  },

  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 120,
  },

  description: {
    type: String,
    default: "",
    trim: true,
    maxlength: 400,
  },

  image: {
    url: {
      type: String,
      default: "",
    },
    publicId: {
      type: String,
      default: "",
    },
  },

  cta: {
    text: String,
    type: {
      type: String,
      enum: [
        "product",
        "category",
        "store",
        "external"
      ],
      default: "external"
    },
    value: String
  },

  order: {
    type: Number,
    required: true
  },

  status: {
    type: String,
    enum: [
      "active",
      "inactive",
      "deleted"
    ],
    default: "active"
  },

  startDate: Date,

  endDate: Date
}, {
  timestamps: true
}
);

heroSchema.index({ order: 1 });
heroSchema.index({ status: 1 });
heroSchema.index({ startDate: 1, endDate: 1 });

export default mongoose.model("Hero", heroSchema);