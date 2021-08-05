import bcrypt from "bcrypt";
import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    avatarUrl: String,
    username: { type: String, required: true, unique: true },
    password: { type: String },
    name: { type: String, required: true },
    location: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    socialOnly: { type: Boolean, default: false },
    videos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }]
});

userSchema.pre("save", async function() {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 5);
    }
})

const User = mongoose.model("User", userSchema);

export default User;