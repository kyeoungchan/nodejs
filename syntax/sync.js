const fs = require('fs');

// readFileSync
// console.log('A');
// const result = fs.readFileSync('syntax/sample.txt', 'utf8');
// console.log(result);
// console.log('C');
// sysntax 폴더 밖에서 실행한다는 뜻

// readFile
console.log('A');
fs.readFile('syntax/sample.txt', 'utf8', (err, data) => {
  console.log(data);
});
// readFile() 함수는 return 값이 없는 함수로, 앞에 result 변수가 불필요하다.
// 대신에 sample.txt 파일을 모두 다 읽으면 세 번째 인자로 주어진 CallBack 함수를 읽는다.
// error가 있으면 err 인자로 주고, 파일을 읽은 결과는 두 번째 인자인 data로 주게 약속되어있다.
console.log('C');
