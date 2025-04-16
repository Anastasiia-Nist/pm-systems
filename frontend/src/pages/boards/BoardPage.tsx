import { useParams } from 'react-router-dom'

export default function BoardPage() {
  const { id } = useParams()
  return <h1>Проект: {id}</h1>
}
