import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserDocument extends mongoose.Document {
  comparePassword(candidatePassword: string): Promise<boolean>;
  destroyToken(): string;
  encryptPassword(newPassword: string): Promise<string>;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  firstName: string;
  lastName: string;
  otp: number;
  oldOtp: number;
  role: string;
  refresh_token: string;
  profile: {
    location: string | null;
    key: string | null;
  };
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "please provide a password"],
      minlength: 6,
    },
    firstNmae: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true
    },
    status: {
      type: String,
      default: 'Active'
    },
    dob: {
      type: String,
    },
    role: {
      type: String,
      default: "emp",
    },
    otp: {
      type: Number,
    },
    oldOtp: {
      type: Number
    },
    refresh_token: {
      type: String,
    },
    profile: {
      location: String,
      key: String,
    },
  },
  { timestamps: true }
);

// hasing & salting  ==========================
userSchema.pre("save", async function (next: mongoose.HookNextFunction) {
  const user = this as UserDocument;
  if (!user.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hashSync(user.password, salt);
  user.password = hash;
  // set or asign otp to user
  user.otp = Math.floor(100000 + Math.random() * 900000);
  user.oldOtp = Math.floor(100000 + Math.random() * 900000)
  return next();
});

// check password true || false? =================
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const user = this as UserDocument;
  return bcrypt.compare(candidatePassword, user.password).catch((e) => false);
};

userSchema.methods.encryptPassword = async function (newPassword: string) {
  const salt = await bcrypt.genSalt(10);
  const hash = bcrypt.hashSync(newPassword, salt);
  return hash;
};

const emp = mongoose.model<UserDocument>("user", userSchema);

export default emp;
