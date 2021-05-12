;(function($){

  //var board = new Object(); //생성자 방식

    var board = {      //리터럴 방식
        init: function(){
          
          this.boardFn();

        },
        boardFn: function(){
          // 웹 사이트 로딩시 AJAX 실행
          // JSON 데이터 파일을 읽어들여서 
          // 테이블 TBODY에 출력 글 번호 또는 날짜 내림차순

            var $tbody = $('.board tbody');      
            var $prevBtn = $('.board .prev-btn');      
            var $pageBtn = $('.board .page-btn');      
            var $nextBtn = $('.board .next-btn');      
            var $pageNumberBox = $('.page-number-box ul');  //페이지 버튼이 들어갈 요소 선택자     
       

            var a = [];
            var txt = '';
            var list = 5; //한 화면의 목록 갯수

            var total = null; //313 전체 레코드 갯수
            var totalPageNum = null; //63 전체 페이지 수
            var pageNumList = 10; //페이지그룹 10개씩
            var pageGroupNum = Math.ceil(totalPageNum / pageNumList ); //7 페이지 
            

              function ajaxRunFn(){
                $.ajax({
                  url:'./data/board.json',
                  dataType:'json',
                  success:function(result){

                    $.each(result.notice, function(idx,obj){
                        //console.log(idx,obj.날짜);
                    
                        a[idx] = [];
                    
                        a[idx][0] = obj.NO;    
                        a[idx][1] = obj.제목;    
                        a[idx][2] = obj.날짜;    
                        a[idx][3] = obj.조회수;    
                      
                      }); //each 끝
                      
                      
                      //console.log(a);
                      total = a.length; //총 레코드 수
                      
                      //for(i=0; i<a.length; i++){
                      for(i=0; i<list; i++){
                        txt += '<tr>'
                        for(j=0; j<4; j++){
                          txt += '<td>' + a[i][j] +'</td>'
                        }
                        txt += '</tr>'
                      }

                      $tbody.html( txt );
                      
                      //console.log(totalPageNum);
                      // 페이지 번호
                      // 10개씩 묶음 총 카운트
                      // 313(총 레코드수) / 10(한 화면에 보이는 목록) 자리올림
                      // pageNum(32) = Math.ceil(a.length / list);  //Math.ceil = 자리올림
                      // 전체 페이지 수
                      // pageNumList = 10; //페이지그룹 10개씩
                      // pageGroupNum = Math.ceil(totalPageNum / pageNumList ); //7 페이지 
                      

                      txt = '';
                      totalPageNum = Math.ceil( total / list ); 

                      for(var i=0; i<pageNumList; i++){ // 1 ~ 10 페이지번호 출력
                        if(i==0){
                          txt += '<li><a href="javascript:" class="page-btn addPage">' + (i+1) + '</a></li>'
                        }
                        else{
                          txt += '<li><a href="javascript:" class="page-btn">' + (i+1) + '</a></li>'
                        }
                      }

                      $pageNumberBox.html( txt );

                },
                  error:function(){
                    alert('ERROR');
                  }
                }
                )}

                
            ajaxRunFn();

        }
    
    } // 객체 끝 

    board.init();

    

})(jQuery);