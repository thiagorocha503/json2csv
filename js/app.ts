const textInput: HTMLTextAreaElement = document.getElementById("text-input") as HTMLTextAreaElement ;
const textOutput: HTMLTextAreaElement = document.getElementById("text-output") as HTMLTextAreaElement;


function onConvert(){
    if(textInput.value == ""){
        alert("Preencha o campo JSON!");
        return;
    }
    let result:string = jsonToCss(textInput.value);
    if(result != null){
        textOutput.value = result;
    } else{
        alert("JSON invalido");
    }
    
}




function jsonToCss(text: string): string | null{
    let json: Array<any>;
    let header: string = "";
    let body: string = "";
    try{
        json = JSON.parse(text);
    } catch(SyntaxError){
        console.log("JSON: error parse");
        return null;
    }
    console.log("JSON: "+json);   
    if(typeof json != "object"){      
        return null;
    }

    if(!Array.isArray(json)){
        console.log("JSON: not array ");
        return null;
    }

    if(json.length == 0){
        console.log("JSON: empty array ");
        return "";
    }
    // header
    let keys: Array<any> = Object.keys(json[0]); 
    keys.forEach(element => {
        header += element + ",";
    });
    header = header.slice(0,-1);
    // body
    if(json.length >= 2){
        for(let i=0; i<json.length;i++){
            let values: Array<any> = Object["values"](json[i]);
            values.forEach(element => {
                body += element + ","
            });
            body = body.slice(0,-1) + "\n";
        }

    }
    return header + "\n" + body;
}

function getJsonValues(json_:Array<any>){
    let body: string = "";
    for(let data in json_){
        let values: Array<any> = Object["values"](data);
        values.forEach(element => {
            body += element + ","
        });
        body = body.slice(0,-1) + "\n";
    }
    return body;
}

function getJsonKey(json_: Array<any>){
    let keys: Array<any> = Object.keys(json_);
    let header: string = "";
    keys.forEach(element => {
        header += element + ",";
    });
    header = header.slice(0,-1);
    return header;
}

function onClean(){
    textInput.value = ""
    textOutput.value = "";

}