


import { count } from './js/count';
import { sum }  from './js/sum';
import './less/fontawesome/fontawesome.less';
import "./less/fontawesome/solid.less";
import './css/main.css';
import './less/main.less';
import { add, minus } from './js/math';

const a = count(3, 1);
console.log(a);
console.log(sum(1,2,3,4));
console.log(sum(1,2,3,4, 5));

// const query = async () => {
//     const res = await Promise.resolve(1);
//     return res;
// }