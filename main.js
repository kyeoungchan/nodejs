var http = require('http');
var fs = require('fs');
var url = require('url');
// 우리는 'url'이라는 모듈을 url이라는 변수를 통해서 사용할 것이라고 nodejs에게 알려주는 것이다.

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    let title = queryData.id;
    // Web Page의 title을 동적으로 바꿔주기 위한 변수 생성
    console.log(queryData.id);
    // queryData에 어떤 값이 들어있는지 확인해보자.
    if(_url == '/'){
      title = 'Welcome';
      // _url = '/index.html';
      // // 홈으로 갔을 때 index.html을 실행하게 한다.
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
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
              하이퍼 텍스트 마크업 언어(영어: Hyper Text Markup Language, HTML, 문화어: 초본문표식달기언어, 하이퍼본문표식달기언어)는 웹 페이지를 위한 지배적인 마크업 언어다. 또한, HTML은 제목, 단락, 목록 등과 같은 본문을 위한 구조적 의미를 나타내는 것뿐만 아니라 링크, 인용과 그 밖의 항목으로 구조적 문서를 만들 수 있는 방법을 제공한다. 그리고 이미지와 객체를 내장하고 대화형 양식을 생성하는 데 사용될 수 있다. HTML은 웹 페이지 콘텐츠 안의 꺾쇠 괄호에 둘러싸인 "태그"로 되어있는 HTML 요소 형태로 작성한다. HTML은 웹 브라우저와 같은 HTML 처리 장치의 행동에 영향을 주는 자바스크립트와 본문과 그 밖의 항목의 외관과 배치를 정의하는 CSS 같은 스크립트를 포함하거나 불러올 수 있다. HTML과 CSS 표준의 공동 책임자인 W3C는 명확하고 표상적인 마크업을 위하여 CSS의 사용을 권장한다.[1]
            </p>
          </div>
        </div>
      </body>
    </html>

    `
		response.end(template);

});
app.listen(3000);
