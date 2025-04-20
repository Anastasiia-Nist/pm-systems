const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`Error API: ${errorText}`)
  }
  return response.json()
}

class ApiClient {
  private baseUrl: string
  private prefixUrl = '/api/v1'

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl + this.prefixUrl
  }

  private async request(endpoint: string, options: RequestInit = {}, signal?: AbortSignal) {
    const controllerOptions = { ...options, signal }
    const response = await fetch(`${this.baseUrl}${endpoint}`, controllerOptions)
    await new Promise((resolve) => setTimeout(resolve, 500))
    return handleResponse(response)
  }

  async get(endpoint: string, signal?: AbortSignal) {
    return this.request(endpoint, { method: 'GET' }, signal)
  }

  async post(endpoint: string, data: unknown, signal?: AbortSignal) {
    return this.request(endpoint, { method: 'POST', body: JSON.stringify(data) }, signal)
  }

  async put(endpoint: string, data: unknown, signal?: AbortSignal) {
    return this.request(endpoint, { method: 'PUT', body: JSON.stringify(data) }, signal)
  }
}

export const api = new ApiClient(import.meta.env.VITE_API_URL)
