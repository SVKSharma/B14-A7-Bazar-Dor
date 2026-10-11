export function getSafeCallbackURL(search: string): string {
  const callbackURL = new URLSearchParams(search).get('callbackURL');

  return callbackURL?.startsWith('/') && !callbackURL.startsWith('//')
    ? callbackURL
    : '/';
}

export function getAuthPageURL(path: '/signin' | '/signup', callbackURL: string): string {
  if (callbackURL === '/') return path;

  return `${path}?${new URLSearchParams({ callbackURL }).toString()}`;
}
