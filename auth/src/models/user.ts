import mongoose from "mongoose";
import { Password } from "../utils/password";

// Create user attribute interface
interface UserAttr {
  email: string;
  name: string;
  bio: string;
  institution: string;
  password: string;
  role: string;
}

// Build function interface
interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: UserAttr): UserDoc;
}

// User document inteface
interface UserDoc extends mongoose.Document {
  email: string;
  name: string;
  bio: string;
  institution: string;
  password: string;
  role: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    bio: {
      type: String,
      required: false,
    },
    institution: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      default: "user",
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// hash password
userSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

// build method for using mongoose with typescript
userSchema.statics.build = (attr: UserAttr) => {
  return new User(attr);
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
