let checked1 = false;
let checked2 = false;
let checked3 = false;
const TIME = 500;

//invoke functions
removeQuantity();
setInterval(function (){
    checkbox();
}, TIME);

function checkbox() {
    
    if (document.querySelector('#customCheck1:checked')) {
       checked1 = true;
       document.querySelector('#quantity').style.display ="inline";
       document.querySelector('#textBox1').style.visibility = "visible";
    } else {
        checked1 = false;
        document.querySelector('#textBox1').style.visibility = "hidden";
    }

    if (document.querySelector('#customCheck2:checked')){
        checked2 = true;
        document.querySelector('#quantity').style.display ="inline";
        document.querySelector('#textBox2').style.visibility = "visible";
    } else {
        checked2 = false;
        document.querySelector('#textBox2').style.visibility = "hidden";
    }

    if (document.querySelector('#customCheck3:checked')){
        checked3 = true;
        document.querySelector('#quantity').style.display ="inline";
        document.querySelector('#textBox3').style.visibility = "visible";
    } else {
        checked3 = false;
        document.querySelector('#textBox3').style.visibility = "hidden";
    }
    
    if (!document.querySelector('#customCheck1:checked') 
    && !document.querySelector('#customCheck2:checked') 
    && !document.querySelector('#customCheck3:checked')){
        removeQuantity();
    }
}

function removeQuantity(){
    document.querySelector('#quantity').style.display ="none";
}