$(document).ready(function(){
    // 채팅 메시지 애니메이션
	$(".m-message").each(function (index, item){
        setTimeout(function(){
            $(item).addClass("active");
        }, 300 * index)
    });

    // 검색필터
    $(".m-filter.type01 .box-title").click(function(){
       $(this).siblings(".box-content").slideToggle();
       $(this).toggleClass("active");
    });
    
    // 채팅 프로필 팝업
    $(".m-messages.type01 > .m-message > .img-wrap").click(function(){
       $(".m-profile.type01").addClass("active");
    });

    $(".m-profile.type01 .black").click(function(){
        $(".m-profile.type01").removeClass("active");
    });
});
