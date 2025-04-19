import { useRef } from 'react'
import { useDroppable, useDraggable } from '@dnd-kit/core'
import { Task, TaskStatus } from '../../types/task'

type Props = {
  id: TaskStatus
  title: string
  tasks: Task[]
  onCardClick: (taskId: number) => void
}

export default function UiDraggable({ id, title, tasks, onCardClick }: Props) {
  const { setNodeRef: setDroppableRef } = useDroppable({ id })

  const handleMouseDown = (id: number) => {
    onCardClick(id)
  }
  return (
    <div
      ref={setDroppableRef}
      style={{
        border: '1px solid #ccc',
        padding: '8px',
        width: 250,
        minHeight: 300,
        backgroundColor: '#f5f5f5',
      }}
    >
      <h2>{title}</h2>
      <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
        {tasks.map((task) => (
          <DraggableTask key={task.id} task={task} onClick={() => handleMouseDown(task.id)} />
        ))}
      </ul>
    </div>
  )
}

export function DraggableTask({ task, onClick }: { task: Task; onClick: () => void }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id: task.id })
  const wasDraggedRef = useRef(false)

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
    border: '1px solid #888',
    margin: '4px 0',
    padding: '8px',
    background: '#fff',
    cursor: 'grab',
    touchAction: 'none',
  }

  const handleMouseDown = () => {
    wasDraggedRef.current = false
  }

  const handleMouseMove = () => {
    wasDraggedRef.current = true
  }

  const handleClick = () => {
    if (!wasDraggedRef.current) {
      onClick()
    }
  }

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleClick}
      style={style}
    >
      {task.title}
    </li>
  )
}
