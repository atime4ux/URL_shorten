//////////////////////////
//윈도우 열릴때 실행
function initPage() {
    document.onkeydown = skipBackSpace; //백스페이스 검사
    if (opener != undefined && opener != null) {
        fitToBodySize(); //팝업창에서 창 크기 조절
    }
}

if (window.addEventListener) {
    window.addEventListener("load", initPage, false); // W3C DOM 지원 브라우저 
}
else if (window.attachEvent) {
    window.attachEvent("onload", initPage); // W3C DOM 지원 브라우저 외(ex:MSDOM 지원 브라우저 IE) 
}
else {
    window.onload = initPage;
}
//윈도우 열릴때 실행
//////////////////////////


//공백과 null에 대한 유효성 검사
function isNull(input) {
    if (input == null | input == "") {
        return true;
    }
    return false;
}

//email형식 검사
function isVaildEmail(input) {
    if (!input == "") {
        var format = /^((\w[\-\.])+)@((\w[\-\.])+)\.([A-Za-z]+)$/;
        return isValidFormat(input, format);
    }
}

//공백과 숫자에 대한 유효성 검사
function isNumber(input) {
    if (isNull(input) == false) {
        var chars = "0123456789";
        return containsCharsOnly(input, chars);
    }
    return true;
}

//핸드폰번호에 대한 유효성 검사
function isValidPhone(input) {
    var format = /^(\d+)-(\d+)-(\d+)$/;
    return isValidFormat(input, format);
}

//핸드폰번호에 대한 유효성 검사(null 검사도 포함)
function isValidPhone_u(input) {
    if (isNull(input) == false) {
        var format = /^(\d+)-(\d+)-(\d+)$/;
        return isValidFormat(input, format);
    }
    return true;
}

function isValidFormat(input, format) {
    if (isNull(input) == false) {
        if (input.search(format) != -1) {
            return true;
        }
        return false;
    }
    return false;
}

function containsCharsOnly(input, chars) {
    var inx;
    if (input.length == 10) {
        for (inx = 0; inx < input.length; inx++) {
            if (chars.indexOf(input.charAt(inx)) != -1) {
                return true;
            }
            return false;
        }
    }
    return false;
}

//pageNum click시 다음 페이지에 넘겨야 할 값을 얻어와 submit
function goPage(cPage, pageCnt) {
    var pageNum;
    var pageCnt;

    pageNum = cPage;
    pageCnt = pageCnt;

    document.getElementById("pageNum").value = pageNum;
    document.getElementById("pageCnt").value = pageCnt;

    document.frmSrch.submit();
}

//html의 input tag의 value값들을 가져오는 function
//항목의 name을 기준으로 생성
//ajax에서 사용할 postData 생성
function getPostData() {
    var postData = "";

    $(':input').each(function (index) {
        if ($(this).val() != null) {
            if ($(this).val().length > 0) {
                if (postData.length > 0) {
                    postData += '&';
                }
                postData += $(this).attr('name') + '=' + encodeURIComponent($(this).val());
            }
        }
    }); 

    return postData;
}

//접두사를 포함하는 값만 가져오기
function getPostData_prefix(prefix) {
    var postData = "";

    $(':input').each(function (index) {
        if ($(this).attr('name').indexOf(prefix) == 0) {
            if ($(this).val() != null) {
                if ($(this).val().length > 0) {
                    if (postData.length > 0) {
                        postData += '&';
                    }
                    postData += $(this).attr('name') + '=' + encodeURIComponent($(this).val());
                }
            }
        }
    });

    return postData;
}

function callAjax(target_url, postData, success_url, fail_msg) {
    $.ajax({
        type: "POST",
        cache: false,
        async: true,
        url: target_url,
        data: postData,
        success: function (data) {
            if (data == "SUCCESS") {
                document.location = success_url;
            }
            else {
                alert(fail_msg);
            }
        },
        error: function (data) {
            if (pageName == "MEM001.aspx") {

                for (i = 0; i < document.frmSrch.check.length; i++) {
                    document.frmSrch.check[i].checked = false;
                }
            }
            else {
                alert("ERR : " + data);
            }
        }
    });
}

//성공과 실패했을때 각각 함수를 지정해서 실행, json데이터를 수신
function callAjax_2(target_url, postData, success_func, error_func) {
    $.ajax({
        type: "POST",
        dataType: 'json',
        cache: false,
        url: target_url,
        data: postData,
        success: function (data)
        { success_func(data) },
        error: function (data)
        { error_func(data) }
    });
}

//popup창에서 값 넘기기
function setPopVal(inputid, val) {
    opener.document.getElementById(inputid).value = val;
    self.close();
}

//체크박스 전체 클릭i
function checkbox(field) {
    if (field[0].checked == true) {
        for (i = 0; i < field.length; i++) {
            field[i].checked = true;
        }
    } else {
        for (i = 0; i < field.length; i++) {
            field[i].checked = false;
        }
    }
}

//enter키 이벤트
function enterPress(e, event_id) {
    var elem = document.getElementById(event_id);
    var key;

    //이벤트가 null이면 윈도우 이벤트로 전환
    if (!e) {
        e = window.event;
    }

    //키값 저장
    if (e.keyCode) {
        key = e.keyCode;
    }
    else {
        key = e.charCode;
    }
    if (key == 13) {
        if (elem.tagName == "A") return Function(elem.getAttribute("href"))(); //a태그는 직접 함수 호출
        else elem.click(); //input 태그는 click메소드 호출
    }
}

/*
function eventFirefox(event_id) {
    if (event_id == "comp_search") {
        return comp_search();
    }
    else if (event_id == "part_search") {
        return part_search();
    }
    else if (event_id == "user_search") {
        return user_search();
    }
    else if (event_id == "loginF") {
        return login();
    }
    else if (event_id == "mNum_search") {
        return mNum_search();
    }
    else if (event_id == "sNum_search") {
        return sNum_search();
    }
    else if (event_id == "goSearch") {
        return goSearch();
    }
    else if (event_id == "sNum_pop_search") {
        return gosNum_Search();
    }
    else if (event_id == "mNum_pop_search") {
        return gomNum_Search();
    }
    else if (event_id == "comp_pop_search") {
        return comp_pop_search();
    }
    else if (event_id == "part_pop_Search") {
        return part_pop_Search();
    }
    else if (event_id == "user_pop_search") {
        return user_pop_Search();
    }
}
*/

function popupOpen(prcURL, openURL, field, name, width, height) {
    var winOpts = "toolbar=no, location=no, directories=no, status=no, menubar=no, width=" + width + "," + "height=" + height;
    
    if (name == "URL") {
        var postData = getPostData();
    } else {
        var postData = getPostData() + "&popupOpen=POPUPCOUNT";
    }
    
    var popupData;

    var f_action = field.action;
    var f_method = field.method;
    var f_target = field.target;
    
    $.ajax({
        type: "POST",
        cache: false,
        async: true,
        url: prcURL,
        data: postData,
        success: function (data) {
            if (data.length == undefined) {
                data = "";
            }
            popupData = data.split("|");

            if (popupData[0] == "0") {
                alert("검색 결과가 없습니다.");
            }
            else if (popupData[0] == "1") {
                setOpenerField(data);
            }
            else {
                window.open("", name, winOpts);
                field.action = openURL;
                field.method = "post";
                field.target = name;
                field.submit();

                //부모창 값 원래대로
                field.action = f_action;
                field.method = f_method;
                field.target = f_target;
            }
        },
        error: function (data) {
            alert("ERR : " + data);
        }
    });
}

//json형식의 데이터를 받아서 처리
function popupOpen_2(prcURL, postData, openURL, formField, name, pop_width, pop_height) {
    var winOpts = "toolbar=no, location=no, directories=no, status=no, menubar=no, width=" + pop_width + "," + "height=" + pop_height;

    var f_action = formField.action;
    var f_method = formField.method;
    var f_target = formField.target;

    $.ajax({
        type: "POST",
        dataType: 'json',
        cache: false,
        async: true,
        url: prcURL,
        data: postData,
        success: function (data) {
            if (data.list.length == 0) {
                alert("검색 결과가 없습니다.");
            }
            else if (data.list.length == "1") {
                setOpenerField_2(data);
            }
            else {
                //팝업창 생성
                window.open("", name, winOpts);
                formField.action = openURL;
                formField.method = "post";
                formField.target = name;
                formField.submit();

                //부모창 값 원래대로
                formField.action = f_action;
                formField.method = f_method;
                formField.target = f_target;
            }
        },
        error: function (data) {
            //json데이터 포맷이 아니거나 호출 에러
            alert("ERR : " + data);
        }
    });
}

//json객체를 받아서 필드에 값 입력

function setOpenerField_2(json_obj) {
    /*json형식
    json_obj = {
    "list":
        [
            { "elem":
                [
                    { "e_id": "comp_id", "e_value": "000001" },
                    { "e_id": "comp_name", "e_value": "호미_1" },
                    { "e_id": "part_id", "e_value": "00000a" },
                    { "e_id": "part_name", "e_value": "개발_1" },
                    { "e_id": "user_id", "e_value": "abcd" }
                    { "e_id": "user_name", "e_value": "현석_1" }
                ]
            },
            { "elem":
                [
                    { "e_id": "comp_id", "e_value": "000002" },
                    { "e_id": "comp_name", "e_value": "호미_2" },
                    { "e_id": "part_id", "e_value": "00000b" },
                    { "e_id": "part_name", "e_value": "개발_2" },
                    { "e_id": "user_id", "e_value": "qwer" }
                    { "e_id": "user_name", "e_value": "현석_2" }
                ]
            }
        ]
    };
    */
    for (i = 0; i < json_obj.list.length; i++) {
        for (j = 0; j < json_obj.list[i].elem.length; j++) {
            $("#" + json_obj.list[i].elem[j].e_id).val(json_obj.list[i].elem[j].e_value);
        }
    }
}

function setOpenerField(text) {
    var tmp = text.split("|");
    //comp,part,user일 경우
    if (tmp[3] != "") {
        $("#" + tmp[3]).val(tmp[1]);
        $("#f" + tmp[3]).val(tmp[1]);
    }

    if (tmp[4] != "") {
        $("#" + tmp[4]).val(tmp[2]);
        $("#f" + tmp[4]).val(tmp[2]);
    }


    //mNum일 경우 추가
    if (tmp.length == 7) {

        $("#" + tmp[6]).val(tmp[5]);
        $("#f" + tmp[6]).val(tmp[5]);

    }
    //sNum일 경우
    else if (tmp.length == 9) {

        $("#" + tmp[6]).val(tmp[5]);
        $("#f" + tmp[6]).val(tmp[5]);
        $("#" + tmp[8]).val(tmp[7]);
        $("#f" + tmp[8]).val(tmp[7]);

    }
    //pollIdx일 경우
    else if (tmp.length == 13) {

        $("#" + tmp[6]).val(tmp[5]);
        $("#f" + tmp[6]).val(tmp[5]);
        $("#" + tmp[8]).val(tmp[7]);
        $("#f" + tmp[8]).val(tmp[7]);

        $("#" + tmp[10]).val(tmp[9]);
        $("#" + tmp[12]).val(tmp[11]);
        $("#f" + tmp[12]).val(tmp[11]);

    }

}

function getCheckboxData(input1, input2, input3) {
    var arr_tmp = "";
    var checkboxData = "";
    var pageName = input1;
    var PGMID = input2;
    var input3Data = "";

    if (pageName == PGMID + ".aspx") {
        $("input:checkbox[name=check]:checked").each(function (i) {
            input3Data += $(this).val() + '|';
        });
    }
    else if (pageName == PGMID + "_edt.aspx") {
        input3Data = $("#" +input3).val();
    }

    postData = 'PGMID=' + PGMID + '&FUNCNAME=DELDATA&' + input3 + '=' + input3Data;

    return postData + "||" + input3Data;
}

function msg(input) {
    if (input == "del") {
        return "삭제 하시겠습니까??";
    }
}

//백스페이스 스킵
// readOnly나 disabled인 경우 작동하지 않도록
function skipBackSpace(event) {
    var e;

    if (!event) {
        e = window.event;
    }
    else {
        e = event;
    }

    //alert("You pressed a following key : " + window.event.keyCode);
    // back-space 누를 때 

    if (e.keyCode == 8) {
        if (e.srcElement != undefined) {
            if (e.srcElement.readOnly || e.srcElement.disabled) {
                alert("수정할 수 없는 값입니다.");
                e.returnValue = false;
                return;
            }
        }
        else {
            if (e.target.readOnly || e.target.disabled) {
                alert("수정할 수 없는 값입니다.");
                e.preventDefault();
                return;
            }
        }
    }
}

function showImgWin(what) {
    var ToImgPage = "../ImgOpen.aspx?ImgURL=" + encodeURIComponent(what);
    window.open(ToImgPage, 'Image', 'scrollbars=no,status=no,toolbar=no,resizable=1,location=no, menu=no,width=10,height=10');
    
    /*
    var imgwin = window.open(imgPage, 'Image', 'scrollbars=no,status=no,toolbar=no,resizable=1,location=no, menu=no,width=10,height=10');
    imgwin.focus();
    imgwin.document.open();
    imgwin.document.write("<!DOCTYPE HTML PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN'>\n");
    imgwin.document.write("<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8' />\n"); // euc-kr? utf-8?
    imgwin.document.write("<title>Image</title>\n");   // 새창으로 페이지 제목
    imgwin.document.write("<sc" + "ript>\n");
    imgwin.document.write("function resize() {\n");
    imgwin.document.write("pic = document.il;\n");
    imgwin.document.write("if (eval(pic).height) { var name = navigator.appName\n");
    imgwin.document.write("  if (name == 'Microsoft Internet Explorer') { myHeight = eval(pic).height + 60;  myWidth = eval(pic).width + 10;\n");
    imgwin.document.write("  } else { myHeight = eval(pic).height + 56; myWidth = eval(pic).width + 8; }\n");
    imgwin.document.write("  //clearTimeout();\n");
    imgwin.document.write("  var height = screen.height;\n");
    imgwin.document.write("  var width = screen.width;\n");
    imgwin.document.write("  var leftpos = width / 2 - myWidth / 2;\n"); //hjhj
    imgwin.document.write("  var toppos = height / 2 - myHeight / 2; \n");
    imgwin.document.write("  self.moveTo(leftpos, toppos);\n");
    imgwin.document.write("  self.resizeTo(myWidth, myHeight);\n");
    imgwin.document.write("}else setTimeOut(resize(), 100);}\n");
    imgwin.document.write("</sc" + "ript>\n");
    imgwin.document.write("</head><body style='margin:0px;padding:0px'>\n");
    imgwin.document.write("<img border=0 src=" + what + " xwidth='100' xheight='9' name='il' onload='resize();' alt='이미지를 클릭하시면 창이 닫힙니다.' title='이미지를 클릭하시면 창이 닫힙니다.' onclick='javascript:window.close()' />\n");
    imgwin.document.write("</body></html>\n");
    imgwin.document.close();
    */
}

//모든 input의 이름과 값을 모아서 post방식으로 전송
function sendPost(url) {
    var form = document.createElement("form");
    form.name = 'sendPost_tmp_form';
    form.method = 'post';
    form.action = url;

    $(':input').each(function (index) {
        if ($(this).val() != null) {
            if ($(this).val().length > 0) {
                var input = document.createElement("input");
                input.type = "hidden";
                input.name = $(this).attr('name');
                input.value = $(this).val();
                $(form).append(input);
            }
        }
    });

    $('#body').append(form);
    form.submit();
    $(form).remove();//추가한 form 제거
}

function go_Excel(filepath) {
    var comp_id = $("#comp_id").val();
    var mNum = $("#mNum").val();
    var sNum = $("#sNum").val();
    var option = "?EXCEL=YES";

    $("#fcomp_id").val(comp_id);
    $("#fmNum").val(mNum);
    $("#fsNum").val(sNum);

    sendPost(filepath + option);
    /*
    var PGMID = $("#PGMID").val();
    var comp_id = $("#comp_id").val();
    var comp_name = $("#comp_name").val();
    var part_id = $("#part_id").val();
    var part_name = $("#part_name").val();
    var user_id = $("#user_id").val();
    var sDate = $("#sDate").val();
    var eDate = $("#eDate").val();
    
    var mNum = $("#mNum").val();
    var sNum = $("#sNum").val();
    var CARRIER = $("#CARRIER").val();

    var fMTTYPE = $("#fMTTYPE").val();
    var MSGKIND = $("#MSGKIND").val();
    var srchWrd = $("#srchWrd").val();
    var pageCnt = $("#pageCnt").val();

    var Data = "&comp_id=" + comp_id + "&comp_name=" + comp_name + "&part_id=" + part_id + "&part_name=" + part_name + "&user_id=" + user_id + "&sDate=" + sDate + "&eDate=" + eDate + "&fMTTYPE=" + fMTTYPE + "&MSGKIND=" + MSGKIND + "&srchWrd=" + srchWrd + "&pageCnt=" + pageCnt + "&fmNum=" + mNum + "&fsNum=" + sNum + "&CARRIER=" + CARRIER;

    var folder = PGMID.substring(0, 3);

    if (folder == "CMN") {

        document.location = "../common/" + PGMID + ".aspx?EXCEL=YES" + "&" + getPostData();

    } else if (folder == "MEM") {
        if (PGMID == "MEM004") {
            document.location = "../account/" + PGMID + "_edt.aspx?EXCEL=YES" + "&fcomp_id=" + comp_id + "&user_id=" + user_id;
        } else if (PGMID == "MEM005") {

            document.location = "../account/" + PGMID + ".aspx?EXCEL=YES" + "&fcomp_id=" + comp_id;
        }
        else {

            document.location = "../account/" + PGMID + ".aspx?EXCEL=YES" + "&" + getPostData();
        }

    } else if (folder == "MOM") {

        document.location = "../MO/" + PGMID + ".aspx?EXCEL=YES" + Data;

    } else if (folder == "MTM") {

        //document.location = "../MTM/" + PGMID + ".aspx?EXCEL=YES" + "&" + getPostData();
        document.location = "../MTM/" + PGMID + ".aspx?EXCEL=YES" + Data;

    } else if (folder == "MTS") {

        document.location = "../MTS/" + PGMID + ".aspx?EXCEL=YES" + "&" + getPostData();

    }
    else if (folder == "EVT") {

        document.location = "../EVT/" + PGMID + ".aspx?EXCEL=YES" + "&" + getPostData();
    }

    else if (folder == "STA") {

        document.location = "../STA/" + PGMID + ".aspx?EXCEL=YES" + "&" + getPostData();
    }

    else if (folder == "POL") {

        document.location = "../POL/" + PGMID + ".aspx?EXCEL=YES" + "&" + getPostData();
    }
    */
}

//숨김, 보이기
function change_disp(id) {
    document.getElementById(id).style.display = "block";
    /*    
    var change_obj = document.getElementById(id);
    var displayNoneID = "";

    displayNoneID =  $("#display").val();
    
    if (change_obj.style.display == "none") {
        change_obj.style.display = "block";
        if (displayNoneID != "" && displayNoneID != undefined) {
            document.getElementById(displayNoneID).style.display = "none";
        }
    } else {
        change_obj.style.display = "none";
    }

    $("#display").val(id);
    */
}

//바디태그 크기만큼 창 크기 조절
function fitToBodySize() {
    self.resizeTo(document.documentElement.scrollWidth + 35, document.documentElement.scrollHeight + 100);
}

//////////////////////////////////////////////////////////////////
/////////////////////////여기부터 툴팁용 js/////////////////////////
//임시 메세지 박스 숨김
function hideN(elemID) {
    if (document.all) {
        document.getElementById(elemID).style.visibility = "hidden";
    }
    else {
        document.getElementById(elemID).style.visibility = "hidden";
    }
}

//임시 메세지 박스 표시
function showN(elemID) {
    if (document.all) {
        document.getElementById(elemID).style.visibility = "visible";
    }
    else {
        document.getElementById(elemID).style.visibility = "visible";
    }
}

//임시 메세지 박스(span태그)에 원문 삽입 후 표시
function find_Obj(tmpBox_elemID, source_elemID, e) {
    var tmpBox;
    var MSG;

    if (!e) {
        e = window.event;
    }

    tmpBox = document.getElementById(tmpBox_elemID);//임시 메세지 박스
    MSG = $("#" + source_elemID).val();//원문 메세지

    tmpBox.style.pixelLeft = e.clientX + document.documentElement.scrollLeft + 10;
    tmpBox.style.pixelTop = e.clientY + document.documentElement.scrollTop + 10;
    
    tmpBox.getElementsByTagName("span")[0].innerHTML = MSG; //메시지 삽입
    tmpBox.style.visibility = "visible"; //표시되도록 속성 변경
}
/////////////////////////여기까지 툴팁용 js/////////////////////////
//////////////////////////////////////////////////////////////////

//문자열의 바이트 길이 반환
function getByteLength(str) {
    var tmpStr;
    var onechar;
    var totalLength = 0;
    var i;
    
    tmpStr = new String(str);

    for (i = 0; i < tmpStr.length; i++) {
        onechar = tmpStr.charAt(i);
        if (escape(onechar) == '%0D') {
            continue;
        }
        else if (escape(onechar).length > 4) {
            totalLength += 2;
        }
        else {
            totalLength++;
        }
    }

    return totalLength;
}