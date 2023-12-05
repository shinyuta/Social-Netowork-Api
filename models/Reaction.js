const dayjs=require('dayjs');
const { Schema,Types } = require('mongoose');

// schema only
// reactionId (use mongoose's objectid data type, default value is set to a new object id)
// reactionBody (string, required, 280 max)
// username (string, required)
// createdAt (date, set default value to current timestamp, user getter method to format) -- same as thought.js
// from models in module 18
const reactionSchema = new Schema(
    {
        reactionId:{
            type: Schema.Types.ObjectId,
            default:()=>new Types.ObjectId(),
            },
        reactionBody:{
            type:String,
            required: true,
            maxlength:280,
        },
        username:{
            type: String,
            required:true,
        },
        createdAt:{
            type:Date,
            default: Date.now,
            get:function(date){
                return dayjs(date).format('MM/DD/YYYY');
            }
        }
    },
    {
        toJSON:{
            getters:true
        },
    }
);

module.exports = reactionSchema;