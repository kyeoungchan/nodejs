const http = require('http');
const fs = require('fs');
const url = require('url');
// 우리는 'url'이라는 모듈을 url이라는 변수를 통해서 사용할 것이라고 nodejs에게 알려주는 것이다.
const qs = require('querystring');

function templateHTML(title, list, body, control) {
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
          ${control}
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
  // Nodejs로 Web Browser가 들어올 때마다 createServer에 CallBack함수를 Nodejs가 호출하는데,
  // request는 요청할 때 Web Browser가 보낸 정보
  // response는 응답할 때 우리가 Web Browser에 전송할 정보
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
          const template = templateHTML(title, list,
            `<h2>${title}</h2><p>${description}</p>`,
            `<a href="/create">create</a>`
          );
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
          const template = templateHTML(title, list,
            `<h2>${title}이란</h2><p>${description}</p>`,
            `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
          );
          response.writeHead(200);
          // 파일이 성공적으로 전송 했다고 Web Server가 Web Browser에게 알려주는 약속된 언어
          response.end(template);
        });
      });
    }
  } else if(pathname == '/create') {
    fs.readdir('./data', (err, data) => {
      fs.readFile(`data/Web`, `utf8`, (err, description) => {
        // data 폴더에 있는 'Web'이라는 Data 파일을 연다.
        // if (err) throw err;
        const title = 'WEB - Create';
        const list = templeList(data);
        const template = templateHTML(title, list, `
          <form action="/create_process" method="post">
            <!-- 입력한 정보를 action값의 서버 주소로 전송하고 싶다는 의미 -->
            <!-- 서버에서 전송받은 정보를 활용하려면 각 정보에 name 속성값이 필요하다. -->
            <p><input type="text" name="title" placeholder="title"></p>
            <p>
              <textarea name="description" placeholder="description"></textarea>
            </p>
            <!-- Text를 여러 줄 입력할 수 있는 입력창이다. -->
            <p>
              <input type="submit">
              <!-- 전송 버튼이 생겨난다. -->
            </p>
          </form>
        `, '');
        response.writeHead(200);
        // 파일이 성공적으로 전송 했다고 Web Server가 Web Browser에게 알려주는 약속된 언어
        response.end(template);
      });
    });
  } else if(pathname == '/create_process') {
    let body = '';
    request.on('data', function(data) {
      // Web Broser가 Post 방식으로 Data를 처리할 때, 한 번에 너무 방대한 양의 Data를 처리하면 프로그램이 꺼지거나 컴퓨터에 무리갈 수 있다.
      // 그것에 대비하기 위해 Data를 조각조각내 처리하는 request.on()의 CallBack함수를 사용한다.
      body += data;
      // CallBack이 실행될 때마다 data를 body에 추가한다.
    });
    request.on('end', function() {
      // 조각조각내 들어올 Data가 더이상 없을 때 호출되는 CallBack함수다.
      const post = qs.parse(body);
      // post라는 변수에 데이터값을 저장한다.
      const title = post.title;
      const description = post.description;
      fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
        // 파일 저장이 성공적으로 됐을 때 이 CallBack 함수가 호출된다.
        response.writeHead(302, {location : `/?id=${title}`});
        // 첫 번째 인자인 302는 일시적으로 Redirect한다는 의미를 내포한다.
        response.end();
        // Page에 띄울 것이 없으므로 인자는 생략한다.
      });
    });
  } else if(pathname == '/update') {
    // pathname은 '?' 기호가 나오기 전으로 끊긴다.
    fs.readdir('./data', (err, data) => {
      fs.readFile(`data/${queryData.id}`, `utf8`, (err, description) => {
        // data 폴더에 있는 title의 명을 가진 파일을 utf8 형식으로 뽑아
        // if (err) throw err;
        const title = queryData.id;
        const list = templeList(data);
        const template = templateHTML(title, list,
          `
          <form action="/update_process" method="post">
            <!-- 입력한 정보를 action값의 서버 주소로 전송하고 싶다는 의미 -->
            <!-- 서버에서 전송받은 정보를 활용하려면 각 정보에 name 속성값이 필요하다. -->
            <input type="hidden" name="id" value="${title}">
            <p><input type="text" name="title" placeholder="title" value="${title}"></p>
            <p>
              <textarea name="description" placeholder="description">${description}</textarea>
            </p>
            <!-- Text를 여러 줄 입력할 수 있는 입력창이다. -->
            <p>
              <input type="submit">
              <!-- 전송 버튼이 생겨난다. -->
            </p>
          </form>
          `,
          `<a href="/create">create</a> <a href="/update?id=${title}">update</a>`
        );
        response.writeHead(200);
        // 파일이 성공적으로 전송 했다고 Web Server가 Web Browser에게 알려주는 약속된 언어
        response.end(template);
      });
    });
  } else if(pathname == '/update_process') {
    let body = '';
    request.on('data', function(data) {
      body += data;
    });
    request.on('end', function() {
      const post = qs.parse(body);
      const id = post.id;
      const title = post.title;
      const description = post.description;
      fs.rename(`data/${id}`, `data/${title}`, (err) => {
        fs.writeFile(`data/${title}`, description, 'utf8', function(err) {
          // CallBack 함수이므로 file이 rename이 된 후에 writeFile() 함수가 실행된다.
          // 그러므로 변경해야 하는 파일명은 id가 아닌 title이다.
          response.writeHead(302, {location : `/?id=${title}`});
          response.end();
        });
      });
      console.log(post);
    });
  } else {
    // 그 외의 경로로 접속했다면
    response.writeHead(404);
    // 파일 전송이 실패 했다고 Web Server가 Web Browser에게 알려주는 약속된 언어
    response.end('Not found');
  }
});
app.listen(3000);
