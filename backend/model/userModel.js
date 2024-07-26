import mongoose from "mongoose";
import bcrypt from 'bcryptjs'
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default:"https://firebasestorage.googleapis.com/v0/b/ums-mern-stack.appspot.com/o/PROFILEimages%2Favatar-3814049_1920.png?alt=media&token=d196793d-3466-428c-bfef-aabee6f1002e",
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    password: {
        type: String,
        required: true
    },
    


}, { timestamps: true });

///// Password Salting and hashing
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

//// password compares method

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

const User = mongoose.model("Users", userSchema);

export default User