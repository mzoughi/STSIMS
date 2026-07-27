// ==========================================
// CIRCUIT SIMULATOR
// ==========================================

const svg = document.getElementById("circuitSVG");

const flowButton = document.getElementById("flowToggle");

let flowRunning = true;



// ==========================================
// PAUSE / PLAY
// ==========================================

const flowIcon =
document.getElementById("flowIcon");

if(flowButton){

    flowButton.addEventListener("click",()=>{

        if(flowRunning){

            svg.pauseAnimations();

            flowIcon.innerHTML = `

                <polygon points="5,3 14,9 5,15"></polygon>

            `;

        }

        else{

            svg.unpauseAnimations();

            flowIcon.innerHTML = `

                <rect x="4" y="2" width="3.5" height="14" rx="1"></rect>

                <rect x="10.5" y="2" width="3.5" height="14" rx="1"></rect>

            `;

        }

        flowRunning = !flowRunning;

    });

}


// ==========================================
// COMPLEX CIRCUIT
// ==========================================

function drawComplex(V,R1,R2,R3,R4,current){


    // -------------------------
    // Wire paths
    // -------------------------

    let mainPath = `
        M120 80
        L780 80

        M120 320
        L780 320

        M120 80
        L120 320
    `;


    let branch3 = `
        M620 80
        L620 172

        M620 228
        L620 320
    `;


    let branch4 = `
        M780 80
        L780 172

        M780 228
        L780 320
    `;



    // Draw wires first

    drawWire(mainPath);

    drawWire(branch3);

    drawWire(branch4);



    // -------------------------
// CURRENT ANIMATION
// -------------------------

if(current > 0){


    // Path through R3 branch

    createCurrent(
    `
    M120 200
    L120 80
    L620 80
    L620 320
    L120 320
    L120 200
    `,
    current,
    9
    );



    // Path through R4 branch

    createCurrent(
    `
    M120 200
    L120 80
    L780 80
    L780 320
    L120 320
    L120 200
    `,
    current,
    9
    );


}



    // -------------------------
    // COMPONENTS ON TOP
    // -------------------------

    drawBattery(
        120,
        200,
        V
    );


   drawResistor(
    300,
    80,
    "R1 = " + R1 + "Ω",
    "resistor1",
    "#c29ff7"
);

drawResistor(
    470,
    80,
    "R2 = " + R2 + "Ω",
    "resistor2",
    "#f7b6d2"
);

drawResistor(
    620,
    200,
    "R3 = " + R3 + "Ω",
    "resistor3",
    "#ffe89a"
);

drawResistor(
    780,
    200,
    "R4 = " + R4 + "Ω",
    "resistor4",
    "#a9d8ff"
);


}

// ==========================================
// MAIN DRAW FUNCTION
// ==========================================

function drawCircuit(type,V,R1,R2,R3,R4,current){


    svg.innerHTML="";


    if(type==="single"){


        drawSingle(
            V,
            R1,
            current
        );


    }


    else if(type==="series"){


        drawSeries(
            V,
            R1,
            R2,
            current
        );


    }


    else if(type==="parallel"){


        drawParallel(
            V,
            R1,
            R2,
            current
        );


    }

    else if(type==="complex"){

    drawComplex(
        V,
        R1,
        R2,
        R3,
        R4,
        current
    );

}



}






// ==========================================
// SINGLE RESISTOR
// ==========================================

function drawSingle(V,R,I){



    let path =

    `
    M250 200
    L250 80
    L650 80
    L650 320
    L250 320
    L250 200
    `;



    drawWire(path);


     createCurrent(
        path,
        I
    );

    drawBattery(
        250,
        200,
        V
    );



    drawResistor(
    450,
    80,
    "R = "+R+"Ω",
    "resistor1",
    "#c29ff7"
);



}







// ==========================================
// SERIES CIRCUIT
// ==========================================

function drawSeries(V,R1,R2,I){



    let path =

    `
    M200 200
    L200 80
    L700 80
    L700 320
    L200 320
    L200 200
    `;



    drawWire(path);


    createCurrent(
        path,
        I
    );

    drawBattery(
        200,
        200,
        V
    );



    drawResistor(
    450,
    80,
    "R1 = "+R1+"Ω",
    "resistor1",
    "#c29ff7"
);

drawResistor(
    450,
    320,
    "R2 = "+R2+"Ω",
    "resistor2",
    "#f7b6d2"
);



}







// ==========================================
// PARALLEL CIRCUIT
// ==========================================

function drawParallel(V,R1,R2,I){


    // Horizontal rails

    let rails =

    `
    M200 80
    L650 80

    M200 320
    L650 320

    M200 80
    L200 320
    `;


    drawWire(rails);



    // Middle branch

    let branch1 =

    `
    M450 80
    L450 175

    M450 225
    L450 320
    `;



    // Right branch

    let branch2 =

    `
    M650 80
    L650 175

    M650 225
    L650 320
    `;



    drawWire(branch1);

    drawWire(branch2);

     // ==================================
// CURRENT FLOW
// COMPLETE LOOPS
// ==================================

let loop1 =

`
M200 80
L450 80
L450 175
L450 225
L450 320
L200 320
L200 80
`;

let loop2 =

`
M200 80
L650 80
L650 175
L650 225
L650 320
L200 320
L200 80
`;

createCurrent(
    loop1,
    I/2,
    6
);

createCurrent(
    loop2,
    I/2,
    6
);

    // Battery

    drawBattery(
        200,
        200,
        V
    );



    // Resistor boxes

    drawResistor(
    450,
    200,
    "R1 = " + R1 + "Ω",
    "resistor1",
    "#c29ff7"
);

drawResistor(
    650,
    200,
    "R2 = " + R2 + "Ω",
    "resistor2",
    "#f7b6d2"
);




   

}








// ==========================================
// DRAW WIRES
// ==========================================

function drawWire(pathData){


    let wire =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );


    wire.setAttribute(
        "d",
        pathData
    );


    wire.setAttribute(
        "stroke",
        "#444"
    );


    wire.setAttribute(
        "stroke-width",
        "6"
    );


    wire.setAttribute(
        "fill",
        "none"
    );


    wire.setAttribute(
        "stroke-linecap",
        "round"
    );


    wire.setAttribute(
        "stroke-linejoin",
        "round"
    );


    svg.appendChild(wire);


}








// ==========================================
// BATTERY
// ==========================================

function drawBattery(x,y,V){



    let battery =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
    );


    battery.setAttribute(
        "x",
        x-30
    );


    battery.setAttribute(
        "y",
        y-50
    );


    battery.setAttribute(
        "width",
        "60"
    );


    battery.setAttribute(
        "height",
        "100"
    );


    battery.setAttribute(
        "rx",
        "15"
    );


    battery.setAttribute(
        "fill",
        "#A8D5BA"
    );


    svg.appendChild(
        battery
    );



    addText(
        x,
        y-10,
        "+"
    );


    addText(
        x,
        y+30,
        "-"
    );


}







// ==========================================
// RESISTOR BOX
// ==========================================

function drawResistor(x,y,label,id=null,color="#c29ff7"){



    let resistor =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "rect"
    );

    if(id){

    resistor.setAttribute("id",id);

}

    resistor.setAttribute(
        "x",
        x-55
    );


    resistor.setAttribute(
        "y",
        y-25
    );


    resistor.setAttribute(
        "width",
        "110"
    );


    resistor.setAttribute(
        "height",
        "50"
    );


    resistor.setAttribute(
        "rx",
        "10"
    );


    resistor.setAttribute(
    "fill",
    color
);


    svg.appendChild(
        resistor
    );



    addText(
        x,
        y+6,
        label
    );


}

R1 = "#c29ff7"   // purple

R2 = "#f7b6d2"   // pastel pink

R3 = "#ffe89a"   // pastel yellow

R4 = "#a9d8ff"   // pastel blue






// ==========================================
// TEXT
// ==========================================

function addText(x,y,message){


    let text =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "text"
    );


    text.setAttribute(
        "x",
        x
    );


    text.setAttribute(
        "y",
        y
    );


    text.setAttribute(
        "text-anchor",
        "middle"
    );


    text.setAttribute(
        "font-size",
        "18"
    );


    text.setAttribute(
        "font-weight",
        "bold"
    );


    if(message==="+" || message==="-"){

        text.setAttribute(
            "font-size",
            "32"
        );

    }



    text.textContent =
    message;



    svg.appendChild(
        text
    );


}







// ==========================================
// CURRENT PARTICLES
// ==========================================

function createCurrent(path, current, particleCount = 12){

    // Don't animate if there is no current
    if(current <= 0){
        return;
    }

    let id =
    "path" + Math.random();



    let hiddenPath =
    document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
    );



    hiddenPath.setAttribute(
        "id",
        id
    );



    hiddenPath.setAttribute(
        "d",
        path
    );



    hiddenPath.setAttribute(
        "opacity",
        "0"
    );



    svg.appendChild(
        hiddenPath
    );



    // ==================================
    // SPEED
    // ==================================

    let speed;

    if(current >= 15){

        speed = 4.5;

    }
    else if(current >= 8){

        speed = 6;

    }
    else if(current >= 4){

        speed = 8;

    }
    else if(current >= 2){

        speed = 10;

    }
    else if(current >= 1){

        speed = 12;

    }
    else if(current >= 0.5){

        speed = 15;

    }
    else{

        speed = 18;

    }



    // ==================================
    // CREATE PARTICLES
    // ==================================

    for(let i = 0; i < particleCount; i++){


        let dot =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "circle"
        );



        dot.setAttribute(
            "r",
            "5"
        );



        dot.setAttribute(
            "fill",
            "#74B9FF"
        );



        let animation =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "animateMotion"
        );



        animation.setAttribute(
            "dur",
            speed + "s"
        );



        animation.setAttribute(
            "repeatCount",
            "indefinite"
        );



        animation.setAttribute(
            "begin",
            (-i * (speed / particleCount)) + "s"
        );



        let motion =
        document.createElementNS(
            "http://www.w3.org/2000/svg",
            "mpath"
        );



        motion.setAttribute(
            "href",
            "#" + id
        );



        animation.appendChild(
            motion
        );



        dot.appendChild(
            animation
        );



        svg.appendChild(
            dot
        );

    }

}