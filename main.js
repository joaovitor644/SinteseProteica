function procesing() {
  var saida = document.getElementById("saida");

  var helice = document.getElementById("dna");
  var dna = helice.value.toUpperCase();
  var rna = "";
  var codon = [];
  var proteina = [];
  var status;
  var getCodon = "";
  var codonPause = 0;

  //contadores
  var i = 0;
  var j = 0;
  var k = 0;
  var n = 0;
  var t = 0;

  //Aminoácidos
  var groupU = {
    UUU: "FEN",
    UUC: "FEN",

    UUA: "LEU",
    UUG: "LEU",

    UCU: "SER",
    UCC: "SER",
    UCA: "SER",
    UCG: "SER",

    UAU: "TIR",
    UAR: "TIR",

    UGU: "CIS",
    UGC: "CIS",

    UGG: "TRP",
  };
  var groupC = {
    CUU: "LEU",
    CUA: "LEU",
    CUC: "LEU",
    CUG: "LEU",

    CCU: "PRO",
    CCC: "PRO",
    CCA: "PRO",
    CCG: "PRO",

    CAU: "HIS",
    CAC: "HIS",

    CAA: "GLN",
    CAG: "GLN",

    CGU: "ARG",
    CGA: "ARG",
    CGG: "ARG",
    CGC: "ARG",
  };
  var groupA = {
    AUU: "ILE",
    AUC: "ILE",
    AUA: "ILE",
    AUG: "MET",

    ACU: "TRE",
    ACC: "TRE",
    ACA: "TRE",
    ACG: "TRE",

    AAU: "ASN",
    AAC: "ASN",

    AAA: "LIS",
    AAG: "LIS",

    AGU: "SER",
    AGC: "SER",

    AGA: "ARG",
    AGG: "ARG",
  };
  var groupG = {
    GUU: "VAL",
    GUA: "VAL",
    GUC: "VAL",
    GUG: "VAL",

    GCU: "ALA",
    GCG: "ALA",
    GCC: "ALA",
    GCA: "ALA",

    GAU: "ASP",
    GAC: "ASP",

    GAA: "GLU",
    GAG: "GLU",

    GGU: "GLI",
    GGA: "GLI",
    GGC: "GLI",
    GGG: "GLI",
  };
  // Cria div com mensagem de erro
  const errorMessage = document.createElement("div");
  errorMessage.className = "divError";
  let errorText;
  const interface = document.querySelector(".interface");

  //Funcao para recarregar a página, fazendo sumir a div
  function locationRealod() {
    setTimeout(function () {
      location.reload();
    }, 2500);
  }

  while (j <= dna.length) {
    if (dna[j] != "A" && dna[j] != "C" && dna[j] != "G" && dna[j] != "T") {
      status = false;
      errorText = document.createTextNode("Erro!");
      errorMessage.appendChild(errorText);
      interface.appendChild(errorMessage);

      locationRealod();

      break;
    } else {
      j++;
      if (j == dna.length) {
        status = true;
        console.log("certo");
        break;
      }
    }
  }
  if (status == true) {
    while (dna[i]) {
      switch (dna[i]) {
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
    while (rna[k]) {
      if (getCodon.length <= 3) {
        getCodon += rna[k];
        k++;
      }
      if (getCodon.length == 3) {
        codon[n] = getCodon;
        n++;
        getCodon = "";
      }
    }
  }
  if (rna.length % 3 == 1) {
    var m = 0;
    while (codon[m]) {
      if (codon[m] == "UGA" || codon[m] == "UAG" || codon[m] == "UAA") {
        console.log("existe códon de parada");
        break;
      } else {
        m++;
      }
    }
  }

  while (t < codon.length) {
    if (codon[t] == undefined) {
      break;
    }
    if (codon[t] == "UAA" || codon[t] == "UGA" || codon[t] == "UAG") {
      if (t == 0) {
        errorText = document.createTextNode("Rna inválido!");
        errorMessage.appendChild(errorText);
        interface.appendChild(errorMessage);

        locationRealod();

        //window.alert("rna inválido");
        break;
      }
      break;
    } else if (rna.length % 3 == 1) {
      errorText = document.createTextNode("Rna inválido!");
      errorMessage.appendChild(errorText);
      interface.appendChild(errorMessage);

      locationRealod();

      // window.alert("rna inválido");
      break;
    }
    switch (codon[t][0]) {
      case "G":
        proteina[t] = groupG[codon[t]];
        t++;
        break;
      case "A":
        proteina[t] = groupA[codon[t]];
        t++;
        break;
      case "U":
        proteina[t] = groupU[codon[t]];
        t++;
        break;
      case "C":
        proteina[t] = groupC[codon[t]];
        t++;
        break;
    }
  }

  var output =
    "<p> DNA  => &nbsp;&nbsp;" +
    dna +
    "</p>" +
    " <p>" +
    "RNAm => " +
    rna +
    "</p>" +
    "<p>" +
    "Códon => " +
    codon.join(" - ") +
    "</p>" +
    "<p>" +
    "Aminoácidos => " +
    proteina.join(" - ") +
    "</p>";

  saida.innerHTML = output;
  console.log("Proteína => " + proteina);
  console.log("RNAm => " + rna);
  console.log("Qunatidade de nucleotídeos => " + dna.length);
  console.log("Códon => " + codon);
}
