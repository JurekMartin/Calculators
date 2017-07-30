
var stavebko = function (){

this.name = "stavebko";
    // temhle objekt bude reprezentovat celkově kalkulačku stavebka
this.vstupy = [
/* tohle by mohlo obsahovat array se vstupy, které bude používat ta SS kalkulačka na tlačítka/popisky
* každý vstup může mít název (to bude i jeho html idčko) a text na popisek vstupu a typ (asi vesměs integery?)
*/
    {label:"Počáteční vklad", inputIdentifier:"SSpocvklad", typ:"pole", inputtype:"number", value:0, minimum:0, maximum:20000000},
    {label:"Cílová částka", inputIdentifier:"SScilovka", typ:"pole", inputtype:"number", value:200000, minimum:0, maximum:20000000},
    {label:"Sazba v %", inputIdentifier:"SSsazba",typ:"pole", inputtype:"number", value:2, minimum:0, maximum:100},
    {label:"Pravidlený vklad", inputIdentifier:"SSpravvklad",typ:"pole", inputtype:"number", value:1800, minimum:0, maximum:20000000},
    {label:"Periodicita vkladu", inputIdentifier:"SSvkladperioda",typ:"seznam", value:"roční", moznosti:["měsíční","čtvrtletní","roční"]},
    {label:"Počáteční poplatek", inputIdentifier:"SSpocpopl", typ:"pole", inputtype:"number", value:2000, minimum:0, maximum:20000000},
    {label:"Pravidelný poplatek", inputIdentifier:"SSpravpopl", typ:"pole", inputtype:"number", value:300, minimum:0, maximum:20000000},
    {label:"Periodicita poplatku", inputIdentifier:"SSpoplperioda", typ:"seznam", value:"roční", moznosti:["měsíční","čtvrtletní","roční"]},
    {label:"Délka modelace v měsících", inputIdentifier:"SSmesmodelace", typ:"pole", inputtype:"number", value:72, minimum:1, maximum:240},
    {label:"První měsíc", inputIdentifier:"SSprvmesic", typ:"seznam", value:"leden", moznosti:["leden", "únor", "březen", "duben", "květen", "červen", "červenec", "srpen", "září", "říjen", "listopad", "prosinec"]},
    {label:"Počáteční rok", inputIdentifier:"SSpocrok", typ:"pole", inputtype:"number", value:2017, minimum:0, maximum:20000000}
];

//TADY JSOU PARAMETRY - ty, které se nezadávají do vstupů, ale jsou důležité pro výpočty
this.koefdane = 0.85;
this.maxpodpora = 2000;
this.koefpodpory = 0.1;

this.inputValues = [];

this.vystupy = []; // tady bude array s výstupama, taždý člen arraye bude objekt, který bude mít atributy - co je zač a další

this.outputs = [
    // like in the vstupy array outputs will be defined here - most importantly their ID for
    // HTML, type and source, that will be most probably some array created by the calculate function
    
    {outputIdentifier:"SS_someCounter", typ: "table", columns:[]} //tady místo toho labelu bude něco relevantního! :)
    
    
    
]; // similary to vstupy this will contain information about what outputs there will be





};


stavebko.prototype.calculate = function(){
    
    
    
     writeTableData(this.name,"SS_someCounter", [ [1,2,3,4,5,6,7,8,9],["leden","únor","březen","duben","květen","červen","červenec","srpen","září"] ], ["Nadpis 1", "Sloupec2"]);
    
};