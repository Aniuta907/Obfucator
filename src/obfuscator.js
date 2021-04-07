export const deleteWhitespaces = (str) =>{
  return str.replace(/\s+/g,' ');
}

export const deleteMultilineСomments = (str) =>{
  return str.replace(/(\/\*(?:(?!\*\/).|[\n\r])*\*\/)/g,'');
}

export const deleteSinglelineСomments = (str) =>{
  let commas = false;

  for (let i = 0;i < str.length; i++){
    if ((str[i] == "\"") && (commas == false)){
      commas = true;
      continue;
    }

    if ((str[i] == "\"") &&(str[i+1] == "\"") &&(commas == true)){
       commas = false;
       i++;
       continue;
     }

   if ((str[i] == "\"") && (commas == true)){
      commas = false;
      continue;
    }

   if ((str[i] == "\/") && (str[i+1] == "\/")){
    if (commas == false) {
      for (let j = i + 2; j < str.length; j++){
        if ((str[j] == "\n")){
            str = str.slice(0, i) + str.substring(j, str.length);
          break;
        }
      }
    }
    else {
      for (let j = i + 2; j < str.length; j++)
        if (str[j] == "\""){
          commas = false;
          i = j+1;
          break;
        }
  }
}
}
return str;
};

export const makeDeadCodeInjection = (str) => {
  const deadCode = [
    '\nisNaN(5879 + 0/0 - "adfggdb" + 111); \n\nparseInt("20111993 + 20111993 - 20111993/3 + 20111993.5"); \nparseFloat("0907.1996 * 0.3546 * 1.99"); \nisFinite("31121993 / 3/14 * 7.5 ");',
    '\nparseInt("20111993 + 20111993 - 20111993/3 + 20111993.5"); \n\nparseFloat("0907.1996 * 0.3546 * 1.99"); \nisFinite("31121993 / 3/14 * 7.5 "); \nisNaN(5879 + 0/0 - "adfggdb" + 111);',
    '\nparseFloat("0907.1996 * 0.3546 * 1.99"); \n\nisNaN(5879 + 0/0 - "adfggdb" + 111); \nisFinite("31121993 / 3/14 * 7.5 "); \n\nparseInt("20111993 + 20111993 - 20111993/3 + 20111993.5");',
  ];

  const array = str.split(';');
  let randomI;
  for (let i = 0; i < array.length; i++) {
    if (array[i].trim().startsWith("let") || array[i].trim().startsWith("const")) { 
      randomI = Math.floor(Math.random() * deadCode.length);
      array.splice( i, 0, "\n" + deadCode[randomI]);
      i++;
    }
  }

  const newstr = array.join('; ');
  return newstr;
}

export const randomInteger = (min, max) => {
  var rand = min - 0.5 + Math.random() * (max - min + 1)
  rand = Math.round(rand);
  return rand;
}

let oldVars, newVars;

export function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

export function isLetter(c) {
  return c.toLowerCase() != c.toUpperCase();
}

export const renameVariables = (str) =>{
  const makeid = () => {
      var text = "";
      var possible = "abcdefghijklmnopqrstuvwxyz";

      text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
  }

    const substrSearch = (target) => {
        let arrsubstr = [];
        let k = 0;
        var pos = -1;
        while ((pos = str.indexOf(target, pos + 1)) != -1) {
          arrsubstr[k] = pos;
          k++;
        }
        return arrsubstr;
    }

    let oldVarArray = [];
    let arrvariab = [];
    let variabnumber = 0;
    let arr = [];
    let len = -1;

    const identifSearch = (stroka) => {
        len = stroka.length;
        arr = substrSearch(stroka);
        for (let i = 0; i < arr.length; i++){
          let identif = "";
          let newidentif = "";
          let flag = false;
          let idindex = -1;
          let idIndexArr = [];
          let h=0;

          for (let j = arr[i]+len; j < str.length; j++)
              if (str[j]==" ")
                h++;
              else break;

          for (let j = arr[i]+len+h; j < str.length; j++)
            if ((str[j] != ".") && (str[j] != " ") && (str[j] != "=") && (str[j] != ";") && (str[j] != "(") && (str[j] != ")") && (str[j] != "\"") &&(str[j] != "[") &&(str[j] != "]"))
              identif += str[j];
            else break;

          if (identif != ""){
            do{
              newidentif = makeid() + randomInteger(100, 999);
              if (arrvariab.indexOf(newidentif) == -1){

              idIndexArr = substrSearch(identif);

              for (let ii = 0; ii < idIndexArr.length; ii++){
                idindex = idIndexArr[ii];

              if ((isLetter(str.charAt(idindex - 1)) != true)&&(str.charAt(idindex - 1)!="$")&&(str.charAt(idindex - 1)!="_"))
              if ((isLetter(str.charAt(idindex + identif.length)) != true) &&(str.charAt(idindex + identif.length)!="$")&&(str.charAt(idindex + identif.length)!="_")&&(isNumber(str.charAt(idindex + identif.length)))!=true)
                {
                  str = str.slice(0, idindex) + newidentif + str.slice(idindex + identif.length);
                  idIndexArr = substrSearch(identif);
                  ii--;
                }
              }
                arrvariab[variabnumber] = newidentif;
                oldVarArray[variabnumber] = identif;
                variabnumber++;
                flag = true;
              }

            } while (flag == false);
        }
          arr = substrSearch(stroka);
        }
    }
    identifSearch("let ");
    identifSearch("var ");
    identifSearch("const ");
    identifSearch("function ");

    oldVars = oldVarArray;
    newVars = arrvariab;

    return str;
}

document.addEventListener('DOMContentLoaded', function () {
var sCom = document.querySelector('#singleCom');
var mCom = document.querySelector('#multiCom');
var rVar = document.querySelector('#renameVar');
var wSp = document.querySelector('#whiteSp');
var deadC = document.querySelector('#deadCode');
var ifelse = document.querySelector('#ifelse');
var all = document.querySelector('#all');

document.querySelector("#comment2tab").addEventListener("click", function () {
  openTab(event, 'comment2');
});

document.querySelector("#metadatabtn").addEventListener("click", function () {
  openTab(event, 'metadata');
});

function create(text, name, type) {
  var dlbtn = document.getElementById("dlbtn");
  var file = new Blob([text], {type: type});
  dlbtn.href = URL.createObjectURL(file);
  dlbtn.download = name;
  return file.size;
}

document.getElementById('file').onchange = function (e) {
  document.querySelector("#label").innerText = this.value.replace(/.*[\/\\]/, '');
  handleObfButton();
};

all.onchange = function () {
  if (all.checked) {
    sCom.checked = true;
    mCom.checked = true;
    rVar.checked = true;
    wSp.checked = true;
    deadC.checked = true;
    ifelse.checked = true;
  } else {
    sCom.checked = false;
    mCom.checked = false;
    rVar.checked = false;
    wSp.checked = false;
    deadC.checked = false;
    ifelse.checked = false;
  }
  handleObfButton();
};

const listenAllChecked = function () {
  if (sCom.checked && mCom.checked && rVar.checked && wSp.checked && deadC.checked && ifelse.checked) {
    all.checked = true;
  } else if (!sCom.checked || !mCom.checked || !rVar.checked || !wSp.checked || !deadC.checked || !ifelse.checked) {
    all.checked = false;
  }
  handleObfButton();
}

const handleObfButton = function () {
  const obfButton = document.querySelector('#obf');
  if (document.querySelector("#file").value && (sCom.checked || mCom.checked || rVar.checked || wSp.checked || deadC.checked || ifelse.checked || all.checked)) {
    obfButton.disabled = false;
  } else {
    obfButton.disabled = true;
  }
}

sCom.onchange = listenAllChecked;
mCom.onchange = listenAllChecked;
rVar.onchange = listenAllChecked;
wSp.onchange = listenAllChecked;
deadC.onchange = listenAllChecked;
ifelse.onchange = listenAllChecked;

document.getElementById('obf').addEventListener("click", function () {
  readFile(document.getElementById('file'));
  document.getElementById("comment2tab").click();
});

function readFile(object) {
let file = object.files[0];
let metadata = "Размер исходного файла: " + file.size + " кб\n";
  if (file.type !== "text/javascript") {
    alert('Выбранный файл должен иметь тип "text/javascript"');
    return;
  }
let reader = new FileReader();

reader.onload = function(event) {
  let content = event.target.result;
  if (!content) {
    alert('Выбранный файл не должен быть пустым');
    return;
  }
   document.getElementsByName("comment")[0].innerHTML = content;

  let newcontent = content;

  if (all.checked) {
    newcontent = deleteSinglelineСomments(newcontent);
    newcontent = deleteMultilineСomments(newcontent);
    newcontent = renameVariables(newcontent);
    newcontent = makeDeadCodeInjection(newcontent);
    newcontent = deleteWhitespaces(newcontent);
  } else {
    if (sCom.checked)
       newcontent = deleteSinglelineСomments(newcontent);

    if (mCom.checked)
       newcontent = deleteMultilineСomments(newcontent);

   if (rVar.checked)
       newcontent = renameVariables(newcontent);

   if (deadC.checked)
       newcontent = makeDeadCodeInjection(newcontent);

   if (wSp.checked)
       newcontent = deleteWhitespaces(newcontent);
  }

  document.querySelector('#save').disabled = false;
  document.getElementsByName("comment2")[0].innerHTML = newcontent;

  function getFileSize(newcontent) {
     var promise = new Promise(function(resolve, reject) {
       window.setTimeout(function() {
         const fileSize = create(newcontent, 'file.js', 'application/javascript');
         resolve(fileSize);
       });
     });
     return promise;
  }

  getFileSize(newcontent).then(function(fileSize) {
    metadata += "Размер обфусцированного файла: " + fileSize + " кб\n\n";
    if (oldVars && oldVars.length) {
    metadata += "Переименовано: " + oldVars.length  + " переменных и функций\n";
      for (let i=0; i < oldVars.length; i++) {
        metadata += oldVars[i] + " => " + newVars[i] + "\n";
      }
    }
    document.getElementsByName("metadata")[0].innerHTML = metadata;
  });
  }

reader.readAsText(file);
}

function openTab(event, tabName) {
  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementsByName(tabName)[0].style.display = "block";
  event.currentTarget.className += " active";
}
})