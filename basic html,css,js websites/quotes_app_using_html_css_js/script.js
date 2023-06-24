// https://zenquotes.io?api=[mode]&key=[your_key]&option1=value&option2=value
// https://zenquotes.io/api/quotes

let section=document.getElementById("section");
let paginationButtons=document.getElementById("paginationButtons");
fetchQuotes=async(url,imgUrl)=>{
    try{
        let quoteUrlResponse = await fetch(url);
        let data = await quoteUrlResponse.text();
        let jsonData=JSON.parse(data);
        let imageUrlResponse=await fetch(imgUrl);
        let imageData=await imageUrlResponse.text();
        let jsonImageData=JSON.parse(imageData);
        let totalNoOfItems=jsonData.length;
        let noOfItemsInEachPage=72;
        let page=1;
        let noOfPaginationButtons=Math.ceil(totalNoOfItems/noOfItemsInEachPage);
        makePaginationBtns(noOfPaginationButtons);
        for(i=1;i<=noOfPaginationButtons;i++){
            let btn=document.getElementById(i);
            btn.addEventListener("click",function(e){
                section.innerHTML="";
                page=e.target.id;
                let button=e.target;
                for(i=1;i<=noOfPaginationButtons;i++){
                    let eachButton=document.getElementById(i);
                    if(eachButton.classList.contains("activePageBtn")){
                        eachButton.classList.add("nonActive");
                        eachButton.classList.remove("activePageBtn");
                    }
                }
                button.classList.remove("nonActive");
                button.classList.add("activePageBtn");
                renderingQuotes(page,noOfItemsInEachPage,jsonData,jsonImageData);
            })
        }
        renderingQuotes(page,noOfItemsInEachPage,jsonData,jsonImageData);        
    }
    catch(error){
        console.log(error);
    }
}
fetchQuotes("./quotesApi.json","https://pixabay.com/api/?key=24759661-05cb0b971b3d65286bf7147d2&q=motivation&image_type=photo&pretty=true");
let makePaginationBtns=(noOfPaginationBtns)=>{
    for(i=1;i<=noOfPaginationBtns;i++){
        let eachBtn=document.createElement("div");
        eachBtn.classList.add("pageBtn");
        eachBtn.classList.add("nonActive");
        eachBtn.id=`${i}`;
        eachBtn.innerText=i;
        for(j=1;j<=noOfPaginationBtns;j++){
            paginationButtons.appendChild(eachBtn); 
        }  
    }
}
function renderingQuotes(page,noOfItemsInEachPage,jsonData,jsonImageData){
    page--;
    let start=noOfItemsInEachPage*page;
    let end=start+noOfItemsInEachPage;
    let k=0;
    for(i=start;i<end;i++){
        let eachQuoteObj=jsonData[i];
        if(eachQuoteObj==null){
            break;
        }
        let quoteText=eachQuoteObj.text;
        let quoteAuthor=eachQuoteObj.author;
        let image=jsonImageData.hits[k].largeImageURL; 
        let quoteCardDiv=document.createElement("div");
        quoteCardDiv.classList.add("quoteCard");
        quoteCardDiv.style.backgroundImage=`linear-gradient(to right,rgba(1,1,1,0.3), rgba(1,1,1,0.9)),url(${image})`
        let quoteTextDiv=document.createElement("div");
        let quoteAuthorDiv=document.createElement("div");
        let h1=document.createElement("h1");
        let h4=document.createElement("h4");
        h1.innerText=quoteText;
        h4.innerText=quoteAuthor;
        quoteTextDiv.classList.add("quoteText");
        quoteTextDiv.appendChild(h1)
        quoteAuthorDiv.classList.add("quoteAuthor");
        quoteAuthorDiv.appendChild(h4)
        quoteCardDiv.appendChild(quoteTextDiv);
        quoteCardDiv.appendChild(quoteAuthorDiv);
        k++;
        if(k==19){
            k=0;
        }
        for(let j=start;j<end;j++){
            section.appendChild(quoteCardDiv);
        }
    }
}


// "https://type.fit/api/quotes","https://pixabay.com/api/?key=24759661-05cb0b971b3d65286bf7147d2&q=motivation&image_type=photo&pretty=true"