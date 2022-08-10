// Get the modal
let modal = document.getElementById("modal-container");

// Get the button that opens the modal
let showModel = document.getElementById("show-modal");

// Get the close button that close the modal
let close = document.getElementById("close");

//open box
showModel.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//close box
close.onclick = function () {
  modal.style.display = "none";
};


//Get Names

let result = document.getElementById("submit");
result.onclick = function(){
  alert(`your bookmark saved successfully!!!`);
  modal.style.display = "none";
}
bookmarkform = document.getElementById("bookmark-form");
bmcontainer = document.getElementById("container");
let dataArray = [];


//delete bookmark.....

function deletebm(url){
  dataArray.forEach((bmarks,i)=>{
    if(bmarks.url===url){
      dataArray.splice(i,1);
    }
  })
  // after delete update a dom
  localStorage.setItem("Book_Marks", JSON.stringify(dataArray));
  fetchLocalStorage();
}



//Dom Model For SET DATA on bmcontainer
function getDom() {
  bmcontainer.innerHTML =""
  dataArray.forEach((bmarks) => {
    let { name, url } =bmarks;
    bmcontainer.innerHTML += `
    <div class="item">
    <div onclick="deletebm('${url}')" class="close"><i class="fas fa-times"></i></div>
    <br>
    <img src = 'https://s2.googleusercontent.com/s2/favicons?domain=${url}'></img>
    <a target=”_blank” href="${url}" >${name}</a>    
</div>
    `;
  });
}


//fetch storage data from local storge and get the dom
function fetchLocalStorage() {
  if (localStorage.getItem("Book_Marks")) {
    dataArray = JSON.parse(localStorage.getItem("Book_Marks"));
  }
  localStorage.setItem("Book_Maks", JSON.stringify(dataArray));
  getDom();
}



// bookmarkform evet listener
bookmarkform.addEventListener("submit", function (e) {
  e.preventDefault();
  let webname = document.getElementById("website-name").value;
  let weburl = document.getElementById("website-url").value;
  if (!weburl.includes("http://") && !weburl.includes("https://")) {
    var newurl = `https://${weburl}`;
  }

  // dataobject
  dataobj = {
    name: webname,
    url: newurl,
  };
  dataArray.push(dataobj);

  // set localstorage
  localStorage.setItem("Book_Marks", JSON.stringify(dataArray));
  fetchLocalStorage();
  bookmarkform.reset();
});

//every time check the storage and load it if item exist
fetchLocalStorage();
