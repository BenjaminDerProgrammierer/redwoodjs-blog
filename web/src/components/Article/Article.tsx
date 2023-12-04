import type { Post } from 'types/graphql'

import { Link, routes } from '@redwoodjs/router'

const truncate = (text: string, length: number) => {
  return text.substring(0, length) + '...'
}

interface Props {
  article: Omit<Post, 'createdAt'>
  summary?: boolean
}
const Article = ({ article, summary = false }: Props) => {
  return (
    <article key={article.id}>
      <header>
        <h2>
          <Link to={routes.article({ id: article.id })}>{article.title}</Link>
        </h2>
      </header>
      <p>{summary ? truncate(article.body, 100) : article.body}</p>
    </article>
  )
}

export default Article
