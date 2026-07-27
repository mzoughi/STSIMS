
// ======================================
// ELEMENTS
// ======================================


const voltage = document.getElementById("voltage");
const resistance1 = document.getElementById("resistance1");
const resistance2 = document.getElementById("resistance2");
const resistance3 =
document.getElementById("resistance3");


const resistance4 =
document.getElementById("resistance4");

const insightText =
document.getElementById("insightText");

const voltageValue = document.getElementById("voltageValue");
const resistance1Value = document.getElementById("resistance1Value");
const resistance2Value = document.getElementById("resistance2Value");
const resistance3Value =
document.getElementById("resistance3Value");


const resistance4Value =
document.getElementById("resistance4Value");

const resistance1Label =
document.getElementById("resistance1Label");

const resistance2Container =
document.getElementById("resistance2Container");

const resistance3Container =
document.getElementById("resistance3Container");


const resistance4Container =
document.getElementById("resistance4Container");

const circuitType =
document.getElementById("circuitType");



const displayResistance =
document.getElementById("displayResistance");

const displayCurrent =
document.getElementById("displayCurrent");

const displayPower =
document.getElementById("displayPower");

const r1Voltage =
document.getElementById("r1Voltage");

const r1Current =
document.getElementById("r1Current");

const r1Power =
document.getElementById("r1Power");

const r1Observation =
document.getElementById("r1Observation");

const r1Card =
document.getElementById("r1Card");

const r2Voltage =
document.getElementById("r2Voltage");

const r2Current =
document.getElementById("r2Current");

const r2Power =
document.getElementById("r2Power");

const r2Observation =
document.getElementById("r2Observation");

const r2Card =
document.getElementById("r2Card");

const r3Voltage = document.getElementById("r3Voltage");
const r3Current = document.getElementById("r3Current");
const r3Power = document.getElementById("r3Power");
const r3Observation = document.getElementById("r3Observation");
const r3Card = document.getElementById("r3Card");


const r4Voltage = document.getElementById("r4Voltage");
const r4Current = document.getElementById("r4Current");
const r4Power = document.getElementById("r4Power");
const r4Observation = document.getElementById("r4Observation");
const r4Card = document.getElementById("r4Card");

// Keeps track of which control was changed most recently
let lastChanged = "circuit";







// ======================================
// CALCULATIONS
// ======================================


function calculateResistance(R1,R2,R3,R4,type){


    if(type==="single"){

        return R1;

    }


    if(type==="series"){

        return R1+R2;

    }


    if(type==="parallel"){

        return 1/((1/R1)+(1/R2));

    }


    if(type==="complex"){


        let parallelResistance =
        1 / ((1/R3)+(1/R4));


        return R1 + R2 + parallelResistance;

    }


}





function experimentalValue(value){


return value + 
((Math.random()-0.5)*0.05);


}

// ======================================
// PHYSICS INSIGHT
// ======================================

function updateInsight(type,V,R1,R2,R3,R4,current,totalResistance,lastChanged){


    let message="";


    if(V===0){


        message =

        `
        <strong>No current flows.</strong><br><br>

        Without a voltage difference, there is no driving force
        pushing charge through the circuit.

        `;


    }


    else if(type==="single"){

    message =

    `
    <strong>Ohm's Law:     I = V / R</strong>

    <br><br>

    In a single-resistor circuit, the source voltage is applied entirely across the resistor. The current depends only on the applied voltage and the resistance.

    <br><br>

    ${
    lastChanged==="voltage"

    ?

    "Increasing the source voltage increases the current flowing through the resistor, resulting in greater power dissipation."

    :

    lastChanged==="resistance1"

    ?

    "Increasing the resistance reduces the current because the resistor opposes the flow of charge more strongly."

    :

    "Changing either the voltage or the resistance directly changes the current according to Ohm's Law."
    }

    `;

}


    else if(type==="series"){

    if(Math.abs(R1-R2)<0.1){

        message =

        `
        <strong>Series Resistance: R<sub>T</sub> = R<sub>1</sub> + R<sub>2</sub></strong>

        <br><br>

        Components connected in series share a single path for current flow. The same current passes through every resistor in the circuit.

        <br><br>

        Since both resistors have equal resistance, the source voltage is divided equally between them.

        `;

    }

    else if(R1 > R2){

        message =

        `
        <strong>Series Resistance: R<sub>T</sub> = R<sub>1</sub> + R<sub>2</sub></strong>

        <br><br>

        Components connected in series share a single path for current flow, so the current is identical through every resistor.

        <br><br>

        Because R1 has the greater resistance, it experiences the larger voltage drop while R2 experiences the smaller voltage drop.

        `;

    }

    else{

        message =

        `
        <strong>Series Resistance: R<sub>T</sub> = R<sub>1</sub> + R<sub>2</sub></strong>

        <br><br>

        Components connected in series share a single path for current flow, so the current is identical through every resistor.

        <br><br>

        Because R2 has the greater resistance, it experiences the larger voltage drop while R1 experiences the smaller voltage drop.

        `;

    }

}


    else if(type==="parallel"){

    if(Math.abs(R1-R2)<0.1){

        message =

        `
        <strong>Parallel Resistance: 1/R<sub>T</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub></strong>

        <br><br>

        In a parallel circuit, each branch is connected directly across the voltage source, so every branch experiences the same potential difference.

        <br><br>

        Because both resistors have equal resistance, the current divides equally between the two branches.

        `;

    }

    else if(R1 < R2){

        message =

        `
         <strong>Parallel Resistance: 1/R<sub>T</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub></strong>

        <br><br>

        In a parallel circuit, each branch experiences the same source voltage regardless of its resistance.

        <br><br>

        Since R1 has the lower resistance, it provides an easier path for charge flow and carries the larger share of the total current.

        `;

    }

    else{

        message =

        `
         <strong>Parallel Resistance: 1/R<sub>T</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub></strong>

        <br><br>

        In a parallel circuit, each branch experiences the same source voltage regardless of its resistance.

        <br><br>

        Since R2 has the lower resistance, it provides an easier path for charge flow and carries the larger share of the total current.

        `;

    }

}


    else if(type==="complex"){

    let parallelResistance =
    1 / ((1/R3)+(1/R4));

    if(lastChanged==="voltage"){

        message =

        `
        <strong>Equivalent Resistance: R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + (R<sub>3</sub> || R<sub>4</sub>)</strong>

        <br><br>

        Changing the source voltage does not affect the equivalent
        resistance of the circuit. Instead, it changes the current flowing
        through every part of the circuit according to Ohm's Law.

        `;

    }

    else if(lastChanged==="resistance1"){

        message =

        `
        <strong>Equivalent Resistance: R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + (R<sub>3</sub> || R<sub>4</sub>)</strong>

        <br><br>

        R1 is connected in series with the rest of the circuit. Increasing
        its resistance directly increases the total equivalent resistance,
        reducing the current throughout the entire circuit.

        `;

    }

    else if(lastChanged==="resistance2"){

        message =

        `
        <strong>Equivalent Resistance: R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + (R<sub>3</sub> || R<sub>4</sub>)</strong>

        <br><br>

        R2 is part of the series section. Any change to R2 changes the
        total resistance by the same amount, affecting the current
        everywhere in the circuit.

        `;

    }

    else if(lastChanged==="resistance3"){

        message =

        `
        <strong>Equivalent Resistance: R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + (R<sub>3</sub> || R<sub>4</sub>)</strong>

        <br><br>

        R3 changes only the equivalent resistance of the parallel branch.
        Because parallel resistors combine using reciprocals, changing R3
        has a smaller effect on the total circuit resistance than changing
        a series resistor by the same amount.

        <br><br>

        `;

    }

    else if(lastChanged==="resistance4"){

        message =

        `
        <strong>Equivalent Resistance: R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + (R<sub>3</sub> || R<sub>4</sub>)</strong>

        <br><br>

        R4 affects only the equivalent resistance of the parallel branch.
        The total circuit resistance changes indirectly through the
        parallel calculation before being added to the series resistors.

        <br><br>

        `;

    }

    else{

        message =

        `
        <strong>Equivalent Resistance: R<sub>total</sub> = R<sub>1</sub> + R<sub>2</sub> + (R<sub>3</sub> || R<sub>4</sub>)</strong>

        <br><br>

        <strong>where R<sub>3</sub> || R<sub>4</sub> = 1 / ((1/R<sub>3</sub>) + (1/R<sub>4</sub>))</strong>

        <br><br>

        The series resistors add directly, while the parallel resistors are
        first combined into a single equivalent resistance before being
        added to the rest of the circuit.

        `;

    }

}


    insightText.innerHTML = message;


}


// ======================================
// MAIN UPDATE
// ======================================


function updateSimulation(){


let V =
Number(voltage.value);


let R1 =
Number(resistance1.value);


let R2 =
Number(resistance2.value);

let R3 =
Number(resistance3.value);


let R4 =
Number(resistance4.value);


let type =
circuitType.value;



if(type==="single"){


    resistance2Container.classList.add("hidden");

    resistance3Container.classList.add("hidden");

    resistance4Container.classList.add("hidden");


    resistance1Label.textContent =
    "Resistance";


}


else if(type==="complex"){


    resistance2Container.classList.remove("hidden");

    resistance3Container.classList.remove("hidden");

    resistance4Container.classList.remove("hidden");


    resistance1Label.textContent =
    "Resistance 1";


}


else{


    resistance2Container.classList.remove("hidden");

    resistance3Container.classList.add("hidden");

    resistance4Container.classList.add("hidden");


    resistance1Label.textContent =
    "Resistance 1";


}





let totalResistance =
calculateResistance(
    R1,
    R2,
    R3,
    R4,
    type
);





let current =
V/totalResistance;

let totalPower =
V * current;


// sliders

voltageValue.textContent =
V.toFixed(1);


resistance1Value.textContent =
R1;


resistance2Value.textContent =
R2;

resistance3Value.textContent =
R3;


resistance4Value.textContent =
R4;



// displays

displayResistance.textContent =
totalResistance.toFixed(2);


displayCurrent.textContent =
current.toFixed(3);

displayPower.textContent =
totalPower.toFixed(2);

// ======================================
// COMPONENT ANALYSIS
// ======================================

// Hide all cards first
r1Card.classList.add("hidden");
r2Card.classList.add("hidden");
r3Card.classList.add("hidden");
r4Card.classList.add("hidden");


// ======================================
// SINGLE RESISTOR
// ======================================

if(type==="single"){

    r1Card.classList.remove("hidden");


    r1Voltage.textContent =
    V.toFixed(2) + " V";

    r1Current.textContent =
    current.toFixed(3) + " A";

    r1Power.textContent =
    totalPower.toFixed(2) + " W";


    if(V===0){

        r1Observation.textContent =
        "No current flows through the resistor because there is no potential difference to drive charge around the circuit. As a result, the resistor dissipates no electrical power.";

    }

    else if(lastChanged==="voltage"){

        r1Observation.textContent =
        "Changing the source voltage changes the current through the resistor. A higher voltage produces a larger current and increases the electrical power dissipated.";

    }

    else if(lastChanged==="resistance1"){

        r1Observation.textContent =
        "Changing the resistance changes the current flowing through the circuit. Because this is the only resistor, it experiences the full source voltage.";

    }

    else{

        r1Observation.textContent =
        "This resistor carries the entire circuit current and experiences the full source voltage because there are no other components to divide the voltage or current.";

    }

}


// ======================================
// SERIES CIRCUIT
// ======================================

else if(type==="series"){

    r1Card.classList.remove("hidden");
    r2Card.classList.remove("hidden");


    // Current is the same through both resistors
    let seriesCurrent = V / (R1 + R2);


    // Voltage drops
    let r1VoltageDrop = seriesCurrent * R1;
    let r2VoltageDrop = seriesCurrent * R2;


    // Power
    let r1PowerValue = r1VoltageDrop * seriesCurrent;
    let r2PowerValue = r2VoltageDrop * seriesCurrent;


    // --------------------------
    // R1 DATA
    // --------------------------

    r1Voltage.textContent =
    r1VoltageDrop.toFixed(2) + " V";

    r1Current.textContent =
    seriesCurrent.toFixed(3) + " A";

    r1Power.textContent =
    r1PowerValue.toFixed(2) + " W";


    // --------------------------
    // R2 DATA
    // --------------------------

    r2Voltage.textContent =
    r2VoltageDrop.toFixed(2) + " V";

    r2Current.textContent =
    seriesCurrent.toFixed(3) + " A";

    r2Power.textContent =
    r2PowerValue.toFixed(2) + " W";


    // --------------------------
    // DYNAMIC OBSERVATIONS
    // --------------------------

    if(V===0){

        r1Observation.textContent =
        "With no source voltage, no current flows through R1. Since power depends on current, this resistor does not dissipate electrical power.";

        r2Observation.textContent =
        "With no source voltage, no current flows through R2. Since power depends on current, this resistor does not dissipate electrical power.";

    }


    else if(lastChanged==="voltage"){

        r1Observation.textContent =
        "Increasing the source voltage increases the current through R1 and increases its voltage drop and power dissipation.";

        r2Observation.textContent =
        "Increasing the source voltage increases the current through R2. The voltage drop and power increase because the entire series current increases.";

    }


    else if(lastChanged==="resistance1"){

        r1Observation.textContent =
        "Changing R1 changes the total resistance of the circuit. Increasing R1 reduces the current and changes the voltage drop across this resistor.";

        r2Observation.textContent =
        "Although R2 was not changed, its current, voltage drop, and power are affected because changing R1 changes the total resistance of the circuit.";

    }


    else if(lastChanged==="resistance2"){

        r1Observation.textContent =
        "Although R1 was not changed, its current, voltage drop, and power are affected because changing R2 changes the total resistance of the circuit.";

        r2Observation.textContent =
        "Changing R2 directly changes the total resistance of the circuit. A larger resistance changes the voltage drop and power dissipated by R2.";

    }


    else{

        r1Observation.textContent =
        "R1 carries the same current as every component in the series circuit. Its voltage drop depends on its resistance and the total resistance of the circuit. A larger R1 produces a larger share of the source voltage across this resistor.";

        r2Observation.textContent =
        "R2 carries the same current as R1. Its resistance determines how much voltage it drops and how much power it dissipates.";

    }

}

// ======================================
// PARALLEL CIRCUIT
// ======================================

else if(type==="parallel"){

    r1Card.classList.remove("hidden");
    r2Card.classList.remove("hidden");


    // Branch currents
    let r1CurrentValue = V / R1;
    let r2CurrentValue = V / R2;


    // Branch powers
    let r1PowerValue = V * r1CurrentValue;
    let r2PowerValue = V * r2CurrentValue;


    // --------------------------
    // R1 DATA
    // --------------------------

    r1Voltage.textContent =
    V.toFixed(2) + " V";

    r1Current.textContent =
    r1CurrentValue.toFixed(3) + " A";

    r1Power.textContent =
    r1PowerValue.toFixed(2) + " W";


    // --------------------------
    // R2 DATA
    // --------------------------

    r2Voltage.textContent =
    V.toFixed(2) + " V";

    r2Current.textContent =
    r2CurrentValue.toFixed(3) + " A";

    r2Power.textContent =
    r2PowerValue.toFixed(2) + " W";


    // --------------------------
    // OBSERVATIONS
    // --------------------------

    if(V===0){

        r1Observation.textContent =
        "With no source voltage, no current flows through R1. Since there is no potential difference across the branch, the resistor dissipates no power.";

        r2Observation.textContent =
        "With no source voltage, no current flows through R2. Since there is no potential difference across the branch, the resistor dissipates no power.";

    }


    else if(lastChanged==="voltage"){

        r1Observation.textContent =
        "Increasing the source voltage increases the current through R1 because the resistor experiences the full source voltage in a parallel branch.";

        r2Observation.textContent =
        "Increasing the source voltage increases the current through R2 because every branch in a parallel circuit receives the full source voltage.";

    }


    else if(lastChanged==="resistance1"){

        r1Observation.textContent =
        "Changing R1 directly affects the current through this branch. A lower resistance allows more current to flow, increasing power dissipation.";

        r2Observation.textContent =
        "Changing R1 does not change the voltage across R2. However, it changes the total current supplied by the source because the branches are connected in parallel.";

    }


    else if(lastChanged==="resistance2"){

        r1Observation.textContent =
        "Changing R2 does not change the voltage across R1. However, it affects the total current drawn from the source.";

        r2Observation.textContent =
        "Changing R2 directly affects the current through this branch. A lower resistance allows more current to flow and increases power dissipation.";

    }


    else{

        r1Observation.textContent =
        "R1 receives the full source voltage because it is connected directly across the parallel branches. Its current depends on its resistance.";

        r2Observation.textContent =
        "R2 receives the full source voltage because it is connected directly across the parallel branches. Its current depends on its resistance.";

    }

}

// ======================================
// COMPLEX CIRCUIT
// ======================================

else if(type==="complex"){

    r1Card.classList.remove("hidden");
    r2Card.classList.remove("hidden");
    r3Card.classList.remove("hidden");
    r4Card.classList.remove("hidden");


    // ----------------------------------
    // Calculate equivalent resistance
    // R3 and R4 are parallel
    // ----------------------------------

    let parallelResistance =
    (R3 * R4) / (R3 + R4);


    // Total resistance
    let complexTotalResistance =
    R1 + R2 + parallelResistance;


    // Total circuit current
    let totalCurrent =
    V / complexTotalResistance;


    // ----------------------------------
    // R1 and R2 (series section)
    // ----------------------------------

    let r1VoltageDrop =
    totalCurrent * R1;

    let r2VoltageDrop =
    totalCurrent * R2;


    let r1PowerValue =
    r1VoltageDrop * totalCurrent;

    let r2PowerValue =
    r2VoltageDrop * totalCurrent;



    // ----------------------------------
    // Parallel branch voltage
    // Same across R3 and R4
    // ----------------------------------

    let branchVoltage =
    totalCurrent * parallelResistance;


    // R3 branch
    let r3CurrentValue =
    branchVoltage / R3;

    let r3PowerValue =
    branchVoltage * r3CurrentValue;


    // R4 branch
    let r4CurrentValue =
    branchVoltage / R4;

    let r4PowerValue =
    branchVoltage * r4CurrentValue;



    // ==================================
    // R1 CARD
    // ==================================

    r1Voltage.textContent =
    r1VoltageDrop.toFixed(2) + " V";

    r1Current.textContent =
    totalCurrent.toFixed(3) + " A";

    r1Power.textContent =
    r1PowerValue.toFixed(2) + " W";



    // ==================================
    // R2 CARD
    // ==================================

    r2Voltage.textContent =
    r2VoltageDrop.toFixed(2) + " V";

    r2Current.textContent =
    totalCurrent.toFixed(3) + " A";

    r2Power.textContent =
    r2PowerValue.toFixed(2) + " W";



    // ==================================
    // R3 CARD
    // ==================================

    r3Voltage.textContent =
    branchVoltage.toFixed(2) + " V";

    r3Current.textContent =
    r3CurrentValue.toFixed(3) + " A";

    r3Power.textContent =
    r3PowerValue.toFixed(2) + " W";



    // ==================================
    // R4 CARD
    // ==================================

    r4Voltage.textContent =
    branchVoltage.toFixed(2) + " V";

    r4Current.textContent =
    r4CurrentValue.toFixed(3) + " A";

    r4Power.textContent =
    r4PowerValue.toFixed(2) + " W";



    // ==================================
    // OBSERVATIONS
    // ==================================

    if(V===0){

        r1Observation.textContent =
        "With no source voltage, no current flows through R1. The resistor does not dissipate electrical power.";

        r2Observation.textContent =
        "With no source voltage, no current flows through R2. The resistor does not dissipate electrical power.";

        r3Observation.textContent =
        "With no source voltage, no current flows through the parallel branch containing R3. The resistor does not dissipate electrical power.";

        r4Observation.textContent =
        "With no source voltage, no current flows through the parallel branch containing R4. The resistor does not dissipate electrical power.";

    }


    else if(lastChanged==="voltage"){

        r1Observation.textContent =
        "Increasing the source voltage increases the total current through the series section containing R1, increasing its voltage drop and power.";

        r2Observation.textContent =
        "Increasing the source voltage increases the total current through R2 because it is in series before the current divides.";

        r3Observation.textContent =
        "Increasing the source voltage increases the voltage across the parallel branch, causing more current to flow through R3.";

        r4Observation.textContent =
        "Increasing the source voltage increases the voltage across the parallel branch, causing more current to flow through R4.";

    }


    else if(lastChanged==="resistance1"){

        r1Observation.textContent =
        "Changing R1 affects the total resistance of the circuit. Since R1 is in series, it changes the current flowing through the entire circuit.";

        r2Observation.textContent =
        "Although R2 was not changed, its current changes because R1 affects the total current in the series section.";

        r3Observation.textContent =
        "R3 remains connected across the same parallel branch voltage, but its current changes if the total circuit current changes.";

        r4Observation.textContent =
        "R4 remains connected across the same parallel branch voltage, but its current changes if the total circuit current changes.";

    }


    else if(lastChanged==="resistance2"){

        r1Observation.textContent =
        "R1 is affected indirectly because changing R2 changes the total resistance and current in the circuit.";

        r2Observation.textContent =
        "Changing R2 directly changes the voltage drop across this series resistor and affects the total circuit current.";

        r3Observation.textContent =
        "R3 is affected indirectly because the voltage across the parallel branch depends on the total circuit conditions.";

        r4Observation.textContent =
        "R4 is affected indirectly because the voltage across the parallel branch depends on the total circuit conditions.";

    }


    else if(lastChanged==="resistance3"){

        r1Observation.textContent =
        "Changing R3 affects the equivalent resistance of the parallel section, which changes the total current through the series resistors.";

        r2Observation.textContent =
        "R2 is affected indirectly because changes in the parallel branch alter the total circuit resistance.";

        r3Observation.textContent =
        "Changing R3 directly affects the current through this branch. A lower resistance allows more current to flow through R3.";

        r4Observation.textContent =
        "Although R4 was not changed, its branch voltage can change because R3 affects the equivalent resistance of the parallel section.";

    }


    else if(lastChanged==="resistance4"){

        r1Observation.textContent =
        "Changing R4 affects the equivalent resistance of the parallel section and changes the total current through the circuit.";

        r2Observation.textContent =
        "R2 is affected indirectly because the total circuit resistance changes when R4 changes.";

        r3Observation.textContent =
        "Although R3 was not changed, its current can change because R4 affects the parallel branch conditions.";

        r4Observation.textContent =
        "Changing R4 directly affects the current through this branch. A lower resistance allows more current to flow.";

    }


    else{

        r1Observation.textContent =
        "R1 is in series with the rest of the circuit, so it carries the total circuit current.";

        r2Observation.textContent =
        "R2 is in series with R1 before the current divides into the parallel branches.";

        r3Observation.textContent =
        "R3 is connected in parallel with R4, so both resistors experience the same branch voltage.";

        r4Observation.textContent =
        "R4 is connected in parallel with R3, so its current depends on its resistance compared with the other branch.";

    }

}

updateInsight(
    type,
    V,
    R1,
    R2,
    R3,
    R4,
    current,
    totalResistance,
    lastChanged
);



// circuit drawing

if(typeof drawCircuit==="function"){


drawCircuit(
    type,
    V,
    R1,
    R2,
    R3,
    R4,
    current
);


}



}





// ======================================
// EVENTS
// ======================================


voltage.addEventListener(
"input",
function(){

    lastChanged = "voltage";

    updateSimulation();

});


resistance1.addEventListener(
"input",
function(){

    lastChanged = "resistance1";

    updateSimulation();

});


resistance2.addEventListener(
"input",
function(){

    lastChanged = "resistance2";

    updateSimulation();

});


resistance3.addEventListener(
"input",
function(){

    lastChanged = "resistance3";

    updateSimulation();

});


resistance4.addEventListener(
"input",
function(){

    lastChanged = "resistance4";

    updateSimulation();

});


circuitType.addEventListener(
"change",
function(){

    lastChanged = "circuit";

    updateSimulation();

});



r1Card.addEventListener("mouseenter",()=>{

    const resistor=document.getElementById("resistor1");

    if(resistor){

        resistor.classList.add("resistor-glow-purple");

    }

});

r1Card.addEventListener("mouseleave",()=>{

    const resistor=document.getElementById("resistor1");

    if(resistor){

        resistor.classList.remove("resistor-glow-purple");

    }

});

r2Card.addEventListener("mouseenter",()=>{

    const resistor=document.getElementById("resistor2");

    if(resistor){

        resistor.classList.add("resistor-glow-pink");

    }

});


r2Card.addEventListener("mouseleave",()=>{

    const resistor=document.getElementById("resistor2");

    if(resistor){

        resistor.classList.remove("resistor-glow-pink");

    }

});

// ======================================
// R3 CARD HOVER
// ======================================

r3Card.addEventListener("mouseenter",()=>{

    const resistor =
    document.getElementById("resistor3");


    if(resistor){

        resistor.classList.add("resistor-glow-yellow");

    }

});


r3Card.addEventListener("mouseleave",()=>{

    const resistor =
    document.getElementById("resistor3");


    if(resistor){

        resistor.classList.remove("resistor-glow-yellow");

    }

});



// ======================================
// R4 CARD HOVER
// ======================================

r4Card.addEventListener("mouseenter",()=>{

    const resistor =
    document.getElementById("resistor4");


    if(resistor){

        resistor.classList.add("resistor-glow-blue");

    }

});


r4Card.addEventListener("mouseleave",()=>{

    const resistor =
    document.getElementById("resistor4");


    if(resistor){

        resistor.classList.remove("resistor-glow-blue");

    }

});

// ======================================
// START
// ======================================

updateSimulation();

