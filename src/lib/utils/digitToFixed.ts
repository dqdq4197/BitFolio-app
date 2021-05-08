


/**
 * @description 소수점 이하 몇 까지 반환
 * @param  {number} num - 변경할 숫자
 * @param  {number} numOfDecimals - 소수점 몇째 자릿수
 * @returns {number}
 */
export default function digitToFixed(
  num: number, 
  numOfDecimals: number
): number {
  let temp = Math.pow(10, numOfDecimals);
  return Math.floor(num * temp) / temp
}