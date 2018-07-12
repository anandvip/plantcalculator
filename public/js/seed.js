
//TODO:collect data from the input and store it in Firebase.
//

const yes = 'block'
const no = 'none'
let x;
let seed;
let plantProp = new String('Per plant yield of');
let plantCalc = document.getElementById("demo");
let repeatVeg = document.getElementById('repRec');

plantCalc.innerHTML =
  `<p class = "plantCount">Pick any seed to see near about yield per plant. As of now the calculator is evolving</p>`;

//seed collection
let vegSeedis = {
  bitterGourd: 500,
  okra: 200,
  peas: 300,
  bottleGourd: 1500,

  selectedSeed() {
    for (key in vegSeedis) {
      //console.log(key === document.getElementById('myText').value);

      if (key === document.getElementById('myText').value) {
        imgHider();
        document.getElementById("mem").style.display = yes;
        //Per Seed average output required for plant calculation(assuming it will germinate)
        return seed = this.key
      }
    }
  }
}
//console.log(seed);
/*
const start = performance.now();
vegSeedis.selectedSeed();
const end = performance.now();
console.log(`Call to ${vegSeedis.selectedSeed()} took ${end - start} ms.`);
*/

function seedSeason() {
  x = document.getElementById("myText").value;
  const X = x.toUpperCase();
  plantCalc.innerHTML = `You selected ${X}`;
  vegSeedis.selectedSeed();

  switch (x) {

    case 'okra':
      plantCalc.innerHTML =
        `${plantProp} ${X} is near about <h2 class="largerX">${vegSeedis.okra}grams</h2>`;
      seed = vegSeedis.okra;
      //TODO calculation with variable unique to this.seed

      break;

    case 'bitterGourd':
      plantCalc.innerHTML =
        `${plantProp} ${X} is near about <h2 class="largerX">${vegSeedis.bitterGourd}grams</h2>`;
      //TODO calculation with variable unique to this.seed
      seed = vegSeedis.bitterGourd;
      break;

    case 'peas':
      plantCalc.innerHTML =
        `${plantProp} ${X} is near about <h2 class="largerX">${vegSeedis.peas}grams</h2>`;
      //TODO calculation with variable unique to this.seed
      seed = vegSeedis.peas;
      break;

    case 'bottleGourd':
      plantCalc.innerHTML =
        `${plantProp} ${x.toUpperCase()} is near about <h2 class="largerX">${vegSeedis.bottleGourd}grams</h2>`;
      //TODO calculation with variable unique to this.seed
      seed = vegSeedis.bottleGourd;
      break;

    case 'select seed':
      plantCalc.innerHTML = 'Pick any seed from the list'; alert('Pick any seed');
      break;

    default:
      plantCalc.innerHTML = 'Pick any seed';

  }
};

let m, r, c, y, kgs;//m:memberCount, r:recipe repeat, c:averageCounsumption, y:plantsCalculated by (mcr/seed), kgs:conversion from grams to Kg

let member = () => {
  m = document.getElementById('memCount').value;
  console.log(`Number of members are ${m}`);
  if (m <= 0) {
    document.getElementById('zero').style.color = "#D03D66";
    return document.getElementById('zero').textContent = 'Oh! it is lonely here!'
  } else {
    document.getElementById('zero').style.color = "#A78561";
    (() => {
      document.getElementById('zero').textContent = `Number of members ${m}`
      //document.getElementById('rn1').textContent = `Members = ${m}`
    })();
    document.getElementById("mem").style.display = 'none';
    return document.getElementById('aCs').style.display = 'block';
  }
}

let avgConsumptionPerPerson = () => {
  c = document.getElementById('ac').value;
  (() => {
    document.getElementById('zero1').textContent = `Average consumption per member is ${c}gm`
    //document.getElementById('rn2').textContent = `Avg consumption(grams) = ${c}`
  })();
  if (c <= 0 || c < 5) {
    document.getElementById('zero1').style.color = "#D03D66";
    return document.getElementById('zero1').textContent = `Is ${x.toUpperCase()} restricted diet for you?`
  }
  console.log('average consumption per member ' + c);
  seeAll();
  document.getElementById('aCs').style.display = 'none';
  repeatVeg.style.display = 'block';
  document.getElementById('instr').style.display = no
}
//assigned to an input field button

let numberOfTimesRepeated = () => {
  r = document.getElementById('rr').value //?
  if (r <= 0) {
    document.getElementById('zero2').style.color = "#D03D66";
    return
  }

  //TODO: Resultant JSON from here to the Firestore
  document.getElementById('zero2').innerHTML = `<i>${m * c * r / 1000}</i> <sup>Kg is your consumption for the season!</sup>`;
  //document.getElementById('rn3').textContent = `Recipe Repeated = ${r}`;
  //document.getElementById('rn4').textContent = `${x.toUpperCase()} for the season(Kg) = ${m * c * r / 1000}`;
  //document.getElementById('rn5').textContent = `Price estimate of this Produce = ?`;
  document.getElementById('final').style.display = 'block';
  repeatVeg.style.display = 'none';
  howManyPlants();
  dataSubmit();
}

//TODO: create this feature in order to highlight the difference between the organic and inorganic food
let surroundingRates = () => {
  document.getElementById('rn6').textContent = `Price difference of InOrganic Food * ${kgs} x enter price per Kg`

}

let howManyPlants = () => {
  y = Math.round(m * c * r / seed);
  let higherPurpose = `<span>Be Grateful for Organic food in your Plate</span>`;
  kgs = m * c * r / 1000;
  let reset = `<div class = "newSeed"><div class="mRight">${higherPurpose}</div></div>`;
  let roofCapacityExceeded = `<h2 class='nPlants'>You might like to consider contacting a Family Farmer as ${y} number of plants are best if grown at farms</h2>`;
  let plantFood = `<span>Please Consult an expert too. 
  Plant yield calculated here is tentative and may vary as per weather conditions including the love and care you give to the plants</span><br>
  <h2 class='nPlants'>Your Consumption for the season is <i>${kgs}Kgs</i> and ${y} plants can feed you and your loved ones this season, take good care of the plants too :) </h2>`;


  if (y >= 1 && y <= 90) {

    return  (function(){
      plantCalc.innerHTML=`<p class = "plantCount">For producing <b>${kgs}Kg</b> of ${x.toUpperCase()} you need to grow</p> <h1 class="largerX">${y} plants</h1>`;
      document.getElementById('num').innerHTML = `${plantFood} <br>${reset}`;

    })();
      
  }
  else if (y >= 100) {
    document.getElementById('num').innerHTML = `${roofCapacityExceeded}<br>${reset} `;
    plantCalc.innerHTML=`For producing ${kgs}Kg of ${x.toUpperCase()} you need to grow <h2 class="largerX">${y} plants</h2>`;

  }
  else if (y <= 1) {
    plantCalc.innerHTML=`For producing ${kgs}Kg of ${x.toUpperCase()} you need to grow <h2 class="largerX">1 plant, it feels lonely sometimes</h2>`;
    document.getElementById('num').innerHTML = `<h2 class='nPlants'>You may Grow 1 plant for this season, take good care of yourself :) </h2>${reset}`;
  }
}



let calculateThePlantsToGrow = () => {
  let result = m * c * r / y
  console.log(`grow ${result} plants`);
}
let reset = () => {
  window.location.reload(true);
}

const displayBlocks = () => {
  document.getElementById("mem").style.display = yes;
  document.getElementById('aCs').style.display = yes;
  repeatVeg.style.display = yes;
  hideAll();
}

const hideBlocks = () => {
  document.getElementById("mem").style.display = no;
  document.getElementById('aCs').style.display = no;
  repeatVeg.style.display = no;
  seeAll();
}

const seeAll = () => {
  document.getElementById('s2').style.display = yes;
  document.getElementById('s3').style.display = no;
}

const hideAll = () => {
  document.getElementById('s3').style.display = yes;
  document.getElementById('s2').style.display = no;
}

const imgHider = () => document.getElementById('instr').style.display = no

document.getElementById("mem").style.display = no;
document.getElementById('aCs').style.display = no;
document.getElementById('repRec').style.display = no;
document.getElementById('final').style.display = no;
document.getElementById('s2').style.display = no;
document.getElementById('s3').style.display = no;
document.getElementById('instr').style.display = yes;

const sdd = document.querySelector('#add');
// todo:
