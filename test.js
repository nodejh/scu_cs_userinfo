// switch (1) {
//   case 11:
//     // return 1;
//     console.log(1);
//     break;
//   default:
//     console.log('default');
// }

try {
  throw new Error('查询用户信息失败');
  console.log('ddd');
} catch (e) {
  console.log('e: ', e);
} finally {

}
