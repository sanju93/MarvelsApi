
let container = document.getElementById('container');

function removeFavourite(id){
     let data = localStorage.getItem('fav');
     data = JSON.parse(data);
     if (data.length > 1){
         data =  data.filter((item) => item !== id);
         localStorage.setItem('fav',JSON.stringify(data));
         Render_1(data);
         alert("Removed Successfully");
     }else{
          localStorage.removeItem('fav');
          Render_1([]);

     }
     

}

async function Render_1(data){



     while(container.firstChild){
          container.removeChild(container.firstChild);
     }

     if (data.length > 0){

          for (let i = 0; i < data.length; i++) {
 
               let child = this.document.createElement('div');
               child.setAttribute('class','child');
               let res = await this.fetch(`https://gateway.marvel.com/v1/public/characters/${data[i]}?ts=0&apikey=8d41e820fa1fd94be2403c0d7a6f98c3&hash=355703b0a9303f60aa53862e597e61ae`);
               let data_1 = await res.json();
               data_1 = data_1.data.results[0];
             
       
               //thubmnail
               let index = data_1.thumbnail.path.indexOf(":");
               let url = data_1.thumbnail.path.substring(index + 1,data_1.thumbnail.path.length);
           
               let img = document.createElement('img');
               img.setAttribute('src',"https:" + `${url}` + `.${data_1.thumbnail.extension}`);
      
               //character name 
      
               let character = document.createElement('p');
               character.innerHTML = "Character Name : " + data_1.name;
      
               //Remove btn
      
               let button = document.createElement('button');
               button.innerHTML = "Remove from Favourites";
               button.setAttribute('id',`${data[i]}`);
      
               button.addEventListener('click',function(e){
                let id = e.target.getAttribute('id');
                removeFavourite(id);
     
                
               })
      
       
               
               child.appendChild(img);
               child.appendChild(character);
               child.appendChild(button);
       
               container.appendChild(child);
              
            }

     }else{

          let child = document.createElement('div');
          child.setAttribute('class','child1');
          child.innerHTML = "No Favourites Character are there";
          container.appendChild(child);

     }

    
      
  
  
  
      

}


function Render(){
     let data = localStorage.getItem('fav');

     if (data){
        data = JSON.parse(data);
           
           Render_1(data);

     
}else{
     let child = document.createElement('div');
     child.setAttribute('class','child1');
     child.innerHTML = "No Favourites Character are there";
     container.appendChild(child);
}
}


window.addEventListener('load',Render);

