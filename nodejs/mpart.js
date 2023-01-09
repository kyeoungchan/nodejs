const M = {
  v:'v',
  f:function() {
    console.log(this.v);
  }
}

// M.f();

module.exports = M;
// M이라는 객체를 다른 파일에서도 사용할 수 있게 exports한다.
