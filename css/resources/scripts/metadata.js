$(function(){
  $("#metadata-viewer").load("/resources/html/metadata_viewer.html");
});

async function getKeywords() {

    let paragraphs = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6");
    let articleContent = "";
    paragraphs.forEach((p) => {
      articleContent += p.textContent.toLocaleLowerCase();
    });

    let matched = new Set();
    await fetch("/resources/keywords.txt").then(response => response.text()).then(function(text) {
        let keywords = text.split(/\n/);

        keywords.forEach((kw) => {
          if (articleContent.includes(kw.trim().toLocaleLowerCase())) {
            matched.add(kw)
          }
        })
    });
    return matched;
}

function getOccurences(word) {
  let paragraphs = document.querySelectorAll("p, h1, h2, h3, h4, h5, h6");

  let occurences = [];
  paragraphs.forEach((p) => {
    let pText = p.textContent.toLocaleLowerCase();
    if (pText != undefined) {
      if (pText.indexOf(word.toLocaleLowerCase()) != -1) {
        occurences.push(p);
      }
    }
  });
  return occurences;
}

function wordClicked(e) {
  let word = e.target.parentNode.innerText;
  let occurences = getOccurences(word);

  let keyWordInfo = document.getElementById("num-occurences");
  keyWordInfo.textContent = occurences.length + " occurences:";

  let occurenceList = document.getElementById("occurence-list");

  while (occurenceList.firstChild) {
    occurenceList.removeChild(occurenceList.firstChild);
  }

  for (i in occurences) {
    let o = occurences[i];

    let li = document.createElement("li");
    let a = document.createElement("a");
    a.text = o.textContent.substring(0, 50) + "..."; 
    a.setAttribute("href", "#");
    a.onclick = () => {
      console.log(o);
      closeMetadata();
      o.scrollIntoView();
    }

    li.appendChild(a);
    occurenceList.appendChild(li);
  }
} 

let listed = false;

$(document).on("click", "#list-button", async function() {
    if (listed) return;
    listed = true;
    var matches = await getKeywords();

    var keywordList = document.getElementById("keyword-list");

    matches.forEach(match => {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.text = match;
        a.setAttribute("href", "#");
        a.onclick = wordClicked;
        li.appendChild(a);
        keywordList.appendChild(li);
    });
  });

$(document).on("click", "#order-button", async function() {
    var keywordList = document.getElementById("keyword-list");

    var cloned = keywordList.cloneNode(false);

    var list = [];
    for (var i = 0; i < keywordList.childNodes.length; i++) {
        let text = keywordList.childNodes[i].textContent;
        if (text.trim()) {
            list.push(text);
        }
    }

    list.sort((a, b) => a.localeCompare(b));

    for (var i = 0; i < keywordList.childNodes.length; i++) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.text = list[i];
        a.setAttribute("href", "#");
        a.onclick = wordClicked;
        li.appendChild(a);
        cloned.appendChild(li);
    }
    keywordList.parentNode.replaceChild(cloned, keywordList);
});

$(document).on("keyup", "#search-text", function() {
    var value = $(this).val().toLowerCase();
    $("#keyword-list li").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

$(document).on("click", "#new-keyword-button", function() {
    let keyword = $("new-keyword-text").val();
    if (keyword != "") {
      
    }

})

function openMetadata() {
  document.getElementById("metadata-sidebar").style.width = "800px";
}

function closeMetadata() {
  document.getElementById("metadata-sidebar").style.width = "0";
} 