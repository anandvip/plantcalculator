//1. where will be the retrieved data displayed?

const plantsCount = document.querySelector("#result");
let rem = 'any';

//How will it be Displayed?
//create Data display in DOM
/**
 *
 *
 * @param {*} doc
 *//**
  *
  *
  * @param {*} e.target.parentElement.getAttribute()
  */
 renderResult = doc => {
  let ul, mc, avc, rr, tc, ss, pl;
  //create the html elements on the go
  ul = document.createElement("div");
  mc = document.createElement("div");
  avc = document.createElement("div");
  rr = document.createElement("div");
  tc = document.createElement("div");
  ss = document.createElement("div");
  pl = document.createElement("div");
  rem = document.createElement("div");

  //how do we know when was that data entry created?
  //helper function for setting multiple attributes in dom element

  let setAttributes = (ele, atrib) => {
    for (const key in atrib) {
      ele.setAttribute(key, atrib[key]);
    }  
  };

  setAttributes(ul, { "data-id": doc.id, class: "wrapper3" });
  
  
      
  
  //setAttributes(rm,{'class':'activity'});
   //get the Seed names in Uppercase
  let seedName = doc.data().seed;
  let newName = seedName.toUpperCase();
  console.log(newName);

  //data reference from the database for dom ui
  //map method used for setting attributes to newly created elements
  let el = [mc, avc, rr, tc, pl, rem];
  let g = el.map(x => x.setAttribute("class", "data-box t"));
 

  //template fields with relevant text
  //use this helper function instead of hard coding it.
  let ele = [mc, avc, rr, tc, pl, ss, rem]
  let elVal = [
        `Member Count : <span class="fltR d">${doc.data().memCount} persons</span>`,
        `${newName}/person : <span class="fltR d">${doc.data().ac}gm</span>`,
        `${newName} Recipe Repeats : <span class="fltR d">${doc.data().rr} times</span>`,
        `Seasonal Required quantity  : <span class="fltR d"><span data-tc="qty">${doc.data().tc}</span><span data-unit="kilo">Kg</span></span>`,
        `${newName} for the season : <span class="fltR d">${doc.data().plants} plants</span>`,
        `${newName}`,
        `<a class="del">Remove<img name="remove" class="ui-del fltR" src="img/remove.png" alt="remove"></a>`
    ]

    setAttributes(ss, {class: "data-box l t",name:"seedname"});
    
    let domele = (e,val)=>{
        for(const key in val){
            e[key].innerHTML = val[key]
    }
    //rem = document.getElementsByName('remove');
    //console.log(`${rem} at domele level`);
    
} 

domele(ele,elVal);


  //link data to the list
  ul.appendChild(ss);
  el.map(x => ul.appendChild(x));
  
  //ul.appendChild(rem)

  //finally add data to the DOM
  plantsCount.appendChild(ul);


  rem.addEventListener('click', (e) => {
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute('data-id');
    seedb.collection('plantsToGrow').doc(id).delete();
    });

    let myEvnt = document.getElementsByName('seedname');
    //let itemClik;
    //for (let i = 0; i < myEvnt.length; i++) {
    //itemClik = myEvnt[i].textContent[i];
      //}
    //const addUIAlert;

    
      myEvnt.forEach((a,i)=>a.addEventListener('click', (e) => {
        //e.preventDefault();
        e.stopPropagation();
        console.log(`Clicked panel can contain more info about ${myEvnt[i]}`);
        
      },false))
   
};

// let memberRef = seedb.collection('plantsToGrow');
// function getMem(){
//     console.log(memberRef.orderBy('memCount').limit(2));
// }
// getMem();

//retrirve data from the Firestore
//realtime update of stored result
seedb.collection("plantsToGrow").orderBy('seed').orderBy('rr').onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change => {
    if (change.type == "added") {
      renderResult(change.doc);
      
    }else if (change.type == 'removed'){
        let li = plantsCount.querySelector('[data-id=' + change.doc.id + ']');
        plantsCount.removeChild(li);
        console.log('Delete request sent!');
}

  });

  //plain get list method
  //snapshot.docs.forEach(doc => {
  //renderResult(doc);
  //});
});

//realtime
//seedb.collection('plantToGrow').onSnapshot((snapshot) => {
//    let changes = snapshot.docChanges();
//    changes.forEach(change => {
//        if(change.type == 'added'){
//            renderResult(change.doc);
//            console.log('snaphot fired');
//        }
//    })
//})

//saving data
//prevent duplicate submissions
let resultStored = () => {
  document.querySelector("#add").style.backgroundColor = "green";
  document.querySelector("#add").style.color = "white";
  sdd.removeEventListener("click", submission);
};

//1. How will be the entered data submitted element for click event?
let submission = e => {
  e.preventDefault();
  seedb.collection("plantsToGrow").add({
    ac: c,
    memCount: m,
    seed: x,
    rr: r,
    plants: y,
    tc: kgs,
    yield: seed
  });
  sdd.innerHTML = "Result Stored Succefully!";
  resultStored();
  console.log(
    `eventHandler must have been removed now, no <b>mutliple submissions</b> now! ;)`
  );
  sdd.innerHTML = "Store Result"
};

let dataSubmit = () => {
  sdd.addEventListener("click", submission);
  console.log("data fired now, eventListner active now");
};



