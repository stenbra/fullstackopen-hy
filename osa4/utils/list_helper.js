const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
  }
const totalLikes =(blogs)=>{
    let total=0
    blogs.forEach(x => {
        total+= Number(x.likes)
    })
    return total
}

const favoriteBlog = (blogs)=>{
    if(blogs.length==0){
        return null
    }
    let blog= blogs[0]
    blogs.forEach(x => {
        if(x.likes>blog.likes){
            blog=x
        }
    })
    return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
    }
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  }