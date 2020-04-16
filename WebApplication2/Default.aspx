<%@ Page Language="C#" %>
<% 
    libCommon.clsWebFunc objWebFunc = new libCommon.clsWebFunc();

    string longURL = objWebFunc.getRequest(Request, "longURL");
    string shortURL = objWebFunc.getRequest(Request, "shortURL");
    
    string Result;

    if (longURL.Length > 0 && shortURL.Length > 0)
    {
        Result = string.Format("LONG URL : {0}<br />SHORT URL : {1}", longURL, shortURL);
    }
    else
    {
        Result = "";
    }
    %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title></title>

    <script type="text/javascript" src="./Scripts/jquery-1.4.1.js"></script>
    <script type="text/javascript" src="./Scripts/cmnfunc.js"></script>
    <script type="text/javascript">
        function send() {
            var longURL = document.getElementById("longURL");
            var postData = "longURL=" + longURL
            $.ajax({
                type: "POST",
                cache: false,
                async: true,
                url: "./prc.aspx",
                data: postData,
                success: function (data) {
                    if (data.length == 0) {
                        alert("실패했습니다");
                    }
                    else {
                        document.location("./Default.aspx?" + postData + "&shortURL=" + data);
                    }
                },
                error: function (data) {
                    alert("ERR : " + data);
                }
            });
        }
    </script>
</head>
<body>
    <form id="form1" action="#">
    <div>
        <div id="inputField">
            <input id="longURL" type="text" /><a href="javascript:send();">전송</a>
        </div>
        <div id="resultField">
            <%=Result %>
        </div>
    </div>
    </form>
</body>
</html>
