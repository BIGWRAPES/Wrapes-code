const baseUrl = import.meta.env.BASE_URL
const normalizedBase = baseUrl === '/' ? '' : baseUrl.replace(/\/$/, '')

export function routeHref(route: string) {
  const normalizedRoute = route.replace(/^\/+|\/+$/g, '')
  return normalizedRoute ? `${baseUrl}${normalizedRoute}/` : baseUrl
}

export function routeFromPathname(pathname: string) {
  const path = normalizedBase && pathname.startsWith(normalizedBase)
    ? pathname.slice(normalizedBase.length)
    : pathname

  return path.replace(/\/$/, '') || '/'
}
