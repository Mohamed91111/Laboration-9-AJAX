const apiUrl = 'https://www.forverkliga.se/JavaScript/api/crud.php?';
console.log('1 Script started');
let key =''
let title = ""
let author = ""
let updated = ""
let id =""
let error =""
window.addEventListener('load', () => {
	console.log('2 Window load event');

	
	let key1 = document.querySelector('#KeyButton');
	key1.addEventListener('click', async e => {
		console.log('3 Clicked on key button');
        
        //editebutton.disabled="disable";
        //deletebutton.disabled="disable";

		const response = await fetch(apiUrl + 'requestKey');
		console.log('4 Got response from server', response);
        const data = await response.json();
        key = data.key
		console.log('5 JSON data is: ', data.key);
        let key_generator = document.querySelector('.key_generator');
        let keyshow = document.createElement('span')
        keyshow.innerHTML= data.key;
        key_generator.appendChild(keyshow);
        KeyButton.disabled = 'disabled';
    })
    let book = document.querySelector('#addbutton'); 
        book.addEventListener('click', async e => {
            e.preventDefault();
            console.log('Clicked on addbutton');
         if(key == ""){ 
            nokey();
          function nokey(){
        document.getElementById("message").innerHTML = "First get a key";}
        }else{
        addBook(addbutton,0);
        console.log('book added');}
    })
    let view = document.querySelector('#view');
    view.addEventListener('click', event => {
        if(key == ""){ 
            nokey();
          function nokey(){
        document.getElementById("message").innerHTML = "First get a key";}
        }
        //view.disabled = 'disabled';
        else{
        viewBooks(view,0); }
                             
    })
    let mysearch = document.querySelector('#searchbutton'); 
    mysearch.addEventListener('click', async e => {
            e.preventDefault();
            searchbutton.disabled="disable";
            console.log('Clicked on searchbutton');
         if(key == ""){ 
            window.alert("this feature is not working yet")
        }
        searchBook(searchbutton,0);
        
        console.log('book edited');
    })

});
async function addBook(button,counter){ 
    counter++
    title = document.querySelector('#title').value;
    author = document.querySelector('#author').value;
    let req = await window.fetch(apiUrl + 'op=insert' +'&key='+ key + '&title=' + title + '&author=' + author);
    let info = await req.json();
    console.log(info.status);
    if((info.status !== 'success') && (counter < 5)){  
        //let error=document.getElementById(error).innerHTML=`
          //      <span>${info.message}+<br></span>`;
          fail();
          function fail(){
        document.getElementById("message").innerHTML = "Failed to add your book. Click (Add New Book) button again -"+counter+" try!"}
        console.log('failed trying again' + counter); 
        console.log(info.message);
        console.log(info.status);
        
    }else if((info.status == 'error') && (counter >= 5)){ 
        //let error=document.getElementById(error).innerHTML=`
        //<span>${info.message}+<br></span>`;
        fail();
          function fail(){
        document.getElementById("message").innerHTML = "Failed to add your book. Click (Add New Book) button again -"+counter+" try!"}
           // window.alert("failed to add books 5/5 tries. Try again!")
    }else{ 
        
        console.log('Book Added on try ' + counter +'/5 tries' )
        success();
          function success(){
        document.getElementById("message").innerHTML = "The book added after "+counter+" try!" ;}
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        
    }
    
    
}

async function viewBooks(button,counter){

    counter++
    let req = await window.fetch(apiUrl + 'op=select' +'&key='+ key)
    let info = await req.json();
    if((info.status !== 'success') && (counter < 5)){ 
        console.log('failed, trying again' + counter)
        fail();
          function fail(){
        document.getElementById("message").innerHTML = "Can't show the book. Click (View) button again - "+counter+" try!" ;}
       // document.querySelector("message").innerHTML = "Try again!";
        //let error =document.getElementById(error).innerHTML=`
                //<span>${info.message}+<br></span>`;
        
        console.log(info);
        //viewBooks(button,counter)
    }else if((info.status !== 'success') && (counter == 5)){
        console.log(info);
        console.log("failed to get book query, 5/5 tries. Try again!");
            document.querySelector("message").innerHTML = "Try again!";
            let error =document.getElementById(error).innerHTML=`
                <span>${info.message}+<br></span>`
            
            
    }else{
        
        console.log('success on try ' + counter +'/5 tries' )
        let displayBooks = document.querySelector('.bookList').innerHTML = "Status: Success";
        for(let i = 0; i<info.data.length;i++){ 
            let book = document.createElement('div');
            //let button1 = document.createElement('button');
            //button1.className = 'btn'
            //let button2 = document.createElement('button');
            //button1.className = 'btn'
            book.className = 'bookQuerry';
            book.innerText = info.data[i].title + "    " + info.data[i].author + "    " + info.data[i].updated  ;
            document.querySelector('.bookList').appendChild(book)
            success()
            function success(){
            document.getElementById("message").innerHTML = "This is your last added book: "+ info.data[i].title;} 
            console.log(info);
           // searchBook(searchbutton,0)

        }
       
    }
    
    button.disabled = ''; 
}
/* 
async function searchBook(button,counter){
    counter++
    search = document.querySelector('#search').value;
    let req = await window.fetch(apiUrl + 'op=insert' +'&key='+ key + '&title=' + title + '&author=' + author);
    let info = await req.json();
   // _.findKey((info, { 'title': search })||(info, { 'author': search }));
    //found = info.find(o => (o.title === search));
    //console.log("it's a title")
    //if (!(info.find(o => (o.title === search)))){
     //let found = info.find(o => (o.author === search));
      //  console.log("it's an author")
    //}
    //console.log(id);
    //console.log("we have id");
    


    newtitle = document.querySelector('#title').value;
    newauthor = document.querySelector('#author').value;
    let id = info.data[i].id
    let editereq = await window.fetch(apiUrl + 'op=update' +'&key='+ key + '&id=' + id +'&title='+ newtitle +'&author'+ newauthor  )
    
    
    
    addBook(editebutton,0);
    console.log("here we are");

}


function CreateTableFromJSON(info) {
    var myBooks = [
        {
            "Title": title,
            "Author": author,
            "Updated": updated
            
        }
    ]

    // EXTRACT VALUE FOR HTML HEADER. 
    // ('Book Name', 'Book Author' and 'Updating Time')
    var col = [];
    for (let i = 0; i< myBooks.length;i++) {
        for (var key in myBooks[i]) {
            if (col.indexOf(key) === -1) {
                col.push(key);
            }
        }
    }

    // CREATE DYNAMIC TABLE.
    var table = document.createElement("table");

    // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

    var tr = table.insertRow(-1);                   // TABLE ROW.

    for (var i = 0; i < col.length; i++) {
        var th = document.createElement("th");      // TABLE HEADER.
        th.innerHTML = col[i];
        tr.appendChild(th);
    }

    // ADD JSON DATA TO THE TABLE AS ROWS.
    for (var i = 0; i < myBooks.length; i++) {

        tr = table.insertRow(-1);

        for (var j = 0; j < col.length; j++) {
            var tabCell = tr.insertCell(-1);
            tabCell.innerHTML = myBooks[i][col[j]];
        }
    }

    // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
    var divContainer = document.querySelector('.bookList');
    divContainer.className = 'bookQuerry';
    divContainer.innerHTML = "";
    divContainer.appendChild(table);
    
}

function search(button){
    let mysearch =
}*/