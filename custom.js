function IsPC() {
    var userAgentInfo = navigator.userAgent;
    var Agents = ["Android", "iPhone",
        "SymbianOS", "Windows Phone",
        "iPad", "iPod"];
    var flag = true;
    for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) {
            flag = false;
            break;
        }
    }
    return flag;
}


window.onload = function () {



    // 让简体中文选项消失
    var selectors = document.getElementsByClassName('menu-item language');
    if (selectors != null) {
        selectors[0].style.display = 'None';
    }

    var el = document.getElementById('search-desktop');
    if(el != null){
        el.insertAdjacentHTML("beforebegin", '<a href="javascript:void(0);" class="menu-item language" title="清单">清单<i class="fas fa-chevron-right fa-fw"></i>\n' +
            '    <select class="language-select" id="language-select-desktop" onchange="location = this.value; target = \'_blank\'">\n' +
            '        <option> 清单 </option>\n' +
            '        <option value="https://da1yh.xyz/music/">音乐</option>\n' +
            '        <option value="https://da1yh.xyz/anime/">番剧</option>\n' +
            '        <option value="https://da1yh.xyz/game/">游戏</option>\n' +
            '        <option value="https://da1yh.xyz/poppin/">poppin</option>\n' +
            '    </select>\n' +
            '    </a>\n' + '<a href="javascript:void(0);" class="menu-item language" title="搜索">搜索<i class="fas fa-chevron-right fa-fw"></i>\n' +
            '    <select class="language-select" id="language-select-desktop" onchange="location = this.value; target = \'_blank\'">\n' +
            '        <option > 搜索 </option>\n' +
            '        <option value="https://www.baidu.com">百度</a></option>\n' +
            '        <option value="https://www.google.com">google</option>\n' +
            '        <option value="https://www.bing.com">bing</option>\n' +
            '        <option value="https://www.yandex.com">yandex</option>\n' +
            '    </select>\n' +
            '    </a>\n' +
            '\n' +
            '    <a href="javascript:void(0);" class="menu-item language" title="online judge">oj<i class="fas fa-chevron-right fa-fw"></i>\n' +
            '    <select class="language-select" id="language-select-desktop" onchange="location = this.value;target = \'_blank\'">\n' +
            '    <option > oj </option>\n' +
            '    <option value="https://codeforces.com/">codeforces</option>\n' +
            '    <option value="https://ac.nowcoder.com/acm/home">nowcoder</option>\n' +
            '    <option value="https://atcoder.jp/">atcoder</option>\n' +
            '    <option value="https://leetcode-cn.com/problemset/algorithms/">leetcode</option>\n' +
            '    <option value="http://acm.hhu.edu.cn/">hhuoj</option>\n' +
            '    <option value="http://acm.hdu.edu.cn/">hduoj</option>\n' +
            '    <option value="http://poj.org/">poj</option>\n' +
            '    <option value="https://acm.ecnu.edu.cn/">eoj</option>\n' +
            '    <option value="https://www.luogu.com.cn/">luogu</option>\n' +
            '\n' +
            '\n' +
            '    </select>\n' +
            '    </a>\n' +
            '\n' +
            '    <a href="javascript:void(0);" class="menu-item language" title="online ide">oi<i class="fas fa-chevron-right fa-fw"></i>\n' +
            '    <select class="language-select" id="language-select-desktop" onchange="location = this.value;target = \'_blank\'">\n' +
            '    <option > oi </option>\n' +
            '    <option value="https://www.tutorialspoint.com/compile_cpp_online.php">cpp</option>\n' +
            '    <option value="https://www.tutorialspoint.com/compile_java_online.php">java</option>\n' +
            '    <option value="https://www.tutorialspoint.com/execute_python3_online.php">python3</option>\n' +
            '    <option value="https://www.tutorialspoint.com/compile_assembly_online.php">assembly</option>\n' +
            '    <option value="https://www.tutorialspoint.com/execute_golang_online.php">go</option>\n' +
            '    <option value="https://www.tutorialspoint.com/online_html_editor.php">html</option>\n' +
            '    <option value="https://www.tutorialspoint.com/execute_bash_online.php">bash_shell</option>\n' +
            '    </select>\n' +
            '    </a>');


    }



    var isPC = IsPC();
    if(isPC){




        var ele = document.getElementById('toc-auto');
        if (ele != null) {
            ele.insertAdjacentHTML("beforebegin", '<iframe style="left: 20px; width: 320.757px; visibility: visible; position: fixed; top: 90px; height: 200px" src="//player.bilibili.com/player.html?aid=208046212&bvid=BV1qh411p7Sa&cid=411742638&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>\n' +
                '\n' +
                '\n' +
                '\n' +
                '            <iframe frameborder="no" border="0" style="left: 20px; width: 320.757px; visibility: visible; position: fixed; top: 300px; height: 480px" src="//music.163.com/outchain/player?type=0&id=7024708582&auto=0&height=600"></iframe>\n' +
                '\n' +
                '            <div class="Canvas" style="position: fixed; right: 80px; bottom: 0px;z-index: 99999999" id="L2dCanvas "><canvas width="200" height="300" class="live2d" id="live2d"></canvas></div>');

            // 添加live2d的点击事件， 双击换人，单机换装
            var sansan = true;
            var erernum = 19;
            var sansannum = 19;
            var erercnt = 0, sansancnt = 0;
            var ererClothes = ["model/22/model.default.json",
                "model/22/model.2016.xmas.1.json",
                "model/22/model.2016.xmas.2.json",
                "model/22/model.2017.cba-normal.json",
                "model/22/model.2017.cba-super.json",
                "model/22/model.2017.newyear.json",
                "model/22/model.2017.school.json",
                "model/22/model.2017.summer.normal.1.json",
                "model/22/model.2017.summer.normal.2.json",
                "model/22/model.2017.summer.super.1.json",
                "model/22/model.2017.summer.super.2.json",
                "model/22/model.2017.tomo-bukatsu.high.json",
                "model/22/model.2017.tomo-bukatsu.low.json",
                "model/22/model.2017.valley.json",
                "model/22/model.2017.vdays.json",
                "model/22/model.2018.bls-summer.json",
                "model/22/model.2018.bls-winter.json",
                "model/22/model.2018.lover.json",
                "model/22/model.2018.spring.json"];

            var sansanClothes = ["model/33/model.default.json",
                "model/33/model.2016.xmas.1.json",
                "model/33/model.2016.xmas.2.json",
                "model/33/model.2017.cba-normal.json",
                "model/33/model.2017.cba-super.json",
                "model/33/model.2017.newyear.json",
                "model/33/model.2017.school.json",
                "model/33/model.2017.summer.normal.1.json",
                "model/33/model.2017.summer.normal.2.json",
                "model/33/model.2017.summer.super.1.json",
                "model/33/model.2017.summer.super.2.json",
                "model/33/model.2017.tomo-bukatsu.high.json",
                "model/33/model.2017.tomo-bukatsu.low.json",
                "model/33/model.2017.valley.json",
                "model/33/model.2017.vdays.json",
                "model/33/model.2018.bls-summer.json",
                "model/33/model.2018.bls-winter.json",
                "model/33/model.2018.lover.json",
                "model/33/model.2018.spring.json"];


            var canvas = document.getElementById("live2d");

            canvas.addEventListener("click", function() {
                if (sansan) {
                    loadlive2d("live2d", "../" + sansanClothes[sansancnt]);
                    sansancnt++;
                    sansancnt %= sansannum;
                } else {
                    loadlive2d("live2d", "../" + ererClothes[erercnt]);
                    erercnt++;
                    erercnt %= erernum;
                }
            })

            canvas.addEventListener("dblclick", function() {
                if (sansan) {
                    sansan = false;
                    loadlive2d("live2d", "../" + ererClothes[erercnt]);
                    erercnt++;
                    erercnt %= erernum;
                } else {
                    sansan = true;
                    loadlive2d("live2d", "../" + sansanClothes[sansancnt]);
                    sansancnt++;
                    sansancnt %= sansannum;
                }
            })


        }



    }




    var el2 = document.getElementsByClassName('menu');
    console.log(el2.length);

    if(el2[0] != null){
        el2[0].insertAdjacentHTML("beforebegin", '<marquee width="500px">考研加油！！&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;考研加油！！&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;考研加油！！&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</marquee>');
    }


    var sf = new Snowflakes({
        speed: 0.6
    });



    loadlive2d("live2d", "../model/33/model.2016.xmas.2.json");






}