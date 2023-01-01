// function a() {
//   console.log('A');
// }
const a = function() {
  // 익명함수라고 부른다. 이름이 없는 함수.
  // a라는 값으로서 함수를 정의하고 있다. 즉, 함수가 값이라는 의미다.
  console.log('A');
}

function slowFunc(callback) {
  // 굉장히 오래걸리는 함수라고 가정한다.
  // 오래걸리는 함수의 기능이 끝난 후 다음 함수를 실행시키라는 명령을 주기 위해 callback함수 활용
  callback();
}

slowFunc(a);
// a라는 변수를 갖다 놓고
// slowFunc()라는 오래 걸리는 함수를 실행시키고
// callback이라는 Parameter는 a를 갖게 되고, console.log('A')를 실행시키게 된다.
