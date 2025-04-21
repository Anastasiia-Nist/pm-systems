import '@/styles/components/ui/UiLoader.css'

interface UiLoaderProps {
  isLoading: boolean
}

export default function UiLoader({ isLoading }: UiLoaderProps) {
  return (
    <div className={`ui-loader ${isLoading ? 'ui-loader--visible' : 'ui-loader--hidden'}`}>
      <div className="loader-text">Загрузка...</div>
    </div>
  )
}
