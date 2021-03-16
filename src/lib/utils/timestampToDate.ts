

type Type = 'yyyymmdd' | 'mmddhhmm' | 'hhmmss' | 'ddhhmmss' | 'mmddwhhmm';

export default function timestampToDate(timestamp:number, type:Type = 'mmddwhhmm') {
  const week = new Array('일', '월', '화', '수', '목', '금', '토');
  const date = new Date(timestamp);
  const fullYears = date.getFullYear();
  const months = date.getMonth() + 1;
  const days = date.getDate();
  let hours = date.getHours();
  let minutes:number | string = date.getMinutes();
  minutes = (minutes + '').length === 1 ? '0' + minutes : minutes;
  let seconds:number | string = date.getSeconds();
  seconds = seconds === 0 ? '0' + seconds : seconds;
  const meridiem = hours >= 12 ? '오후' : '오전'; 
  hours -= hours > 12 ? 12 : 0;
  const dayOfTheWeek = week[date.getDay()]

  switch (type) {
    case 'ddhhmmss':
      return days + '일' + hours + ':' + minutes + ':' + seconds;
    case 'hhmmss':
      return hours
    
    default:
      return `${months}월 ${days}일 (${dayOfTheWeek}) ${meridiem} ${hours}:${minutes}`;
  }
}