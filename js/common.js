$(document).ready(function(){
    // 채팅 메시지 서서히 나타나는 애니메이션
	$(".m-message").each(function (index, item){
        setTimeout(function(){
            $(item).addClass("active");
        }, 300 * index)
    });

    // 채팅 메시지 타이핑 애니메이션
    $(".m-message.animation-typing").each(function (index, item){
        const target = $(item).children(".body");
        const message = target.text().split('\n').map(line => line.trim()).join('\n');
        // 타이핑 효과 시작
        typeMessage(0, message, target);
    });

    // 채팅 메시지 타이핑 지웠다 다시 타이핑 애니메이션
    $(".m-message.animation-typing-layback").each(function (index, item){
        const removeCount = 4;
        const target = $(item).children(".body");
        const message = target.text().split('\n').map(line => line.trim()).join('\n');

        // 타이핑 효과 시작
        typeAfterRemoveMessage(0, message, target, removeCount);
    });

    // 채팅 메시지 n자 이상 타이핑 후 한번에 나오는 효과
    $(".m-message.animation-typing-once").each(function (index, item){
        const target = $(item).children(".body");
        const message = target.text().split('\n').map(line => line.trim()).join('\n');

        // 타이핑 효과 시작
        typeAfterCountMessage(0, message, target);
    });

    // 로딩
    $(".m-message.animation-loading").each(function (index, item){
        const target = $(item).children(".body");
        const message = target.text().split('\n').map(line => line.trim()).join('\n');
        const loading = ".....";
        const length = loading.length;
        let time = 6000000;

        target.text(".");

        if($(this).hasClass("animation-limit-time"))
            time = 2500;

        function animateDots(index) {
            if (index < length) {
                const dot = $('<span>').text(loading[index]);
                dot.addClass('fade-dot');
                target.append(dot);
                setTimeout(function() {
                    animateDots(index + 1);
                    time -= 500;
                }, 500); // 500ms 마다 점을 추가하고 투명하게 만듭니다.
            }else{
                if(time > 0){
                    index = 0;

                    target.text(".");

                    animateDots(index + 1);
                }else{
                    console.log(target.text());
                    typeMessage(loading.length - 1, loading + " " + message, target);
                }
            }
        }

        // 애니메이션 시작
        animateDots(0);
    });

    function typeAfterCountMessage(index, message, target) {
        let count = 10;

        if (index <= message.length + 1) {
            target.text(message.slice(0, index));

            setTimeout(function() {
                typeCountMessage(index + 1, message, target, count);
            }, 100); // 100ms 마다 한 글자씩 표시
        }
    }

    function typeAfterRemoveMessage(index, message, target, removeCount = 0) {
        if (index <= message.length + 1) {
            target.text(message.slice(0, index));

            setTimeout(function() {
                // 반절 지나면 글자 삭제 시작
                if (index === Math.floor(message.length / 2)) {
                    deleteMessage(index, message, target, removeCount);
                } else {
                    typeAfterRemoveMessage(index + 1, message, target, removeCount);
                }
            }, 100); // 100ms 마다 한 글자씩 표시
        }
    }

    function typeMessage(index, message, target) {
        if (index <= message.length + 1) {
            target.text(message.slice(0, index));

            setTimeout(function() {
                typeMessage(index + 1, message, target);
            }, 100); // 100ms 마다 한 글자씩 표시
        }
    }

    function typeCountMessage(index, message, target, count = 10, defaultCount = 10) {
        if (count > 0) {
            target.text(message.slice(0, index));

            setTimeout(function() {
                typeCountMessage(index + 1, message, target, count - 1, defaultCount);
            }, 100); // 100ms 마다 한 글자씩 표시
        }else{
            target.text(message);

        }
    }

    function deleteMessage(index, message, target, removeCount) {
        if (removeCount > 0) {
            target.text(message.slice(0, index));
            setTimeout(function() {
                deleteMessage(index - 1, message, target, removeCount - 1)
            }, 100); // 100ms 마다 한 글자씩 삭제
        } else {
            // 삭제가 완료되면 나머지를 타이핑
            typeAfterRemoveMessage(index + 1, message, target, removeCount);
        }
    }

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


    // 아래로 스크롤 내리기
    $(".m-btn-bottom.type01").click(function(){
        $('html, body').animate({ scrollTop: $(document).height() });
    });

    // 팝업창 제어
    $(".m-script-pop").click(function(){
        let target = $(this).attr("data-target");
        $(target).toggleClass("active");
    })
});
