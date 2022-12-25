var Link = {
  setColor : function(color) {
    // var a_List=document.querySelectorAll('a');
    // var i = 0;
    // while(i<a_List.length) {
    //     a_List[i].style.color = color;
    //     i = i + 1;
    // }
    $('a').css('color', color);
    // jQuery에서 모든 <a> element들을 제어한다는 뜻이다.
  }
  // <a> 링크 Tag들의 색깔을 변형시켜주는 메소드다.
}

var Body = {
  setColor : function(color) {
    // document.querySelector('body').style.color = color;
    // 이 문서에서. 웹 브라우저에 질의한다. Selector는 CSS 선택자.
    // 따옴표 안에는 Tag나, #id, .class 등이 들어갈 수 있다.
    $('body').css('color', color);
  },
  setBackgroundColor : function(color) {
    // document.querySelector('body').style.backgroundColor = color;
    $('body').css('backgroundColor', color);
  },
  setBorderColor : function(color) {
    // document.querySelector('h1').style.borderColor = color;
    // document.querySelector('#aList').style.borderColor = color;
    $('h1').css('borderColor', color);
    $('#aList').css('borderColor', color);
  }
}


function nightDayHandler(self) {
  if(self.value == 'night') {
    Body.setBackgroundColor('black')
    Body.setColor('white');
    Body.setBorderColor('white');
    Link.setColor('yellow');
    self.value='day';
  }
  else {
    Body.setBackgroundColor('white');
    Body.setColor('black');
    Body.setBorderColor('black');
    Link.setColor('blue');
    self.value='night';
  }
  // 만약 night_day라는 id 값을 가지는 개체의 value값이 night라면 다크모드로 바꿔주고
  // 그렇지 않다면 라이트모드로 실행시켜준다.
}
