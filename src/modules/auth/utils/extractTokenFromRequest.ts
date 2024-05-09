export function extractTokenFromRequest(request: Request): string | null {
  if (!request.headers['authorization']) {
    return null;
  }
  const [type, token] = request.headers['authorization']?.split(' ');

  return type == 'Bearer' ? token : null;
}
