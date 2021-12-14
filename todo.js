//ADD new To do 
const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const popup = document.querySelector('.popup');
const gPop = document.querySelector('.popup-wrapper');
const btn = document.querySelector('.btn');
const search = document.querySelector('.search input');
gPop.style.display = "none";
const input = document.getElementsByTagName('input');
//console.log(input.item(1))


/***************reusable function********************/

/* Function pour l'alert et le popup qui va etre afficher (time control)*/
function start(duree)
{
var o=document.getElementById("sp");
if(duree > 0)
{
o.innerHTML = duree;
gPop.style.display = "block";
setTimeout("start("+duree+" -1)", 1000);
}
else
{
   alert("enter a valid to do");
o.innerHTML ="Au revoir";
gPop.style.display="none";
popup.style.visibility ="hidden";

}};


/* Function Creation dynamique du POPUP */

function create(){
   const div = document.createElement('div');
   div.classList.add('popup-close');
   div.setAttribute('id','closing');
   const text = document.createTextNode('X');
   div.appendChild(text);
   popup.append(div);
   const div2 = document.createElement('div');
   div2.classList.add('popup-content');
   const html = `
   <span id="sp">1</span>
   <h2>Fill the Input</h2>
   <p>Don't forget</p>
   <a href="#">Return</a>`;
   div2.innerHTML=html;
   popup.append(div2); 
   
}

/* Function generation dynamique des TODOS */

const generateTemp = todo =>{
   const html = `
   <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="fas fa-trash delete"></i>
            </li>
   `;  
   list.innerHTML += html;
};


/* function pour controller l'evenement et pour ne pas etre repeté à chaque clique */
function onetime(node, type, callback) {

	node.addEventListener(type, function(e) {
	
		e.target.removeEventListener(e.type, arguments.callee);

		return callback(e);
	});
}

onetime(gPop,'click',handler);

   function handler(e){
         
      if(e.target.id='closing'){
   
         gPop.style.display ="none";
   }
}

/***************Fin reusable function********************/




/************* Adding TO DO**************/

//Eventlistner Add TODOS

btn.addEventListener('click',e =>{
   let elem = document.createElement('li');
   elem.className = "list-group-item d-flex justify-content-between align-items-center";

   let span = document.createElement('span');
   span.innerHTML = input.item(1).value;
   input.item(1).value = ""

   const i = document.createElement('i');
   i.className ="fas fa-trash delete";

   list.appendChild(elem);
   elem.appendChild(span)
   elem.appendChild(i);
   e.preventDefault();

});

/************* Fin Adding TO DO**************/



/*************Deleting  TO DO**************/

list.addEventListener('click', e => {
   if (e.target.classList.contains("delete")) {
      e.target.parentNode.remove();
   }
});



/************* Fin Deleting  TO DO**************/




/************************************* SEARCH ITEM********************************************/
//filtering Todos :

//we will apply a class to the Todos that dont match and the that class will

// have keyup event 

const retrieve = (term) => {
   
   term = term.toLowerCase(); // Met la recherche en minuscule pour la rendre insensible à la casse
   const todo = document.querySelectorAll("li"); // Récupére tous les éléments de la liste <li>

   // Boucle pour parcourir les éléments de la liste
   for (var i = 0; i < todo.length; i++) {

      // Récupère le texte du <li> et le met en minuscule
      var text = todo[i].innerText.toLowerCase();
      
      // Vérifie que l'élément de la liste contient le terme recherché
      // Ajoute ou supprime la classe "filtre" pour le cacher ou montrer
      if (!text.includes(term)) {
         todo[i].classList.add("filtre");
      }
      else {
         todo[i].classList.remove("filtre");
      }
   }
};


//evenement de recherche des mots clés
search.addEventListener('keyup', () => {
   retrieve( document.querySelector("form.search input").value );
})

/*************************************Fin SEARCH ITEM********************************************/


