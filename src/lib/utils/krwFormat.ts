

export default function krwFormat(num?: number):string {
  if(!num) return '--';
  return num.toLocaleString('en');
}