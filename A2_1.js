_ = require('lodash');

function bisektion(f, a, b) {
    m = (a + b) / 2;
    if (f(m) > 0) return [a, m];
    return [m, b];
}

function newton(f, df, x){
    return [(x - f(x) / df(x)),1];
}

function sekante(f,a,b){
    return (b - f(b) * (b-a)/(f(b)-f(a)));
}

function sekanten(f, a, b){
    return [b, sekante(f,a,b)];
}

function regulafalsi(f,a,b){
    n = sekante(f,a,b);
    if(f(n) > 0 ) return [n,m];
    return [n,b];
}

function hybrid(f,a,b,n){
    if(n%2 === 0) return regulafalsi(f,a,b,n);
    return bisektion(f,a,b,b);
}

// Definiere f_k
function fk(k) {
    return function(x) {
        return Math.exp(k * x) - Math.exp(2 * k / 7);
    };
}

// Ableitung von f_k
function dfk(k) {
    return function(x) {
        return k * Math.exp(k * x);
    };
}

// Definiere g_k
function gk(k) {
    return function(x) {
        return (1 - 3 * x) / (1 + k * x);
    };
}

//Ableitung von g_k
function dgk(k){
    return function(x) {
        return ((-3) * (1 + k * x) - (1 - 3 * x) * k)  / Math.pow((1 + k * x),2);
    };
}

function verfahren(f,df) {
    return {
        "Bisektions": _.curry(bisektion)(f),
        "Newton": _.curry(newton)(f,df),
        "Sekanten": _.curry(sekanten)(f),
        "regulafalsi ": _.curry(regulafalsi)(f),
        "hybrides ": _.curry(hybrid)(f),
    }
}

ks = [2,5,10];

console.log("\n\nErgebnisse für f: \n");
_.forEach(ks, function(k){
    console.log("\nk = " + k + "\n");
    _.forEach(verfahren(fk(k),dfk(k)), function(verfahren, name){
        grenzen = [0,1];
        outofbounds = false;
        for(i=1;i<=200&&Math.abs(fk(k)(grenzen[0])) > Math.pow(10,-10)&&Math.abs(fk(k)(grenzen[1])) > Math.pow(10,-10);i++){
            grenzen = verfahren(grenzen[0],grenzen[1],i);
            if(grenzen[0]<0 || grenzen[0]>1 ||grenzen[1] <0 || grenzen[1] >1){
                outofbounds = true;
                break;
            }
        }
        if(outofbounds){
            console.log(name + "verfahren hat das Startintervall verlassen");
            console.log(grenzen);
        }else{
            console.log(name + 'verfahren findet a='+ grenzen[0] + ', b=' + grenzen[1] + ', f(a)='+fk(k)(grenzen[0])+', f(b)=' +fk(k)(grenzen[1]) + ' in '+ i + ' Schritten.' );
        }
    });
});

console.log("\n\nErgebnisse für g: \n");
_.forEach(ks, function(k){
    console.log("\nk = " + k + "\n");
    _.forEach(verfahren(gk(k),dgk(k)), function(verfahren, name){
        grenzen = [0,1];
        outofbounds = false;
        for(i=1;i<=200&&Math.abs(fk(k)(grenzen[0])) > Math.pow(10,-10);i++){
            grenzen = verfahren(grenzen[0],grenzen[1],i);
            if(grenzen[0]<0 || grenzen[0]>1 ||grenzen[1] <0 || grenzen[1] >1){
                outofbounds = true;
                break;
            }
        }
        if(outofbounds){
            console.log(name + "verfahren hat das Startintervall verlassen");
            console.log(grenzen);
        }else{
            console.log(name + 'verfahren findet a='+ grenzen[0] + ', b=' + grenzen[1] + ', f(a)='+fk(k)(grenzen[0])+', f(b)=' +fk(k)(grenzen[1]) + ' in '+ i + ' Schritten.' );
        }
    });
});


// Ergebnisse mit Abbruch weiter unten
/* Ergebnisse


Ergebnisse für f:

k = 2
Bisektionsverfahren findet a=0.2857142856810242, b=0.28571428573923185, f(a)=-1.1779865971561776e-10, f(b)=8.834910580901578e-11 in 35 Schritten.
Newtonverfahren findet a=0.28571428571428564, b=1, f(a)=0, f(b)=5.618261146495495 in 6 Schritten.
Sekantenverfahren findet a=0.2857143293984883, b=0.285714285713104, f(a)=1.5471153780310942e-7, f(b)=-4.18509671362699e-12 in 8 Schritten.
regulafalsi verfahren findet a=0.2857142856906606, b=1, f(a)=-8.367018189403552e-11, f(b)=5.618261146495495 in 40 Schritten.
hybrides verfahren findet a=0.28571428571402546, b=0.2879463132825498, f(a)=-9.2148511043888e-13, f(b)=0.007922596600533405 in 15 Schritten.
k = 5
Bisektionsverfahren findet a=0.285714285710128, b=0.28571428573923185, f(a)=-8.674394536001273e-11, f(b)=5.204681130521749e-10 in 36 Schritten.
Newtonverfahren findet a=0.28571428571431307, b=1, f(a)=5.710987238671805e-13, f(b)=144.2404252189785 in 8 Schritten.
Sekantenverfahren findet a=0.2857142780231934, b=0.285714285714155, f(a)=-1.6046440443062693e-7, f(b)=-2.7267077484793845e-12 in 12 Schritten.
regulafalsi verfahren findet a=0.28571428556998435, b=1, f(a)=-3.0106557247222554e-9, f(b)=144.2404252189785 in 201 Schritten.
hybrides verfahren findet a=0.2857142857141222, b=0.28636433151309265, f(a)=-3.411493310068181e-12, f(b)=0.0135844049074203 in 15 Schritten.
k = 10
Bisektionsverfahren findet a=0.285714285713766, b=0.285714285717404, f(a)=-9.049472282640636e-11, f(b)=5.429399152490078e-10 in 39 Schritten.
Newtonverfahren findet a=0.2857142857142882, b=1, f(a)=4.298783551348606e-13, f(b)=22009.054086743385 in 20 Schritten.
Sekantenverfahren findet a=0.0018270031620877258, b=0.0018296491494831932, f(a)=-16.39327011361495, f(b)=-16.39324316551865 in 201 Schritten.
regulafalsi verfahren findet a=0.12975423988095003, b=1, f(a)=-13.751417991723327, f(b)=22009.054086743385 in 201 Schritten.
hybrides verfahren findet a=0.28571428571422225, b=0.28649847123430594, f(a)=-1.1048939541069558e-11, f(b)=0.1370768594046261 in 21 Schritten.


Ergebnisse für g:

k = 2
Bisektionsverfahren findet a=1, b=1, f(a)=5.618261146495495, f(b)=5.618261146495495 in 201 Schritten.
Newtonverfahren findet a=0.3333333333333333, b=1, f(a)=0.17693908861952123, f(b)=5.618261146495495 in 201 Schritten.
Sekantenverfahren findet a=NaN, b=NaN, f(a)=NaN, f(b)=NaN in 13 Schritten.
regulafalsi verfahren findet a=0.33333333333333304, b=1, f(a)=0.17693908861952012, f(b)=5.618261146495495 in 201 Schritten.
hybrides verfahren findet a=0.33333333333333337, b=0.3333333394660839, f(a)=0.17693908861952146, f(b)=0.1769391125094555 in 201 Schritten.
k = 5
Bisektionsverfahren findet a=1, b=1, f(a)=144.2404252189785, f(b)=144.2404252189785 in 201 Schritten.
Newtonverfahren findet a=0.3333333333333333, b=1, f(a)=1.1217561668719327, f(b)=144.2404252189785 in 201 Schritten.
Sekantenverfahren findet a=NaN, b=NaN, f(a)=NaN, f(b)=NaN in 18 Schritten.
regulafalsi verfahren findet a=-8033066217009409000, b=1, f(a)=-4.172733883598096, f(b)=144.2404252189785 in 201 Schritten.
hybrides verfahren findet a=0.3333333333333333, b=0.33333333333333326, f(a)=1.1217561668719327, f(b)=1.1217561668719318 in 201 Schritten.
k = 10
Bisektionsverfahren findet a=1, b=1, f(a)=22009.054086743385, f(b)=22009.054086743385 in 201 Schritten.
Newtonverfahren findet a=0.3333333333333333, b=1, f(a)=10.619916831198474, f(b)=22009.054086743385 in 201 Schritten.
Sekantenverfahren findet a=NaN, b=NaN, f(a)=NaN, f(b)=NaN in 16 Schritten.
regulafalsi verfahren findet a=-8.713796568309568e+36, b=1, f(a)=-17.41170806332765, f(b)=22009.054086743385 in 201 Schritten.
hybrides verfahren findet a=0.3333333333333333, b=0.33333333333333326, f(a)=10.619916831198474, f(b)=10.619916831198463 in 201 Schritten.

*/



// Ergebnise mit Abbruch

/*

Ergebnisse für f:


k = 2

Bisektionsverfahren findet a=0.2857142856810242, b=0.28571428573923185, f(a)=-1.1779865971561776e-10, f(b)=8.834910580901578e-11 in 35 Schritten.
Newtonverfahren findet a=0.28571428571428564, b=1, f(a)=0, f(b)=5.618261146495495 in 6 Schritten.
Sekantenverfahren findet a=0.2857143293984883, b=0.285714285713104, f(a)=1.5471153780310942e-7, f(b)=-4.18509671362699e-12 in 8 Schritten.
regulafalsi verfahren findet a=0.2857142856906606, b=1, f(a)=-8.367018189403552e-11, f(b)=5.618261146495495 in 40 Schritten.
hybrides verfahren findet a=0.28571428571402546, b=0.2879463132825498, f(a)=-9.2148511043888e-13, f(b)=0.007922596600533405 in 15 Schritten.

k = 5

Bisektionsverfahren findet a=0.285714285710128, b=0.28571428573923185, f(a)=-8.674394536001273e-11, f(b)=5.204681130521749e-10 in 36 Schritten.
Newtonverfahren findet a=0.28571428571431307, b=1, f(a)=5.710987238671805e-13, f(b)=144.2404252189785 in 8 Schritten.
Sekantenverfahren findet a=0.2857142780231934, b=0.285714285714155, f(a)=-1.6046440443062693e-7, f(b)=-2.7267077484793845e-12 in 12 Schritten.
regulafalsi verfahren findet a=0.28571428556998435, b=1, f(a)=-3.0106557247222554e-9, f(b)=144.2404252189785 in 201 Schritten.
hybrides verfahren findet a=0.2857142857141222, b=0.28636433151309265, f(a)=-3.411493310068181e-12, f(b)=0.0135844049074203 in 15 Schritten.

k = 10

Bisektionsverfahren findet a=0.285714285713766, b=0.285714285717404, f(a)=-9.049472282640636e-11, f(b)=5.429399152490078e-10 in 39 Schritten.
Newtonverfahren hat das Startintervall verlassen
[ 1.6411708063327652, 1 ]
Sekantenverfahren hat das Startintervall verlassen
[ 0.0014893541747648172, 1.6229388324811527 ]
regulafalsi verfahren findet a=0.12975423988095003, b=1, f(a)=-13.751417991723327, f(b)=22009.054086743385 in 201 Schritten.
hybrides verfahren findet a=0.28571428571422225, b=0.28649847123430594, f(a)=-1.1048939541069558e-11, f(b)=0.1370768594046261 in 21 Schritten.


Ergebnisse für g:


k = 2

Bisektionsverfahren findet a=1, b=1, f(a)=5.618261146495495, f(b)=5.618261146495495 in 201 Schritten.
Newtonverfahren findet a=0.3333333333333333, b=1, f(a)=0.17693908861952123, f(b)=5.618261146495495 in 201 Schritten.
Sekantenverfahren findet a=NaN, b=NaN, f(a)=NaN, f(b)=NaN in 13 Schritten.
regulafalsi verfahren findet a=0.33333333333333304, b=1, f(a)=0.17693908861952012, f(b)=5.618261146495495 in 201 Schritten.
hybrides verfahren findet a=0.33333333333333337, b=0.3333333394660839, f(a)=0.17693908861952146, f(b)=0.1769391125094555 in 201 Schritten.

k = 5

Bisektionsverfahren findet a=1, b=1, f(a)=144.2404252189785, f(b)=144.2404252189785 in 201 Schritten.
Newtonverfahren findet a=0.3333333333333333, b=1, f(a)=1.1217561668719327, f(b)=144.2404252189785 in 201 Schritten.
Sekantenverfahren hat das Startintervall verlassen
[ 0.75, -0.1875 ]
regulafalsi verfahren hat das Startintervall verlassen
[ -0.1875, 1 ]
hybrides verfahren findet a=0.3333333333333333, b=0.33333333333333326, f(a)=1.1217561668719327, f(b)=1.1217561668719318 in 201 Schritten.

k = 10

Bisektionsverfahren findet a=1, b=1, f(a)=22009.054086743385, f(b)=22009.054086743385 in 201 Schritten.
Newtonverfahren findet a=0.3333333333333333, b=1, f(a)=10.619916831198474, f(b)=22009.054086743385 in 201 Schritten.
Sekantenverfahren hat das Startintervall verlassen
[ 0.8461538461538461, -0.45562130177514726 ]
regulafalsi verfahren hat das Startintervall verlassen
[ -0.45562130177514737, 1 ]
hybrides verfahren findet a=0.3333333333333333, b=0.33333333333333326, f(a)=10.619916831198474, f(b)=10.619916831198463 in 201 Schritten.

*/






/*
