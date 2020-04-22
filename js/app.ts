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
        alert("JSON inválido");
    }
    
}


function jsonToCss(text: string): string | null{
    let json: any;
    let result = "";
    try{
        json = JSON.parse(text);
        if(typeof json != "object"){      
            return null;
        }
    } catch(SyntaxError){
        console.log("JSON: error parse");
        return null;
    }
    if(!Array.isArray(json)){
        json = [json];
    }
    if(json.length==0){
        return result;
    }
    result += getCsvLine(Object.keys(json[0]));
    json.forEach((element:any)=>{
        result += "\n" + getCsvLine(Object["values"](element));
    });
    return result;
}

function getCsvLine(array_:Array<any>): string{
    let line="";
    array_.forEach(element => {
        if(typeof element =="string"){                 
            if(element.search(`"`)!= -1 || element.search(",") != -1){
                element =  `"`+element.replace(/\"/g, '""')+`"`;
            }
        }
        line += element + ",";
    });
    line = line.slice(0,-1);
    return line;
}


function onClear(){
    textInput.value = ""
    textOutput.value = "";
}