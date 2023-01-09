module.exports = {
  html:function(title, list, body, control) {
    // HTML 코드 사용의 반복을 줄이기 위한 함수
    // template HTML 코드 내용들을 data 인자를 활용할 수 있게끔 이 안으로 옮겨준다.
    return `
    <!doctype html>
    <html>
      <head>
        <title>WEB2 - ${title}</title>
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
  }, list:function(data) {
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
}
