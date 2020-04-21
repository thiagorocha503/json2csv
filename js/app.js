var textInput = document.getElementById("text-input");
var textOutput = document.getElementById("text-output");
function onConvert() {
    if (textInput.value == "") {
        alert("Preencha o campo JSON!");
        return;
    }
    var result = jsonToCss(textInput.value);
    if (result != null) {
        textOutput.value = result;
    }
    else {
        alert("JSON invalido");
    }
}
function jsonToCss(text) {
    var json;
    var header = "";
    var body = "";
    try {
        json = JSON.parse(text);
    }
    catch (SyntaxError) {
        console.log("JSON: error parse");
        return null;
    }
    if (typeof json != "object") {
        return null;
    }
    if (!Array.isArray(json)) {
        console.log("JSON: not array ");
        return null;
    }
    if (json.length == 0) {
        console.log("JSON: empty array ");
        return "";
    }
    // header
    var keys = Object.keys(json[0]);
    keys.forEach(function (element) {
        header += element + ",";
    });
    header = header.slice(0, -1);
    // body
    if (json.length >= 2) {
        for (var i = 0; i < json.length; i++) {
            var values = Object["values"](json[i]);
            values.forEach(function (element) {
                body += element + ",";
            });
            body = body.slice(0, -1) + "\n";
        }
    }
    return header + "\n" + body;
}
function getJsonValues(json_) {
    var body = "";
    for (var data in json_) {
        var values = Object["values"](data);
        values.forEach(function (element) {
            body += element + ",";
        });
        body = body.slice(0, -1) + "\n";
    }
    return body;
}
function getJsonKey(json_) {
    var keys = Object.keys(json_);
    var header = "";
    keys.forEach(function (element) {
        header += element + ",";
    });
    header = header.slice(0, -1);
    return header;
}
function onClear() {
    textInput.value = "";
    textOutput.value = "";
}
