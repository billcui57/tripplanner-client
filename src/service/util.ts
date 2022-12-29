

export const buildUrl = (path: string): string => {
  const api_url = process.env.NEXT_PUBLIC_API_URL
  if (api_url) {
    return api_url + path
  }
  return "/api" + path
}