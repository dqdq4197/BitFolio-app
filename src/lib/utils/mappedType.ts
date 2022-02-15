/**
 * @description 객체 리터럴 value 타입 추론
 * @param  {T} Object
 */
export function t<V extends string | number, T extends { [key in string]: V }>(
  o: T
): T {
  return o;
}
