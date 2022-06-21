$(function(){
    $('.num,.escreve').click(function(){
        $('.entrada').append($(this).text());
    })
    $('.op:eq(0)').click(function(){
        $('.entrada').append('&divide;');
    })
    $('.op:eq(1)').click(function(){
        $('.entrada').append('&times;');
    })
    $('.op:eq(2)').click(function(){
        $('.entrada').append('&minus;');
    })
    $('.op:eq(3)').click(function(){
        $('.entrada').append('&plus;');
    })
    setTimeout(console.clear(),2000);
    // $(window).resize(function(){
    //     $('.saida').html(window.innerWidth+'px');
    // })
})
var calcTexto;
function backspace(){
    var texto = $('.entrada').text();
    let novoC = texto.substring(0,texto.length-1)
    $('.entrada').text(novoC);
}
function apagaTudo(onde){
    $(onde).text('');
}

function operar(){
    // console.log($('.entrada').text());
    transformar();
    try{
        resultado = eval(calcTexto);
        $('.saida').text(resultado);
        GuardarH($('.entrada').text(),$('.saida').text());    
        $('.entrada').text('');
    }catch(erro){
        if(window.confirm('ocorreu o seguinte erro ao tentar operar: \n'+erro+'\n\n Quer ver a lista de possiveis erros?')){
            $('#modal1').modal('show')
        }
    }
    //adicionar o evento click nos elementos do historico
    $('.historico li').click(function(){
        reinsere($(this).text());
    })
}
function transformar(){
    var texto = $('.entrada').text();
    calcTexto = substituiT(texto,'÷','/');
    calcTexto = substituiT(calcTexto,'×','*');
    calcTexto = substituiT(calcTexto,'−','-');
    calcTexto = substituiT(calcTexto,',','.');
    console.log(calcTexto);

}
function substituiT(str,strsub1,strsub2){
    while(str.indexOf(strsub1)>=0){
        str = str.replace(strsub1,strsub2);
    }
    return str;
}
$('.glyphicon-menu-hamburger').click(function(){
    $('.mais').toggleClass('dentro');
    $('main').fadeToggle();
    $('.fa-history').toggleClass('d-none');
    $('.ops span:eq(1)').toggleClass('d-none');
    $('.rodape').toggleClass('d-none');
})
$('.fa-history').click(function(){
    $('.historico').toggleClass('dentro2');
    // $('main').toggleClass('fora');
    $('main').fadeToggle();
    $('.glyphicon-menu-hamburger').toggleClass('invisible');
})

function GuardarH(valor1,valor2){
    $('.historico > h4').addClass('d-none');
    $('.lista').prepend(
        `<li><div class='media'><div class='media-body'><h4 class='media-title'>${valor1} = ${valor2}</h4></div><div class='media-right'><span class='fa fa-close p-3' style='font-size:18px;'></span></div></div></li>`
    ) 
    $('.fa-close').click(function(){
        console.log($(this).parent().parent());
        $(this).parent().parent().remove();
        if($('.lista').children(':empty').length==$('.lista').children().length){
            $('.historico > h4').removeClass('d-none');
        }
    })  
}
$('.historico .fa-trash').click(function(){
    $('.historico > h4').removeClass('d-none');
    $('.lista').empty();
})
$('.list-group-item').mouseover(function(){
    $(this).removeClass('bg-danger');
})
$('.list-group-item').mouseout(function(){
    $(this).addClass('bg-danger');
})
$('.saida').click(function(){
    $('.entrada').text($(this).text());
});
//Reinsere dados no historico
function reinsere(dados){
    var dadosDiv = dados.split('=');
    $('.entrada').text(dadosDiv[0].trim());
    $('.saida').text(dadosDiv[1].trim());
    console.log(dadosDiv);
}
function mudaSinal(num){
        num = Number(num);
        num = num * -1;
        return num;
}
function fatorialDe(num){
    num = Number(num);
    for(let c = num-1;c>=1;c--){
        num = num * c;
    }
    return num;
}
$('.fat').click(function(){
    $('.saida').text(fatorialDe(eval($('.entrada').text())))
    let res = eval($('.entrada').text());
    $('.entrada').text(`fatorial(${res})`);
    console.log(res);
})

// Usando as tooltips do bootstrap para descrever a funcao de cada botao

function infoBotao(desc){
    this.desc = desc;
    var obj = {
        title:"<span class='glyphicon glyphicon-info-sign'></span><br/>"+"<p>"+this.desc+"</p>",
        html:true,
        trigger:'hover',
        delay:{show:0,hide:100},
    }
    return obj;
}

let infoApagaE = infoBotao('Apaga o campo de entrada');
$('.apagaE').tooltip(infoApagaE);
let infoApagaR = infoBotao('Apaga o campo dos resultados');
$('.apagaS').tooltip(infoApagaR);
let infoApaga = infoBotao('Apaga caractere por caractere do campo de entrada');
$('.apaga').tooltip(infoApaga);
let infoPi = infoBotao('insere o valor de PI no campo de entrada');
$('.pi').tooltip(infoPi);
let infoFat = infoBotao('Calcula o fatorial de um numero');
$('.fat').tooltip(infoFat);
let infoInvS = infoBotao('Inverte o sinal de um numero');
$('.invS').tooltip(infoInvS);