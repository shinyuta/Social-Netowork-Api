const connection = require('../config/connection');
const { User, Thought }=require('../models');

connection.on('error', (err)=>err);

connection.once('open', async()=>{
    let userCheck=await connection.db
    .listCollections({name:"user"})
    .toArray();
    if(userCheck.length){
        await connection.dropCollection('user')
    }
    let thoughtCheck = await connection.db
    .listCollections({name: "thought"}).toArray();
    if (thoughtCheck.length){
        await connection.dropCollection("thought");
    }
    await User.collection.insertMany([
        {
            username:'admin', 
            email:'admin@admin.com', 
            password:'adminPass1'
        },
        {
            username:'user1',
            email:'user1@gmail.com',
            password:'password1'
        },
        {
            username:'user2',
            email:'user2@gmail.com',
            password:'password2'
        },
    ]);

    await Thought.collection.insertMany([
        {
            thoughtText: 'test thought',
            username: 'admin',
            reactions: [{
                reactionBody: 'Reaction',
                username: 'user1'
            }]
        }
    ])
});