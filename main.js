function procesing(){
  const saida = document.getElementById("saida")
  const saida2 = document.getElementById("saida2")
  const codon_output = document.getElementById("Códon")
  const amino_output = document.getElementById("Aminoacido")
  const output2 = document.getElementById("output2");
  const helice = document.getElementById("dna")
  const dna = helice.value.toUpperCase()
  var rna = '';
  var codon = []
  var proteina = [];
  var status;
  var getCodon = '';
  var codonPause = 0;
  var codonBreak;
  var statusOutPut;
  //contadores
  var i = 0;
  var j = 0;
  var k = 0;
  var n = 0;
  var t = 0;

  //Aminoácidos
  var groupU = {
      "UUU": "FEN",
      "UUC": "FEN",

      "UUA": "LEU",
      "UUG": "LEU",

      "UCU": "SER",
      "UCC": "SER",
      "UCA": "SER",
      "UCG": "SER",

      "UAU": "TIR",
      "UAR": "TIR",

      "UGU": "CIS",
      "UGC": "CIS",

      "UGG": "TRP"

  }
  var groupC = {
      "CUU": "LEU",
      "CUA": "LEU",
      "CUC": "LEU",
      "CUG": "LEU",

      "CCU": "PRO",
      "CCC": "PRO",
      "CCA": "PRO",
      "CCG": "PRO",

      "CAU": "HIS",
      "CAC": "HIS",

      "CAA": "GLN",
      "CAG": "GLN",

      "CGU": "ARG",
      "CGA": "ARG",
      "CGG": "ARG",
      "CGC": "ARG"
  }
  var groupA = {
      "AUU":"ILE",
      "AUC":"ILE",
      "AUA":"ILE",
      "AUG":"MET",

      "ACU":"TRE",
      "ACC":"TRE",
      "ACA":"TRE",
      "ACG":"TRE",

      "AAU":"ASN",
      "AAC":"ASN",
      
      "AAA":"LIS",
      "AAG":"LIS",

      "AGU":"SER",
      "AGC":"SER",
      
      "AGA":"ARG",
      "AGG":"ARG"
  }
  var groupG = {
      "GUU":"VAL",
      "GUA":"VAL",
      "GUC":"VAL",
      "GUG":"VAL",

      "GCU":"ALA",
      "GCG":"ALA",
      "GCC":"ALA",
      "GCA":"ALA",
      
      "GAU": "ASP",
      "GAC": "ASP",

      "GAA": "GLU",
      "GAG": "GLU",

      "GGU": "GLI",
      "GGA": "GLI",
      "GGC": "GLI",
      "GGG": "GLI"
  }

  while(j <= dna.length){
      if(dna[j] != "A" && dna[j] != "C" && dna[j] != "G" && dna[j] != "T" ){
          status = false;
          window.alert("erro")
          statusOutPut = false
          break;
         
      }
      else if(dna.length < 3){
        saida.innerHTML = "<p>Erro no DNA , Cadeia não possui no mínimo 3 Bases Nitrogenadas</p>";
        status = false;
        break;
      } else{
          j++
          if(j == dna.length){
              status = true;
              console.log("certo")
              break;
          } 
      }
  }
  if(status == true){
      while(dna[i]){
          switch(dna[i]){
              case "A":
                  rna += "U";
                  break;
              case "C":
                  rna += "G";
                  break;
              case "G":
                  rna += "C";
                  break;
              case "T":
                  rna += "A";
                  break;
              default:
                  break;
          }
          i++;
      }
          while(rna[k] ){
          
                  if(getCodon.length <= 3){
                      getCodon += rna[k];
                      k++;
                  }
                  if(getCodon.length == 3){
                      codon[n] = getCodon;
                      n++
                      getCodon = ''
                  }
              
          }
  }
  if(rna.length % 3 == 1){
      var m = 0;
      while(codon[m]){
          if(codon[m] == "UGA" || codon[m] == "UAG" || codon[m] == "UAA"){
              console.log("existe códon de parada")
              codonBreak = true
              break;
          } 
          else {
              m++
          }
      }
  } 
  


while(t < codon.length){
  if(codon[t] == undefined){
      break;
  }
  if(codon[t] == "UAA" || codon[t] == "UGA" || codon[t] == "UAG"){
      if(t == 0){
          statusOutPut = false
          break;
      }
      break;
  } else if(rna.length % 3 == 1 && codonBreak == false){
    saida.innerHTML = "<p>Erro no DNA , Falta duas Bases nitrogenadas para completar um códom</p>";
    statusOutPut = false
    break;
} else if(rna.length % 3 == 2 && codonBreak == false){
    saida.innerHTML = "<p>Erro no DNA , Falta uma Bases nitrogenadas para completar um códom</p>";
    statusOutPut = false
    break; 
} else {
      statusOutPut = true
  }
  switch(codon[t][0]){
      case "G":
          proteina[t] = groupG[codon[t]];
          t++
          break;
      case "A":
          proteina[t] = groupA[codon[t]];
          t++
          break;
      case "U":
          proteina[t] = groupU[codon[t]];
          t++
          break;
      case "C":
          proteina[t] = groupC[codon[t]];
          t++;
          break;
  }
  if(statusOutPut){
        saida.setAttribute("style","display:block;")
        output2.setAttribute("style","display:block;")
        amino_output.innerHTML = ""
        codon_output.innerHTML = "" 
        saida2.innerHTML = ""
        amino_output.innerHTML = proteina;
        let index = 0 
        var s = 0

        while(codon[s]){
            if(codon[s] == "UAA" || codon[s] == "UGA" || codon[s] == "UAG"){
                codon_output.innerHTML += `<span class='codon_pause'>"${codon[s]}</span> - `;
                s++
            } else {
               codon_output.innerHTML += `${codon[s]} - `;
                s++ 
            }  
        }
        while(dna[index] && rna[index]) {  
            if(index % 3 == 0){
                saida2.innerHTML += "<hr style='width:100%;'>"
            }
            saida2.innerHTML += `<p>${dna[index]} ---------- ${rna[index]}</p>`
          
            index++
        }
       
        console.log(dna)
        console.log(codon)
        console.log(rna)
        console.log(proteina)
        
       // document.querySelector(".interface").setAttribute("style","height:auto;")
       
  } else {
      saida.innerHTML = "Erro, Cadeia de bases nitrogenadas inválida";
  }
  
}

}

document.getElementById("dna").addEventListener("keypress", (obj) =>{
  if(obj.key.toUpperCase() != "A" && obj.key.toUpperCase() != "C" && obj.key.toUpperCase() != "G" && obj.key.toUpperCase() != "T" ){
      obj.preventDefault()
  }
}) 
