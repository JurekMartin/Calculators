
var stavebko = function (){

this.name = "stavebko";
    // temhle objekt bude reprezentovat celkově kalkulačku stavebka
this.vstupy = [
/* tohle by mohlo obsahovat array se vstupy, které bude používat ta SS kalkulačka na tlačítka/popisky
* každý vstup může mít název (to bude i jeho html idčko) a text na popisek vstupu a typ (asi vesměs integery?)
*/
    {label:"Počáteční vklad", inputIdentifier:"SSpocvklad", typ:"pole", inputtype:"number", value:0, step:10000, minimum:0, maximum:20000000},
    {label:"Cílová částka", inputIdentifier:"SScilovka", typ:"pole", inputtype:"number", value:200000, step:10000, minimum:0, maximum:20000000},
    {label:"Sazba v %", inputIdentifier:"SSsazba",typ:"pole", inputtype:"number", value:2,step:1, minimum:0, maximum:100},
    {label:"Pravidlený vklad", inputIdentifier:"SSpravvklad",typ:"pole", inputtype:"number", value:1800,step:100, minimum:0, maximum:20000000},
    {label:"Periodicita vkladu", inputIdentifier:"SSvkladperioda",typ:"seznam", value:"roční", moznosti:[["měsíční",1],["čtvrtletní",3],["roční",12]]},
    {label:"Počáteční poplatek", inputIdentifier:"SSpocpopl", typ:"pole", inputtype:"number", value:2000,step:100, minimum:0, maximum:20000000},
    {label:"Pravidelný poplatek", inputIdentifier:"SSpravpopl", typ:"pole", inputtype:"number", value:300,step:10, minimum:0, maximum:20000000},
    {label:"Periodicita poplatku", inputIdentifier:"SSpoplperioda", typ:"seznam", value:"roční", moznosti:[["měsíční",1],["čtvrtletní",3],["roční",12]]},
    {label:"Délka modelace v měsících", inputIdentifier:"SSmesmodelace", typ:"pole", inputtype:"number", value:72,step:1, minimum:1, maximum:240},
    {label:"První měsíc", inputIdentifier:"SSprvmesic", typ:"seznam", value:"leden", moznosti:[ ["leden",1], ["únor",2], ["březen",3], ["duben",4], ["květen",5], ["červen",6], ["červenec",7], ["srpen",8], ["září",9], ["říjen",10], ["listopad",11], ["prosinec",12]]},
    {label:"Počáteční rok", inputIdentifier:"SSpocrok", typ:"pole", inputtype:"number", value:2017,step:1, minimum:0, maximum:20000000}
];

//TADY JSOU PARAMETRY - ty, které se nezadávají do vstupů, ale jsou důležité pro výpočty
this.koefdane = 0.85;
this.maxpodpora = 2000;
this.koefpodpory = 0.1;

this.inputValues = {};

this.vystupy = []; // tady bude array s výstupama, taždý člen arraye bude objekt, který bude mít atributy - co je zač a další

this.outputs = [
    // like in the vstupy array outputs will be defined here - most importantly their ID for
    // HTML, type and source, that will be most probably some array created by the calculate function
    
    {outputHeader:"Detailní modelace",outputIdentifier:"SS_someCounter", typ: "table", columns:[]} //tady místo toho labelu bude něco relevantního! :)
    
    
    
]; // similary to vstupy this will contain information about what outputs there will be





};


stavebko.prototype.calculate = function(){
    
var sazbaofiko = this.inputValues.SSsazba/100;
var sazbadane = 1-this.koefdane; // sazba daně z příjmů předpokládaná, na to se snad ani lidí nebudu ptát ne? :)
var sazbapodani = sazbaofiko*(1-sazbadane)/12; // pozor, jedná se o měsíční sazbu po dani!!!
var maxpodpora = this.maxpodpora; // strop podpory na jeden rok
var pocpoplatek = this.inputValues.SSpocpopl;
var pravpoplatek = this.inputValues.SSpravpopl;
var poplatky = [pocpoplatek]; // první poplatek bude ve výši počátečního, ostatní se musí napushovat :)
var periodapravpoplatku = this.inputValues.SSpoplperioda; // po kolika měsících vždy je zaplacen pravidelný poplatek
var periodapravvkladu = this.inputValues.SSvkladperioda; // po kolika měsících vždy je zaplacen pravidelný poplatek

var mesicpodpory = 4; // nastavení, kdy se připisuje státní podpora, to si pak dopočítám, kdy je měsíc první podpory, max. je obviously 12
var mesicvroce = [this.inputValues.SSprvmesic-1]; //měsíc v roce, 1 = leden, 12 = prosinec, aktuální měsíc pro i = 0, tedy v měsíci před spuštěním kalkulace asi :)

var nepripsanapodpora = [0]; // kolik činí aktuální nepřipsaná státní podpora
var pripsanapodpora = [0]; // aktuálně připisovaná podpora
var zakladpodpory = [0]; //základ pro státní podporu pro jednotlivé měsíce
var vypoctovyzakladpodpory = [0];
var pravidelnyvklad = [this.inputValues.SSpravvklad]; // zadaný pravidlený vklad od daného měsíce. Udělám si pak nějakou funkci, aby se uměl nastavovat různě, žejó! :)
var mimoradnyvklad = [this.inputValues.SSpocvklad]; // mimořádný vklad, v každém měsíci se přičte k měsíčnímu yai :)
var mesicvklad = [0]; // měsíční vklad celkem, pravidelný + mimořádný
var penizenapocatku = [-pocpoplatek]; // na začátku měsíce myšleno :) v nultém měsíci budou logicky peníze záporné ve výši vstupáku
var penizenakonci = [-pocpoplatek]; // na konci měsíce, samozřejmě :) v nultém měsíci záporné ve výší vstupáku
var nepripsanyurok = [0]; // úroky než se připíšou ke vkladu
var pripsanyurokvroce = [0]; // tady uvádím, kolik se v daném měsíci přičetlo úroků, je jasný, že to bude 0,0,0.. něco, 0, 0, 0.. něco

var maxmesic = this.inputValues.SSmesmodelace; //nastavení, dokdy se má počítat. Tedy kolik měsíců se má nakalkuovat nasimulovat prostě ták. Chci aby toto bylo X měsíců plus nultý k tomu!! :)

var rok = 2017;
var mesice = ["prosinec","leden","únor","březen","duben","květen","červen","červenec","srpen","září","říjen","listopad"];
var datum = [""];
var cilovka = this.inputValues.SScilovka;
var mimoradnyvklad = [0];

penizenakonci[0] = -pocpoplatek + mimoradnyvklad[0];
zakladpodpory [0] = -pocpoplatek + mimoradnyvklad[0];

var procentonasporeni = [Math.round(penizenakonci[0]/cilovka*1000)/10+" %"];

for (i=0;i<maxmesic+1;i++){

    mimoradnyvklad[i]=0;
    var a = document.getElementsByName('SSmimoradnyVklad').length;
    
    for (y=0;y<a;y++){
     mimoradnyvklad[y]=document.getElementsByName('SSmimoradnyVklad')[y].value*1;
    }
}

for (i = 1; i <=maxmesic; i++) {
	
     
	var pripisujuurokotaznik = 0;
	var jetoledenotaznik = 0;
	var pripisujupodporuotaznik = 0;
		
	mesicvroce [i] = mesicvroce [i-1]+1;
        
	if (mesicvroce[i]%12 === 1 && mesicvroce[i]>1) {jetoledenotaznik=0;} else {jetoledenotaznik=1;}; // někdy zjistím, jak to udělat trochu elegantněji. Ty && jsou tam proto, aby když dám v prvním měsíci leden, tak aby to hned nepřičetlo v dubnu státní podporu :) Když je to leden tak výsledek je 0!!!
	if (mesicvroce[i]%12 === 0) {pripisujuurokotaznik = 1;} else {pripisujuurokotaznik = 0;};
	if (mesicvroce[i]%12 === mesicpodpory) {pripisujupodporuotaznik=1;} else {pripisujupodporuotaznik=0;};

	vypoctovyzakladpodpory [i] = vypoctovyzakladpodpory [i-1] * jetoledenotaznik + zakladpodpory [i-1]*(-(jetoledenotaznik-1)); // bacha toto musí být na začátku, aby s tím mohly pracovat další řádky
	penizenapocatku [i] = penizenakonci [i-1];
	mesicvklad [i] =   pravidelnyvklad * Math.floor(1/((i-1)%periodapravvkladu+1)) + mimoradnyvklad[i];
	poplatky [i] = pravpoplatek * Math.floor(1/(((i)%periodapravpoplatku)+1));
	nepripsanyurok [i] = nepripsanyurok [i-1]* jetoledenotaznik + Math.max( penizenapocatku [i] * sazbapodani,0); //funguje i pro různě první měsíc v roce, yai! :)
	pripsanyurokvroce [i] = nepripsanyurok [i]* pripisujuurokotaznik;
	pripsanapodpora [i] = Math.max(0, Math.min(maxpodpora, vypoctovyzakladpodpory [i-1] * 0.1 * pripisujupodporuotaznik));
	zakladpodpory [i] = zakladpodpory [i-1]-Math.max(0,Math.min(maxpodpora*10, zakladpodpory[i-1]))*(1-jetoledenotaznik) + mesicvklad [i] - poplatky [i] + pripsanyurokvroce [i];
	penizenakonci [i] = penizenapocatku[i] + mesicvklad[i] - poplatky [i] + pripsanyurokvroce [i] + pripsanapodpora [i];
	datum[i] = mesice[(mesicvroce[i])%12] + " "+(rok*1+Math.floor((mesicvroce[i]-1)/12));
        procentonasporeni[i] = Math.round(penizenakonci[i]/cilovka*1000)/10+" %";
};


 datum[0]=["1."+datum[1]];
 mesicvklad[0]=mimoradnyvklad[0];


roundArrayOfNumbers(penizenapocatku,0);
roundArrayOfNumbers(pripsanyurokvroce,0);
roundArrayOfNumbers(pripsanapodpora,0);
roundArrayOfNumbers(penizenakonci,0);
roundArrayOfNumbers(penizenapocatku,0);

var mimoradneVklady=[];

for (i=0;i<maxmesic+1;i++){
mimoradneVklady[i] = createInputElementText("number","inputFieldTable","SSmimoradnyVklad",mimoradnyvklad[i],10);
};

writeTableData(this.name,"SS_someCounter",[datum,penizenapocatku,poplatky,mesicvklad,pripsanyurokvroce,pripsanapodpora,mimoradneVklady,penizenakonci,procentonasporeni], ["Datum", "Peníze na počátku","Poplatky", "Vklad","Úrok","Podpora","Mimořádné vklady","Peníze na konci","% CČ"]);
    
};