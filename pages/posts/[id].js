import fetch from 'node-fetch'

const Post = ({ post }) => {
  return (
    <section key={post.id}>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </section>
  )
}

// (1) SSG対象となるパスのリストを定義
export async function getStaticPaths() {
  // 全件数取得
  const res = await fetch('https://jsonplaceholder.typicode.com/posts')
  const posts = await res.json()

  // パスのリストを作成
  const paths = posts.map((post) => `/posts/${post.id}`)
  console.log('paths', paths)
  return { paths, fallback: false }
}

// (2) 実際にSSGする関数
// paramsには上記pathsで指定した値が入る（全件ではなく1postずつ）
export async function getStaticProps({ params }) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${params.id}`
  )
  const post = await res.json()
  console.log('posts', post)
  console.log('params', params)
  return { props: { post } }
}

export default Post
