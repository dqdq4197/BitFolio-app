export function expectUnreachable(message?: string): never {
  throw new Error(message ?? "Didn't expect to get here")
}
