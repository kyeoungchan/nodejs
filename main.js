var http = require('http');
var fs = require('fs');
var url = require('url');
// 우리는 'url'이라는 모듈을 url이라는 변수를 통해서 사용할 것이라고 nodejs에게 알려주는 것이다.

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    console.log(queryData.id);
    // queryData에 어떤 값이 들어있는지 확인해보자.
    if(_url == '/'){
      _url = '/index.html';
    }
    if(_url == '/favicon.ico'){
        response.writeHead(404);
        response.end();
        return;
    }
    response.writeHead(200);
    console.log(__dirname + _url);
    // response.end(fs.readFileSync(__dirname + _url));
    // 사용자가 접속한 url에 따라서 파일들을 읽어주는 부분이다.
		response.end(queryData.id);

});
app.listen(3000);
