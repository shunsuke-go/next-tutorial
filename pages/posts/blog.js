// pages/blog.js

import fetch from 'node-fetch'
import Link from 'next/link'

function Blog({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/posts/${post.id}`}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export async function getStaticProps() {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()
  console.log('posts', posts)
  return {
    props: {
      posts,
    },
  }
}

export default Blog
