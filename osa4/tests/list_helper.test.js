const listHelper = require('../utils/list_helper')

const blogs =[
  {
    _id:'6437c2d7d8cc4dcf7c792fd1',
    title:'THE BLOG',
    author:'Gigantti Miesman',
    url:'https://www.garbo.io/blog/craigslist-scams',
    likes:22,
    __v:0
  },
  {
    _id:'643734d7d8c63dcf7c792fd1',
    title:'THE BOLG',
    author:'Dude',
    url:'https://www.wikipedia.org',
    likes:52,
    __v:0
  },
  {
    _id:'6437c234678436592cf7c792fd1',
    title:'T BEE',
    author:'Gigan',
    url:'https://www.thehubbutwhy.no',
    likes:89,
    __v:0
  },
  {
    _id:'6437c234cc4dcf7c792fd1',
    title:'THE BLOG',
    author:'Gatto',
    url:'https://www.haaagar.coms',
    likes:45,
    __v:0
  }
]

test('dummy returns one', () => {
  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]
  
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('list with multiple entries, equlas the summ of all likes',()=>{
    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(208)
  })
  test('empty list, equlas 0 likes',()=>{
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
})

describe('Favorite blog', ()=>{

  test('list with multiple entries, returns the title,authour and likes of the one wiht most likes',()=>{
    const result= listHelper.favoriteBlog(blogs)
    expect(result).toEqual({
      title:'T BEE',
      author:'Gigan',
      likes:89
    })
  })
  test('empty list returns null',()=>{
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual(null)
  })
})