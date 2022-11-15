const Comment = require('./Comment');
const Post = require('./Post');
const User = require('./User');

// Comments and Posts belong to user

Post.belongsTo(User, {
  foreignKey: 'userId'
});

Comment.belongsTo(User, {
  foreignKey: 'userId'
});

// Posts have many comments

Post.hasMany(Comment, {
  foreignKey: 'postId'
});

module.exports = {Comment, Post, User};
