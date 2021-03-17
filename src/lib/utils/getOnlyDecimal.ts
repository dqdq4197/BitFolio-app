


export default function getOnlyDecimal(num:number, length: number) {
  let result = (num % 1).toFixed(length);
  let resultLen = result.length - 2;

  if(Number(result) === 0) {
    return ;
  } else {
    return Math.floor(Number(result) * Math.pow(10, resultLen));
  }
};