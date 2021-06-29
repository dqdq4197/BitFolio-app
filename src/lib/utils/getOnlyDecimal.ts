

/**
 * @description 소수점 이하의 값만 반환
 * @param  {number} num - 변경할 숫자
 * @param  {number} length - 소수점 몇 자릿수
 */
export default function getOnlyDecimal(num:number, length: number) {
  let result = num.toString().split('.');
  console.log(num);
  if(!result[1]) {
    return '00';
  } else {
    if(result[1].length >= length) {
      return result[1].substr(0, length);
    } else {
      return result[1];
    }
  }
};