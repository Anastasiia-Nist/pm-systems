import { useDroppable, useDraggable } from '@dnd-kit/core'
import { Task, TaskStatus } from '../../types/task'
import Card from '../common/Card'
import '@/styles/components/ui/UiDraggable.css'

type Props = {
  id: TaskStatus
  title: string
  tasks: Task[]
  onCardClick: (taskId: number) => void
}

export default function UiDraggable({ id, title, tasks, onCardClick }: Props) {
  const { setNodeRef: setDroppableRef } = useDroppable({ id })

  const handleClick = (id: number) => {
    onCardClick(id)
  }
  return (
    <div ref={setDroppableRef} className="droppable">
      <h2>{title}</h2>
      <ul className="list droppable__list">
        {tasks.map((task) => (
          <DraggableTask key={task.id} task={task} onClick={() => handleClick(task.id)} />
        ))}
      </ul>
    </div>
  )
}

export function DraggableTask({ task, onClick }: { task: Task; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id })

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
  }


  return (
    <>
      <li
        ref={setNodeRef}
        className="droppable__item"
        {...attributes}
        {...listeners}
        onClick={onClick}
        style={style}
      >
        <Card title={task.title} />
      </li>
    </>
  )
}
