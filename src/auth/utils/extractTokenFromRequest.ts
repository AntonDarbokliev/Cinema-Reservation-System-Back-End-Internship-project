export function extractTokenFromRequest(request: Request): string | null {
  if (!request.headers['Authorization']) {
    return null;
  }
  const [type, token] = request.headers['Authorization']?.split(' ');
  return type == 'Bearer' ? token : null;
}
