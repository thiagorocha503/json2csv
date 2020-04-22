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
        alert("JSON inválido");
    }
}
function jsonToCss(text) {
    var json;
    var result = "";
    try {
        json = JSON.parse(text);
        if (typeof json != "object") {
            return null;
        }
    }
    catch (SyntaxError) {
        console.log("JSON: error parse");
        return null;
    }
    if (!Array.isArray(json)) {
        json = [json];
    }
    if (json.length == 0) {
        return result;
    }
    result += getCsvLine(Object.keys(json[0]));
    json.forEach(function (element) {
        result += "\n" + getCsvLine(Object["values"](element));
    });
    return result;
}
function getCsvLine(array_) {
    var line = "";
    array_.forEach(function (element) {
        if (typeof element == "string") {
            if (element.search("\"") != -1 || element.search(",") != -1) {
                element = "\"" + element.replace(/\"/g, '""') + "\"";
            }
        }
        line += element + ",";
    });
    line = line.slice(0, -1);
    return line;
}
function onClear() {
    textInput.value = "";
    textOutput.value = "";
}
