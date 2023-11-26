$(function(){
  $("#custom-navbar").load("/resources/html/navbar.html");
});

$(function(){
  $("#custom-foot").load("/resources/html/footer.html");
});

function selectStyle(style) {
    var oldlink = document.getElementsByTagName("link").item(0);

    var newlink = document.createElement("link");
    newlink.setAttribute("rel", "stylesheet");
    newlink.setAttribute("type", "text/css");
    newlink.setAttribute("href", style);

    document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
}

$("#medieval").click(function() {
    selectStyle("/css/1500-1800.css");
})
$("#victorian").click(function() {
    selectStyle("/css/XIX.css");
})
$("#1920s").click(function() {
    selectStyle("/css/1920s.css");
})
$("#1980s").click(function() {
    selectStyle("/css/1980s.css");
})
$("#modern").click(function() {
    selectStyle("/css/modern.css");
})
$("#future").click(function() {
    selectStyle("/css/future.css");
})

const backToTopButton = document.querySelector(".back-to-top")

const scrollContainer = () => {
  return document.documentElement || document.body;
};

document.addEventListener("scroll", () => {
  if (scrollContainer().scrollTop > 100) {
    backToTopButton.classList.remove("hidden")
  } else {
    backToTopButton.classList.add("hidden")
  }
})

const goToTop = () => {
  document.body.scrollIntoView();
};

if (backToTopButton != undefined) {
  backToTopButton.addEventListener("click", goToTop)
}


// Disclaimer
function disclaimer(){
  var modal = document.getElementById("myModal");
  // Get the button that opens the modal
  var btn = document.getElementById("disclaimer");
  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];
  // When the user clicks the button, open the modal
  btn.onclick = function(){
    modal.style.display = "block";
  }
  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
};