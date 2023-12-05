const { Schema, model } = require('mongoose');

// username (string, unique, required, trimmed)
// email (string, required, unique, must match valid emaol address (regex)).
// thoughts (array of id values referencing Thought model)
// friends (array of id values referencing User model (self reference))
// from models in module 18.
const userSchema=new Schema(
    {
        username:{
            type: String,
            required:[true,'Provide a username'],
            unique:true,
            trim: true
    },
    email:{
        type: String,
        required: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Provide a valid email address']
    },
    thoughts:[{
        type: Schema.Types.ObjectId,
        ref:'thought'
    }],
    friends:[{
        type: Schema.Types.ObjectId,
        ref:'user'
        }]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
// from schema settings in module 18
userSchema
    .virtual('friendCount')
    .get(function(){
        return this.friends.length
    });

const User = model('user', userSchema);
module.exports = User;