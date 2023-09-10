$(document).ready(function(){
	$(".m-message").each(function (index, item){
        setTimeout(function(){
            $(item).addClass("active");
        }, 300 * index)
    });
});
