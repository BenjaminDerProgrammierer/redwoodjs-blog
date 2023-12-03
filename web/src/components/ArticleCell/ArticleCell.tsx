import Article from 'src/components/Article'
export const QUERY = gql`
  query FindArticleQuery($id: Int!) {
    article: post(id: $id) {
      id
      title
      body
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => (
  <div style={{ color: 'red' }}>Error: {error?.message}</div>
)

export const Success = ({ article }) => {
  return (
    <article>
      <header>
        <h2>{article.title}</h2>
      </header>
      <div>{article.body}</div>
      <div>Posted at: {article.createdAt}</div>
    </article>
  )
}