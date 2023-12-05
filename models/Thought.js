// dayJs for days
const dayjs = require('dayjs');
const { Schema, model }= require('mongoose');
const reactionSchema=require('./Reaction');

// thoughtext (string, required, must be between 1 and 280 characters)
// created at (date, set a default value to the curent timestamp, use a getter method to format the timestamp on query)
// username (string, required)
// reactions (array of nested docs created with reactionSchema)
// from module 18 models
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxlength:280
        },
        createdAt:{
            type: Date,
            default: ()=>Date.now(),
            get: function(date){
                return dayjs(date).format('MM/DD/YYYY')
            }    
        },
        username: {
            type:String,
            required:true,
        },
        reactions:[reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false,
    }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
// from module 18 schema settings
thoughtSchema
    .virtual('reactionCount')
    .get(function(){
        if (this.reactions){
            return this.reactions.length
        }else{
            return []
        }
    });

    const Thought = model('thought', thoughtSchema)
    module.exports = Thought;