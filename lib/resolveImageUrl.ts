export function resolveImageUrl(imagePath?: string, apiUrl?: string) {
  if (!imagePath) return ""

  const trimmedPath = imagePath.trim()
  if (!trimmedPath) return ""

  if (
    trimmedPath.startsWith("http://") ||
    trimmedPath.startsWith("https://") ||
    trimmedPath.startsWith("data:") ||
    trimmedPath.startsWith("blob:")
  ) {
    return trimmedPath
  }

  const normalizedPath = `/${trimmedPath.replace(/^\/+/, "")}`
  if (!apiUrl) return normalizedPath

  const normalizedApiUrl = apiUrl.replace(/\/+$/, "")
  return `${normalizedApiUrl}${normalizedPath}`
}