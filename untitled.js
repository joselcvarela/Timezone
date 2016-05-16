for (let i = 0; i < 23; i++) {
  if((i+bd.tek_eua.gmt)<0) {
    var state_tek_eua = bd.tek_eua.estados[bd.tek_eua.estados.length + bd.tek_eua.gmt + i]
  } else if ((i+bd.tek_eua.gmt)>=bd.tek_eua.estados.length) {
    var state_tek_eua = bd.tek_eua.estados[bd.tek_eua.gmt - (bd.tek_eua.estados.length - i)]
  } else {
    var state_tek_eua = bd.tek_eua.estados[bd.tek_eua.gmt + i];
  }

  if((i+bd.tek.gmt)<0) {
    var state_tek = bd.tek.estados[bd.tek.estados.length + bd.tek.gmt + i]
  } else if ((i+bd.tek.gmt)>=bd.tek.estados.length) {
    var state_tek = bd.tek.estados[bd.tek.gmt - (bd.tek.estados.length - i)]
  } else {
    var state_tek = bd.tek.estados[bd.tek.gmt + i];
  }

  if((i+bd.gen.gmt)<0) {
     var state_gen = bd.gen.estados[bd.gen.estados.length + bd.gen.gmt + i]
  } else if ((i+bd.gen.gmt)>=bd.gen.estados.length) {
    var state_gen = bd.gen.estados[bd.gen.gmt - (bd.gen.estados.length - i)]
  } else {
    var state_gen = bd.gen.estados[bd.gen.gmt + i];
  }
}

function cc(gmt, i){
  if((i+gmt)<0) {
     return 24-(-gmt-i);
  } else if ((i+gmt)>23) {
    return gmt-(24-i);
  } else {
    return gmt+i;
  }
}
