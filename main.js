var http = require('http');
var fs = require('fs');
var url = require('url');
// 우리는 'url'이라는 모듈을 url이라는 변수를 통해서 사용할 것이라고 nodejs에게 알려주는 것이다.

var app = http.createServer(function(request,response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  const pathname = url.parse(_url, true).pathname;
  if(pathname == '/') {
    // path가 없는 경로를 선택했다면 아래의 코드 실행
    if(queryData.id == undefined) {
      // queryData가 정의되지 않은 Keyword라면, 즉 없는 값이라면
      // 이것은 Home이다.
      fs.readFile(`data/${queryData.id}`, `utf8`, (err, data) => {
        // data 폴더에 있는 title의 명을 가진 파일을 utf8 형식으로 뽑아
        // if (err) throw err;
        const title = 'Welcome';
        const description = 'Hello, Node.js';
        const template = `
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
                <ul>
                  <li><a href="/?id=HTML">HTML</a></li>
                  <li><a href="/?id=CSS">CSS</a></li>
                  <li><a href="/?id=JavaScript">Java Script</a></li>
                </ul>
              </div>
              <div id="article">
                <h2>${title}</h2>
                <p>
                  ${description}
                </p>
              </div>
            </div>
          </body>
        </html>
        `; // template HTML 코드 내용들을 data 인자를 활용할 수 있게끔 이 안으로 옮겨준다.
        response.writeHead(200);
        // 파일이 성공적으로 전송 했다고 Web Server가 Web Browser에게 알려주는 약속된 언어
        response.end(template);
      });
    } else {
      fs.readFile(`data/${queryData.id}`, `utf8`, (err, data) => {
        // data 폴더에 있는 title의 명을 가진 파일을 utf8 형식으로 뽑아
        // if (err) throw err;
        const title = queryData.id;
        const template = `
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
                <ul>
                  <li><a href="/?id=HTML">HTML</a></li>
                  <li><a href="/?id=CSS">CSS</a></li>
                  <li><a href="/?id=JavaScript">Java Script</a></li>
                </ul>
              </div>
              <div id="article">
                <h2>${title}이란 무엇인가</h2>
                <p>
                  ${data}
                </p>
              </div>
            </div>
          </body>
        </html>
        `; // template HTML 코드 내용들을 data 인자를 활용할 수 있게끔 이 안으로 옮겨준다.
        response.writeHead(200);
        // 파일이 성공적으로 전송 했다고 Web Server가 Web Browser에게 알려주는 약속된 언어
        response.end(template);
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
