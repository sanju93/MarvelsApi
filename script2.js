let id = localStorage.getItem('id');
let container = document.getElementById('container');
let moreInfo = document.getElementById('more-info');

function Render(data,type){


    while(moreInfo.firstChild){
       moreInfo.removeChild(moreInfo.firstChild); 
    }
 

    if (data.length === 0){
        let heading = document.createElement('h1');
        heading.innerHTML = `No ${type} Are There`;
        moreInfo.appendChild(heading);
    }else{
    console.log(data);
    for (let i = 0; i < data.length; i++) {

          // cards 
    let childDiv = document.createElement('div');
    childDiv.setAttribute('class','child1');
    
    // thumbnail
        if (type === "Comic" || type === "Series"){
            let index = data[i].thumbnail.path.indexOf(":");
            let url = data[i].thumbnail.path.substring(index + 1,data[i].thumbnail.path.length);
           
            let img = document.createElement('img');
    
            img.setAttribute('src',"https:" + `${url}` + `.${data[i].thumbnail.extension}`);
            childDiv.appendChild(img);

        }
    

    //title
        
        let p = document.createElement('p');
        p.innerHTML = `Title of ${type} : ` + data[i].title;
        childDiv.appendChild(p);

    //pages

    if (type === 'Comic'){

        let pages = document.createElement('p');
        pages.innerHTML = "Total Pages : " + data[i].pageCount;
        childDiv.appendChild(pages);
        

    }
        

       // appending info in card
    
     



      moreInfo.appendChild(childDiv);  

    }
        
    }

}

window.addEventListener('load',async function(){

    let res = await this.fetch(`https://gateway.marvel.com/v1/public/characters/${id}?ts=0&apikey=8d41e820fa1fd94be2403c0d7a6f98c3&hash=355703b0a9303f60aa53862e597e61ae`);
    let data = await res.json();
    let profile = data.data.results[0];

  

    let div = document.createElement('div');

    div.setAttribute('class','child');
    // thumbnail

    let index = profile.thumbnail.path.indexOf(":");
    let url = profile.thumbnail.path.substring(index + 1,profile.thumbnail.path.length);
    let thubmnail = document.createElement('img');
    thubmnail.setAttribute('src',"https:" + `${url}` + `.${profile.thumbnail.extension}`);
    div.appendChild(thubmnail);

    let infoDiv = this.document.createElement('div');

 

    // character name 
    let name = this.document.createElement('p');
    name.innerHTML = "Character Name : " + profile.name;

    // comics,series and stories div

    let buttonsDiv = this.document.createElement('div');

    // comic button

    let comic = document.createElement('button');
    comic.innerHTML = "Comics";

   // series 
    let series = document.createElement('button');
    series.innerHTML = "Series";


    // stories

    let stories = document.createElement('button');
    stories.innerHTML = "Stories";

    //close button

    let close = document.createElement('button');
    close.innerHTML = "Close All";


    
   
    infoDiv.appendChild(name);
    buttonsDiv.appendChild(comic);
    buttonsDiv.appendChild(series);
    buttonsDiv.appendChild(stories);
    buttonsDiv.appendChild(close);
    infoDiv.appendChild(buttonsDiv);
    
    div.appendChild(infoDiv);



    comic.addEventListener('click',async function(){
        let res = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=0&apikey=8d41e820fa1fd94be2403c0d7a6f98c3&hash=355703b0a9303f60aa53862e597e61ae`);
        let data = await res.json();

        Render(data.data.results,"Comic")
      
    })


    series.addEventListener('click',async function(){

        let res = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}/series?ts=0&apikey=8d41e820fa1fd94be2403c0d7a6f98c3&hash=355703b0a9303f60aa53862e597e61ae`);

        let data = await res.json();

        Render(data.data.results,"Series");

       

    })


    stories.addEventListener('click',async function(){
        let res = await fetch(`https://gateway.marvel.com/v1/public/characters/${id}/stories?ts=0&apikey=8d41e820fa1fd94be2403c0d7a6f98c3&hash=355703b0a9303f60aa53862e597e61ae`);

        let data = await res.json();

        Render(data.data.results,"Story");
       
    })

    close.addEventListener('click',async function(){
        
      while(moreInfo.firstChild){
        moreInfo.removeChild(moreInfo.firstChild); 
       }
    })










   container.appendChild(div);
})