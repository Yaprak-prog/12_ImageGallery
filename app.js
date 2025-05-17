
const searchForm=document.getElementById("search-form");
const searchBox=document.getElementById("search-box");
const searchButton=document.getElementById("search-button");
const showButton=document.getElementById("show-button");
const imageBox=document.querySelector(".image-box");

let keyword="";
let page=1;

searchForm.addEventListener("submit",(e)=>{ 
   e.preventDefault();
   page=1;
   searchImages();});

showButton.addEventListener("click",()=>{
    page++;
    searchImages();
console.log(page);})



async function searchImages(){

    keyword=searchBox.value;
    const accessKey="kGr__edQeBqAhdpLM8krTFLyfkwKL5fA3zHJvSEvyVw";
    const url=`https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    
    const response=await fetch(url);
    const data=await response.json();

  
    if(page===1)
    {
        imageBox.innerHTML="";
    }

    const results=data.results;
   
    results.map((result)=> {

        const image=document.createElement("img");
        image.src=result.urls.small;
        const imageLink=document.createElement("a");
        imageLink.href=result.links.html;
        imageLink.target="_blank";
        imageLink.appendChild(image);
        imageBox.appendChild(imageLink);

    })
    
    if(results.length>=12)
    {
        showButton.style.display="block";
    }
}

