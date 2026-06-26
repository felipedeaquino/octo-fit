export function getApiBaseUrl() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`
  }

  return '/api'
}

export function buildApiUrl(resource) {
  const baseUrl = getApiBaseUrl()
  return `${baseUrl}/${resource}/`
}
