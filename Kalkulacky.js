var mesice = ["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"];
var arrayOfCalculators = [stavebko,pokus]; //all calculators I will use will be in this array
//var arrayOfCalculators = []; // sem se budou vytvářet a tady se bude pracovat s objekty kalkulaček

var hideOrShow = function (inputIdentifier,zobrazuju){

// vezme si inputIdentifier a tohle buď skryje nebo zobrazí na stránce

    var x = document.getElementById(inputIdentifier);
    
    if(zobrazuju === 'ano') {
        x.style.display = 'block';
    } else {
        x.style.display = 'none';
    }
    
};

var getInputsFromForm = function (){
    
    // pro aktivní kalkulačku získá aktuální vstupy: podívá se do arraye se vstupy kalkulačky a tyhle najde na stránce. pro každý vstup pak nastaví v activeCalculator pumprlíka s hodnotou z té stránky. POZOR - nepřepisuje array se vstupy, jen se do něj dívá!
    // tuhle funkci řídí čistě proměnná activeCalculator!!!
    
    
    for (i=0; i<activeCalculator.vstupy.length; i++){
        // have to divide it with if and in case of number to multiply it by 1 so that the number is not a string...
        if (document.getElementById(activeCalculator.vstupy[i].inputIdentifier).type === "number"){
            activeCalculator["inputValues"][activeCalculator.vstupy[i].inputIdentifier]=document.getElementById(activeCalculator.vstupy[i].inputIdentifier).value*1;
        } else {
           activeCalculator["inputValues"][activeCalculator.vstupy[i].inputIdentifier]=document.getElementById(activeCalculator.vstupy[i].inputIdentifier).value;
        };
    };
};

var createHTMLforms = function (){
// vezme část HTML podle ID a array = array se vstupy kalkulačky. Ze array pak udělá html prvky a strčí je do inputIdentifier
// tuhle fci chci pro každou kalkulačku na začátku rozjet právě jednou

for (z=0; z<arrayOfCalculators.length;z++){

    var inputIdentifier = arrayOfCalculators[z].name;
    
    var vstupykalku = arrayOfCalculators[z].vstupy;
    
        
    var mistovstupu = document.getElementById(inputIdentifier);
    
    var vstupy = document.createElement("form");
    
    for (i=0; i<vstupykalku.length;i++){
        
        var vstup = document.createElement("div");
        vstup.className = "inputRow";
        var label = document.createElement("label");
        label.innerHTML = vstupykalku[i].label;

        var input;

        switch(vstupykalku[i].typ){
        
            case "pole":
                input = document.createElement("input");
                input.type = vstupykalku[i].inputtype;
                input.id = vstupykalku[i].inputIdentifier;        
                input.value = vstupykalku[i].value;
                input.step = vstupykalku[i].step;
                input.min = vstupykalku[i].minimum;
                input.max = vstupykalku[i].maximum;
                        
            break;
            
            case "seznam":
                
                var input = document.createElement("select");
                input.id = vstupykalku[i].inputIdentifier;
                
                for(y=0; y<vstupykalku[i].moznosti.length;y++){
                    var moznost = document.createElement("option");
                    moznost.value =  vstupykalku[i].moznosti[y][1];
                    moznost.innerHTML = vstupykalku[i].moznosti[y][0];
                    input.appendChild(moznost);
                };
                
              //  vstup.appendChild(select);
            break;
        
        
        };
        
        label.className = "inputLabel six columns";
        input.className = "inputField six columns";
        vstup.appendChild(label);
        vstup.appendChild(input);
        
        vstupy.appendChild(vstup);
        
        
    };
    
    mistovstupu.appendChild(vstupy);
    
    
    
    };

};

var createOutputElements = function (){
    // for each calculator HTML element (created in the createCalculator function)
    // creates a calculatorname_outputs div that will contain all outputs HTML
    // takes its outputs array and creates HTML elements (type defined in typ and id defined in outputIdentifier)
    // appends that elements do the _outputs container
    // those elements will be filled in another function

    for (ii = 0; ii<arrayOfCalculators.length;ii++){
 
        var vystup = document.createElement("div");
        vystup.id = arrayOfCalculators[ii].name+"_outputs";
        vystup.className = "outputContainer";

        for (iii = 0; iii<arrayOfCalculators[ii].outputs.length;iii++){
            
           var addingOutputsHeader = document.createElement("div");
           addingOutputsHeader.className="outputHeader";
           addingOutputsHeader.innerHTML=arrayOfCalculators[ii].outputs[iii].outputHeader;
           var addingToOutputs = document.createElement(arrayOfCalculators[ii].outputs[iii].typ);
           addingToOutputs.id = arrayOfCalculators[ii].name +"_"+ arrayOfCalculators[ii].outputs[iii].outputIdentifier;
           addingToOutputs.className = "calcOutput";
           vystup.appendChild (addingOutputsHeader);
           vystup.appendChild (addingToOutputs);
           
       };

        document.getElementById(arrayOfCalculators[ii].name).appendChild(vystup);
        hideOrShow(arrayOfCalculators[ii].name+"_outputs",'ne');

    };
    
};

var writeTableData = function(calcName,IDofTable, arrayOfColumns, arrayOfFirstRow){
    
    // gets a bunch of columns and puts them into the right outputs set of outputs
    // beware - the length of the first array of arrayOfColumns will set the number of rows of the table!
    

    var HTMLtext = "";

    if (typeof arrayOfFirstRow !== "undefined") {

        HTMLtext += "<tr class=\"tableHeader\">";

        for (i=0;i<arrayOfFirstRow.length;i++){ //adds the first fow based on arrayOfFirstRow
            HTMLtext += "<td class= \""+ IDofTable+ "\">"+arrayOfFirstRow[i]+"</td>";
        };

        HTMLtext+="</tr>";
    
    };
    
    if (typeof arrayOfColumns !== "undefined") {
      
        for (y=0;y<arrayOfColumns[0].length;y++){
            
            HTMLtext +="<tr>";
            
            for (i=0;i<arrayOfColumns.length;i++) {

                if (typeof arrayOfColumns[i][y] !== "undefined"){

                    HTMLtext +="<td class= \""+ IDofTable+ "\">"
                    HTMLtext += arrayOfColumns[i][y];
                    HTMLtext +="</td>";
                };

            };
            
            HTMLtext +="</tr>";
        
        };
        
    };

    
    

    document.getElementById(calcName+"_"+IDofTable).innerHTML=HTMLtext;

 //   document.getElementByClassName(IDofTable).style.width="\"" + 100/arrayOfColumns.length+"%"+ "\"" ;
//    document.getElementByClassName(IDofTable).style.backgroundColor='red';
//   document.getElementByClassName("SS_someCounter").setAttribue("width","100px");
};

var createCalculator = function(){
  
    var HTMLofCalculatorsSection = document.getElementById("calculators");
    
    //dá se mu array názvů kalkulaček a on pro každou z nich udělá HTML element <div id=název kalkulačky> a připne ho do hlavního dokumentu - pod div kalkulačky
    //a pro každou udělá nový objekt kalk_název kalkulačky
    // tuhle funkci chci rozjet na začátku PRÁVĚ JEDNOU!! jinak to bude dělat bordel :)
    
    for (i=0;i<arrayOfCalculators.length;i++){
    
    var vkladam = document.createElement("div");
    vkladam.id = arrayOfCalculators[i].name;
    HTMLofCalculatorsSection.appendChild(vkladam);
    arrayOfCalculators[i] = new arrayOfCalculators[i]();
    hideOrShow(arrayOfCalculators[i].name,"ne");
    };
    
};

var start = function(){
    
    createCalculator();
    createHTMLforms();
    createOutputElements();
    createButtons(["Stavebko!","Pokus!"]);
    
};

var setActiveCalculator = function(calculatorNumber){
  
    activeCalculator = arrayOfCalculators[calculatorNumber];
    for (i=0;i<arrayOfCalculators.length;i++){
        
        if (i===calculatorNumber) {
          hideOrShow(arrayOfCalculators[i].name,'ano');  
        } else {hideOrShow(arrayOfCalculators[i].name,'ne');
        };
        
    };
    
};

var doCalculation = function(){
    getInputsFromForm();
    activeCalculator.calculate();
    hideOrShow(activeCalculator.name+"_outputs","ano");
};

var createArrayOfText = function (text,number){
    var array =[];
    for (i=0;i<number;i++){
        array[i]=text;
    };
    
    return(array);
    
};

var createInputElementText = function (inputType,inputClass,inputName,inputValue,inputStep){
    var text = "";  
    text +="<input type=\""+inputType+"\""; 
    text +=" "+"class=\""+inputClass+"\""; 
    text +=" "+"name=\""+inputName+"\""; 
    text +=" "+"value="+inputValue;
    text +=" "+"step="+inputStep;   
    text +="> </input>";
    return(text);


};

var roundArrayOfNumbers = function (array, digits) {
  
    for (i=0;i<array.length;i++) {
        array[i]=Math.round(Math.pow(10,digits)*array[i])/Math.pow(10,digits);
    }
    
};

var createButtons = function(arrayOfNames){
    //for each name in arrayOfNames creates a button with given name
    //when clicked the button activates the n-th calculator from arrayOfCalculators
    //after that it creates the "Počítej!" button
    // every button has it's width set accordingly to the number of buttons
    
    
    var buttonCount = arrayOfNames.length + 1;
    var header = document.getElementById("cudliky");

    for (i=0;i<buttonCount-1;i++){
        var cudlik = document.createElement("span");
        cudlik.className="headerButton";
        cudlik.innerHTML = "<button onclick=setActiveCalculator("+i+")  >"+arrayOfNames[i]+"</button>";
        cudlik.style.width=96/buttonCount+"%";
        header.appendChild(cudlik);
    };
    
        var cudlik = document.createElement("span");
        cudlik.className="headerButton";
        cudlik.innerHTML = "<button onclick=doCalculation()>Počítej!</button>";
        cudlik.style.width=96/buttonCount+"%";
        header.appendChild(cudlik);   
    
    
};

/*
 * This is how everything works:
 * 
 * 1) start takes arrayOfCalculators and creates a ne object based on them into arrayOfCalculators
 * 
 * 2) then it creates HTML elements of the calculator and it's interface - DIV with ID of the calculator name and forms with inputs
 * source for the inputs and how to create them is the calculator's "vstupy" array
 * 
 *
 *
 *  3) then it creates HTML elements for the calculator outputs
 *
 *
 * the calc HTML with inputs goes like this:
 * 
 *  <div id=calculator's.name>
 *  
 *   <form>
 *   
 *    <div>
 *    <label> input's label </label>
 *    <input or select and options - depends in the input type> </input or select>
 *    </div>
 *    
 *    <div>
 *    <label> input's label </label>
 *    ...
 *    ...
 *   
 *   </form>
 *   
 *   <div id = calculator's.name_outputs>
 *   
 *      <table (for example, depends on the outputs array of calculator) id=something><table>
 *      ...
 *      ...   
 *   
 *   </div>
 *   
 *  
 *  </div>
 * 
 *
 */