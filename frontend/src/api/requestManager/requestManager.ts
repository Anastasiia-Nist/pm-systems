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

  private async request(endpoint: string, options: RequestInit = {}) {
    const response = await fetch(`${this.baseUrl}${endpoint}`, options)
    return handleResponse(response)
  }

  async get(endpoint: string) {
    return this.request(endpoint, { method: 'GET' })
  }
}

export const api = new ApiClient(import.meta.env.VITE_API_URL)
