import mongoose  from "mongoose";


const userSchema = new mongoose.Schema({
  name: {
  type: String,
  required: true,
  trim: true,
  minlength: 2,
  maxlength: 60
},
email: {
  type: String,
  required: true,
  unique: true,
  lowercase: true,
  trim: true
},
passwordHash: {
  type: String,
  select: false
},
role: {
  type: String,
  enum: [
    "customer",
    "vendor",
    "admin",
    "super_admin"
  ],
  default: "customer"
},
authProviders: {
  type: [String],
  enum: ["local", "google"],
  default: ["local"]
},
emailVerified: {
  type: Boolean,
  default: false
},
phone: {
  type: String,
  default: null
},
avatarUrl: {
  type: String,
  default: null
},
permissionsOverride: {
  type: [String],
  default: []
},
status: {
  type: String,
  enum: [
    "active",
    "suspended",
    "deleted"
  ],
  default: "active"
},
lastLoginAt: {
  type: Date,
  default: null
},
refreshTokenHashes: {
  type: [String],
  default: []
},
emailOtpHash: {
  type: String,
  default: null,
  select: false
},
emailOtpExpiresAt: {
  type: Date,
  default: null
},
resetPasswordOtpHash: {
  type: String,
  default: null,
  select: false
},

resetPasswordOtpExpiresAt: {
  type: Date,
  default: null,
},
}, {timestamps: true})



const User = mongoose.model('User', userSchema);

export default User;