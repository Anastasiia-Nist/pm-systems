export const requestHelper = <T>(
  asyncFn: (signal: AbortSignal) => Promise<T>,
  onError?: (err: unknown) => void
) => {
  const controller = new AbortController()

  asyncFn(controller.signal).catch((err) => {
    if (err.name === 'AbortError') {
      console.log('Запрос прерван', err)
    }
    if (onError) {
      onError(err)
    }
  })

  return () => controller.abort()
}
