
var pokus = function (){

this.name = "pokus";
    // temhle objekt bude reprezentovat celkově kalkulačku stavebka
this.vstupy = [
/* tohle by mohlo obsahovat array se vstupy, které bude používat ta SS kalkulačka na tlačítka/popisky
* každý vstup může mít název (to bude i jeho html idčko) a text na popisek vstupu a typ (asi vesměs integery?)
*/
    {label:"Máš rád Teletabís?", inputIdentifier:"PKStubbylove", typ:"seznam", value:"ano", moznosti:[["ano",1],["trochu",1],["ne",1]]},
    {label:"Počet prstů v jogurtu?", inputIdentifier:"PKSprsty", typ:"pole", inputtype:"number", value:2, step:1, minimum:10, maximum:20000000},
    {label:"Kolik šmoulů šmlouluje na houpačce?",inputIdentifier:"PKSsmoulihoupacka",typ:"pole",inputtype:"number",value:10, step:1,minimum:0,maximum:20}

];

this.inputValues = {}; // array that will be filled with inputs from forms


this.outputs = [
    // like in the vstupy array outputs will be defined here - most importantly their ID for
    // HTML, type and source, that will be most probably some array created by the calculate function
    
    {outputHeader:"Název1",outputIdentifier:"PKS_someCounter", typ: "table", columns:[] },
    {outputHeader:"Název2",outputIdentifier:"PKS_randomOutput", typ: "table", columns:[]}
    
]; // similary to vstupy this will contain information about what outputs there will be


this.neco = 10.85;
this.necojineho = 25000;
this.nejakynazev = "MILUJU TINKY WINKY!!!";


};

pokus.prototype.calculate = function (){
 // all the calculations will be made here - this is the real core of the calculator
 // anything can be here, just make sure to provide the right outputs...
 // in this function data will be also selected to be put into outputs via global functions
    
    var doesSheLove = this.inputValues.PKStubbylove;
    var fingersCount = this.inputValues.PKSprsty;
    var smurfOnSwingCount = this.inputValues.PKSsmoulihoupacka;

    var fingersAndSmurfs = [];

    for (i=fingersCount;i<11;i++){
    
    
    fingersAndSmurfs[i-fingersCount] = (smurfOnSwingCount + i - fingersCount);
    
    };



    // SECTION which calls functions to write data into outputs arrays

    writeTableData(this.name,"PKS_someCounter", [fingersAndSmurfs, doesSheLove], ["NADPIS?","111","YAYA"]);
    writeTableData(this.name,"PKS_randomOutput", [doesSheLove, fingersAndSmurfs, doesSheLove], ["Pupyyk","Mucyyk","Druhohory"]);

};