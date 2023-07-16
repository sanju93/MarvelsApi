



let input = document.getElementById('textBox');
let container = document.getElementById('characters');
let favdata = localStorage.getItem('fav');
if (favdata){
    favdata = JSON.parse(favdata);
    
}



input.addEventListener('keyup',async function(e){
    let arr = [];

    while(container.firstChild){
        container.removeChild(container.firstChild);
    }

    let res = await fetch(`https://gateway.marvel.com/v1/public/characters?ts=0&apikey=8d41e820fa1fd94be2403c0d7a6f98c3&hash=355703b0a9303f60aa53862e597e61ae&nameStartsWith=${e.target.value}`);

    let data = await res.json();

    arr = data.data.results;
 


  
  

        for(let i = 0;i<arr.length;i++){
       
            let div = document.createElement('div');
            div.setAttribute('class','cards');
           
           
           
    
            // thumbnails
            let index = arr[i].thumbnail.path.indexOf(":");
            let url = arr[i].thumbnail.path.substring(index + 1,arr[i].thumbnail.path.length);
    
            let poster = document.createElement('img');
            poster.setAttribute('src',"https:" + `${url}` +  `.${arr[i].thumbnail.extension}`);
            poster.setAttribute('id',`${arr[i].id}`);
        
            div.appendChild(poster);
           
            // Name
    
            let name = document.createElement('p');
            name.innerHTML = "Character Name : " + arr[i].name;
            div.appendChild(name);
    
            // Favourite btn
    
            let fav = document.createElement('button');
            if (favdata){
                if (favdata.indexOf(`${arr[i].id}`) === -1){
              
                  
                    fav.innerHTML = "Add to Favourite";
                  
    
                }
               else{
                    fav.innerHTML = "Added in Favourites";
                    fav.setAttribute('disabled','true');
                }

            }else{
                fav.innerHTML = "Add to Favourite";
            }
            
           
            fav.setAttribute('class',`${arr[i].id}`)
            div.appendChild(fav);
    
            //
    
       
    
            container.appendChild(div);   
    
            poster.addEventListener('click',function(e){
    
               let id = e.target.getAttribute('id');
                
               localStorage.removeItem('id');
               localStorage.setItem('id',`${id}`);
               window.location.href = 'index2.html';
            });
    
    
            fav.addEventListener('click',function(e){
    
                let value = e.target.getAttribute('class');
    
                let data = localStorage.getItem('fav');
                if (data){
                   data = JSON.parse(data);
                    data.push(value);
                    localStorage.setItem('fav',JSON.stringify(data));
                    alert('Added to the Favourites');
                   
                }else{
                    let arr = [];
                    arr.push(value);
                    localStorage.setItem('fav',JSON.stringify(arr));
                }
    
    
              
    
            })
        }

    
  
    

})

