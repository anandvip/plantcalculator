//1. where will be the retrieved data displayed? 
const plantsCount = document.querySelector('#result');

//How will it be Displayed?
//create Data display in DOM

let renderResult = (doc) =>{
    let ul,mc,avc,rr,tc,ss,pl;
 //create the html elements on the go
     ul  = document.createElement('div');
     mc  = document.createElement('div');
     avc = document.createElement('div');
     rr  = document.createElement('div');
     tc  = document.createElement('div');
     ss = document.createElement('div');
     pl = document.createElement('div');
    
         //how do we know when was that data entry created?
    //helper function for setting multiple attributes in dom element
    
    let setAttributes = (ele,atrib) => {
        for (const key in atrib) {
            ele.setAttribute(key, atrib[key]);
        }
    }

    setAttributes(ul,{'data-id': doc.id, 'class':'wrapper3'});


//data reference from the database for dom ui
    //map method used for setting attributes to newly created elements
    let el = [mc,avc,rr,tc,pl]
    let g = el.map( x => x.setAttribute("class","data-box t"))
    ss.setAttribute('class', 'data-box l t')


//template fields with relevant text
//get the Seed names in Uppercase
let seedName = doc.data().seed;
    let newName = seedName.toUpperCase();
    console.log(newName);

    mc.innerHTML  = `Your Member Count : ${doc.data().memCount} persons`
    avc.innerHTML = `Average Serving of ${doc.data().seed}/person : ${doc.data().ac}gm`
    rr.innerHTML  = `${doc.data().seed} Recipe Repeats : ${doc.data().rr} times`
    tc.innerHTML  = `Seasonal Required quantity  : ${doc.data().tc}Kg`
    pl.innerHTML = `${doc.data().seed} Plants for the season : ${doc.data().plants} plants`//<div class="btn btn-dark mini-button console-toggle-button">Get Seed</div>
    ss.innerHTML = `${newName}`//<div class="btn btn-dark mini-button console-toggle-button">Nutrition</div>
    
    

//link data to the list
el.map( x => ul.appendChild(x) );
    ul.appendChild(ss); 


//finally add data to the DOM
    plantsCount.appendChild(ul);


} ;

let memberRef = seedb.collection('plantsToGrow');
function getMem(){
    console.log(memberRef.orderBy('memCount').limit(2));
}
getMem();

//retrirve data from the Firestore
seedb.collection('plantsToGrow').get().then((snapshot) =>{
    snapshot.docs.forEach(doc => {
        renderResult(doc);
    });
})

//saving data
//prevent duplicate submissions
let resultStored = () => {
    document.querySelector("#add").style.backgroundColor = 'green';
    document.querySelector("#add").style.color = 'white';
    document.removeEventListener('click',submission);
    
}


//1. How will be the entered data submitted element for click event? 
let submission = e => {
    e.preventDefault();
    seedb.collection('plantsToGrow').add({
        ac: c,
        memCount: m,
        seed: x,
        rr: r,
        plants:y,
        tc:kgs

    });
    sdd.innerHTML = 'Result Stored Succefully!'
    resultStored();
    console.log('eventHandler must have been removed now, no mutliple submissions now! ;)');
}

const sdd = document.querySelector('#add');
let dataSubmit = () => {
    sdd.addEventListener('click', submission);
    console.log("data fired now, eventListner active now");
}




//realtime
seedb.collection('plantToGrow').orderBy('seed').onSnapshot(snapshot => {
    let acticity = snapshot.docChanges();
    acticity.forEach(active => {
        console.log(active.doc.data());
        
    })
})