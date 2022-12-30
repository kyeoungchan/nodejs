const http = require('http');
const fs = require('fs');
const url = require('url');
// 우리는 'url'이라는 모듈을 url이라는 변수를 통해서 사용할 것이라고 nodejs에게 알려주는 것이다.

function templateHTML(title, list, body) {
  // HTML 코드 사용의 반복을 줄이기 위한 함수
  // template HTML 코드 내용들을 data 인자를 활용할 수 있게끔 이 안으로 옮겨준다.
  return `
  <!doctype html>
  <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
      <link rel="stylesheet" href="style.css">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
      <script src="colors.js"></script>
    </head>

    <body>
      <h1><a href="/">WEB</a></h1>
      <div id="grid">
        <div id="aList">
          <!-- 버튼과 목록을 하나의 aList라는 id의 값으로 묶어준다. -->
          <input type="button" value="night" onclick="
            nightDayHandler(this);
          ">
          ${list}
        </div>
        <div id="article">
          ${body}
        </div>
      </div>
    </body>
  </html>
  `;
}

function templeList(data) {
  // 파일 list를 출력하기 위한 함수
  let list = '<ul>';
  // HTML 코드를 기계적으로 생성하고 담기 위한 list 변수 선언
  i = 0;
  while(i < data.length) {
    // 파일 갯수만큼 자동적으로 <li> Tag 형식의 HTML 코드를 생성해주는 반복문
    list = list + `<li><a href="/?id=${data[i]}">${data[i]}</a></li>`;
    i+=1;
  }
  list = list + '</ul>';
  return list;
}

const app = http.createServer(function(request,response){
  const _url = request.url;
  const queryData = url.parse(_url, true).query;
  const pathname = url.parse(_url, true).pathname;
  if(pathname == '/') {
    // path가 없는 경로를 선택했다면 아래의 코드 실행
    if(queryData.id == undefined) {
      // queryData가 정의되지 않은 Keyword라면, 즉 없는 값이라면
      // 이것은 Home이다.
      fs.readdir('./data', (err, data) => {
        fs.readFile(`data/Web`, `utf8`, (err, description) => {
          // data 폴더에 있는 'Web'이라는 Data 파일을 연다.
          // if (err) throw err;
          const title = 'Welcome';
          const list = templeList(data);
          const template = templateHTML(title, list, `<h2>${title}</h2>
          <p>${description}</p>`);
          response.writeHead(200);
          // 파일이 성공적으로 전송 했다고 Web Server가 Web Browser에게 알려주는 약속된 언어
          response.end(template);
        });
      });
    } else {
      fs.readdir('./data', (err, data) => {
        fs.readFile(`data/${queryData.id}`, `utf8`, (err, description) => {
          // data 폴더에 있는 title의 명을 가진 파일을 utf8 형식으로 뽑아
          // if (err) throw err;
          const title = queryData.id;
          const list = templeList(data);
          const template = templateHTML(title, list, `<h2>${title}이란</h2>
          <p>${description}</p>`);
          response.writeHead(200);
          // 파일이 성공적으로 전송 했다고 Web Server가 Web Browser에게 알려주는 약속된 언어
          response.end(template);
        });
      });
    }

  } else {
    // 그 외의 경로로 접속했다면
    response.writeHead(404);
    // 파일 전송이 실패 했다고 Web Server가 Web Browser에게 알려주는 약속된 언어
    response.end('Not found');
  }
});
app.listen(3000);
