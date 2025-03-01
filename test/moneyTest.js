import { formatcurrency } from "../scripts/utils/money.js";

if(formatcurrency(2095) === '20.95'){
  console.log('passed');
}
else {
  console.lof('failed');
}

if(formatcurrency(0)==='0.00'){
  console.log('passed');
}
else {
  console.log('failed');
}
if(formatcurrency(2000.5)==='20.01'){
  console.log('passed');
}
else {
  console.log('failed');
}