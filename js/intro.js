$(document).ready(function(){
    // function([string1, string2],target id,[color1,color2])
    consoleText("#console-container1", ['CHAIS'], '#text',['#FFF']);

    setTimeout(function(){
        consoleText("#console-container2", ['기술과 데이터로 \n자동차 거래의 혁신을 만들다.'], '#text',['#FFF']);
    }, 1000);

    function consoleText(containerId, words, id, colors) {
        if (colors === undefined) colors = ['#fff'];
        var visible = true;
        var con = document.querySelector(`${containerId} #console`);
        var letterCount = 1;
        var x = 1;
        var waiting = false;
        var target = document.querySelector(`${containerId} ${id}`);
        target.setAttribute('style', 'color:' + colors[0])
        window.setInterval(function() {

            if (letterCount === 0 && waiting === false) {
                waiting = true;
                target.innerHTML = words[0].substring(0, letterCount)
                window.setTimeout(function() {
                    var usedColor = colors.shift();
                    colors.push(usedColor);
                    var usedWord = words.shift();
                    words.push(usedWord);
                    x = 1;
                    target.setAttribute('style', 'color:' + colors[0])
                    letterCount += x;
                    waiting = false;
                }, 1000)
            } else if (letterCount === words[0].length + 1 && waiting === false) {
                // 글자 다시 지우는 부분
                /* waiting = true;
                window.setTimeout(function() {
                    x = -1;
                    letterCount += x;
                    waiting = false;
                }, 1000) */
            } else if (waiting === false) {
                target.innerHTML = words[0].substring(0, letterCount)
                letterCount += x;
            }
        }, 120)

        window.setInterval(function() {
            if (visible === true) {
                con.className = 'console-underscore hidden'
                visible = false;

            } else {
                con.className = 'console-underscore'

                visible = true;
            }
        }, 400)
    }
});
