var app = new Framework7({
    // App root element
    root: '#app',
    // App Name
    name: '',
    // App id
    id: 'com.myapp.test',
    // Enable swipe panel
    panel: {
      swipe: 'left',
    },
    // Add default routes
    routes: [
      {   
        path: '/home/',
       
        url: 'index.html?l=g', 
        on:{
          pageInit:function(){
       
          },
        },      
      },
      {   
        path: '/login/',
        url: 'login.html?b=8', 
        on:{
          pageInit:function(){
            mostrando();
            login();
           
            cadastro();
          },
        },      
      },
   
      {
        path: '/inicio/',
        url: 'inicio.html?p=v',
        on:{
          pageInit:function(){
            
            inicio();
            mostrarDados();
          },
        }, 
      },
      {
        path: '/projet/',
        url: 'projeto.html?b=w',
        on:{
          pageInit:function(){
            teste();
            inicio();
            pageTarefas();
          },
        }, 
      },

    ],
    // ... other parameters
  });
  var mainView = app.views.create('.view-main'); 
    var $$ = Dom7;
    
if(window.openDatabase){
  //criando  base de dados 
  db = openDatabase("DB_PROJETO", "0.1", "Base de dados local",5*1024*1024);

  //criando Tabela Tarefas
  db.transaction(function(query){
    query.executeSql("CREATE TABLE  IF NOT EXISTS loginn (ID_cadastro INTEGER PRIMARY KEY AUTOINCREMENT,usuario TEXT, senha TEXT)");
      query.executeSql("CREATE TABLE Projetos (id INTEGER PRIMARY KEY AUTOINCREMENT, titulo TEXT, descricao TEXT, data TEXT)");

      query.executeSql("CREATE TABLE  IF NOT EXISTS configuration (id INTEGER PRIMARY KEY AUTOINCREMENT, theme INTEGER)");
      
      query.executeSql("SELECT theme FROM configuration", [],function(query,result){
          linha = result.rows.length;
          // alert(dados);

          if(linha ==0){
              query.executeSql("INSERT INTO  configuration (theme) VALUES (1)",[]);

          }
         

      });

  });
}

    
    const cod_usuario = localStorage.getItem('ID_cadastro');

    
    $("#sairIndex").click(function(){
      localStorage.removeItem('ID_cadastro');
      localStorage.removeItem('usuario');
      
      btnLogout();
    });

    $("#sair2").click(function(){
      localStorage.removeItem('ID_cadastro');
      localStorage.removeItem('usuario');
      app.views.current.router.back(); 
      btnLogout();
    });
  
    
    window.onload= function(){  
     

      if(cod_usuario){
      
        
        $(".banner").hide(); 
        $(".inicio").show();
        $("#sairIndex").show();
        $(".login").hide();
        $(".home").hide();
        $(".mini-menu").show();
  
       
    
      }else{
        $(".home").show();
        $(".inicio").hide(); 
        $(".banner").show();
        $("#sairIndex").hide();
        $(".login").show();
        $(".mini-menu").hide();
  
        
  
        //colocar o botão sair  semelhante=  $("#btn-prato").hide(); 
      }
    }
     function btnLogin(){
       setTimeout(function(){
         $(".inicio").show(); 
         $(".banner").hide();
         $("#sairIndex").show(); 
         $(".login").hide();
         $(".mini-menu").show();
         $(".home").hide();
        
    
       },500);
     }
  
     function btnLogout(){
       setTimeout(function(){
         $(".inicio").hide(); 
         $(".banner").show();
         $("#sairIndex").hide();
         $(".mini-menu").hide();
         $(".login").show();
        
    
       },500);
     }

    function mostrando(){
      $(".cadastroForm").hide();
      $(".TextoC").hide();


      $("#cadastroC").click(function(){
        setTimeout(function(){
          $(".cd").hide();
          $(".cadastroForm").show(); 
          $(".TextoC").show();
          
     
        },500);
        
      });
    }

    function cadast(){
      setTimeout(function(){
        $(".cd").show();
        $(".cadastroForm").hide(); 
        $(".TextoC").hide();
        
   
      },500);
      

    }
 
  

    
  

 
    // banco local
    var mainView = app.views.create('.view-main');

//Iniciando o Jquery index
$(document).ready(function(){
  
    db.transaction(function(query){
        query.executeSql("SELECT theme FROM configuration", [],function(query,result){
            linha = result.rows;
                for(var i = 0; i < linha.length; i ++){
                   result_theme = linha[i].theme;  
                }
                if(result_theme == 0){
                    $(".bg" ).toggleClass("theme-dark");
                    $(".panel" ).toggleClass("bg-black");
                    $('input[type="checkbox"]').prop('checked',true);
                }
        });
    });

    //array - gravando mais de dado para estar utilizando
    //pegando a Data atual
    now = new Date ;
    dias = new Array("Domingo","Segunda","Terça","Quarta","Quinta","Sexta","Sábado");
    meses = new Array("Jan","Fev","Mar","Abr","Mai","jun","jul","Ago","Set","Out","Nov","Dez");
    $(".data-atual").html(dias[now.getDay()]+ ", "+now.getDate()+" de "+meses[now.getMonth()] + " de  "+ now.getFullYear());
    // alert(meses);

    //função para modo noturno
    $(".btn-noturno").click(function(){
        db.transaction(function(query){
            if(result_theme ==1){
                db.transaction(function(query){
                    query.executeSql("UPDATE configuration SET theme = 0 ", []);
                });
            }else{
                db.transaction(function(query){
                    query.executeSql("UPDATE configuration SET theme = 1 ", []);
                });
            }
        });
        $(".bg" ).toggleClass("theme-dark");
        $(".panel" ).toggleClass("bg-black");
     
    });

    d = ("0" + now.getDate()).slice(-2);
    m = ("0" + (now.getMonth() + 1)).slice(-2);
    t = now.getFullYear()+"-"+(m)+"-"+(d);

    mostrarDados();   

});//fim docoment pAge index
  // login
  function login(){


    $("#entrar").click(function(e){
      e.preventDefault(); //evento =  padrão não retorna

        var usuario =$("#usuario").val();
        var senha = $("#senha").val();
      
        if(usuario.trim() == "" || senha.trim() == ""){
          app.dialog.alert("Os campos usuário e senha são obrigatórios!"), "";
          return false
        }
        db.transaction(function(query){
          query.executeSql("SELECT * FROM loginn WHERE usuario=? AND senha=?", [usuario, senha],
          function(query,result){
             rows = result.rows;
             dados = (rows.length);
               if(dados > 0){
                app.dialog.preloader("Bem-vindo "+usuario);
                setTimeout(function () {
                  app.dialog.close();
                }, 3000);
  
              //  alert("Usuário existe");
              //  console.log(data);
            
              localStorage.setItem('ID_cadastro',result.ID_cadastro);
              localStorage.setItem('usuario',result.usuario);
              
       
              // app.views.current.router.back();
              $("#usuario,#senha").val("");
              app.views.current.router.back(); 
              btnLogin();
              
               }else{
                app.dialog.alert("Usuário ou senha incorretos!","");
            
                $("#usuario,#senha").val("");
               }
          });
        });
       

    });
       // fim
  

  }
 

function cadastro(){
    //Granvando informações do login
    $("#cadastrar").click(function(){
      // alert("Funcionou!!!");
 
      var usuario_c = $("#usuario_c").val();
      var senha_c   = $("#senha_c").val();
  

      if( usuario_c.trim() == ""){
        app.dialog.alert("Preencha o Usuário corretamente.", "");
        closeMen();
        return false;
      }
     if (senha_c.trim() == ""){
      app.dialog.alert("Preencha a Senha corretamente.", "");
      closeMen();
      return false;
     }
      var notification = app.notification.create({
        title:"Cadastro",
        text: "Cadastrado com sucesso!",
        closeTimeout: 3000
      });
  
     //gravando informações na tabela
     db.transaction(function(query){
       notification.open(); //chamando essa função
       query.executeSql("INSERT INTO loginn (usuario, senha) VALUES(?,?)", [usuario_c,senha_c]);
      //  localStorage.setItem('ID_cadastro',ID_cadastro);
       localStorage.setItem('usuario_c',usuario_c);
       $("#usuario_c,#senha_c").val(""); //limpando os campos
     
     });
  
     //fechar mensagem com três segundos
     function closeMen(){
       setTimeout(function(){
        app.dialog.close();
       },3000);
     }
    });
     
      



}//fim do cadastro

//funções de escopo global
function mostrarDados(){
  dados="";
//Executar conculta SQL
  db.transaction(function(query){
      query.executeSql("SELECT * FROM projetos ORDER BY data ASC",[],function(query, result){
      linha = result.rows;
      
      for(var i = 0; i < linha.length; i ++){
          var inicial = linha[i].titulo.substring(0,1);
          var dataF = linha[i].data;
          split = dataF.split('-');
          novaData = split[2]+"/"+split[1]+"/"+split[0];  
         
          dados+='<li class="swipeout">';
              
          if(dataF < t){
                 dados+=' <div class="swipeout-content item-content color">';
                      dados+='<div class="item-media color_A color_B"><span>'+inicial+'</span></div>';
                      dados+=' <div class="item-title atividade">'+linha[i].titulo.substring(0,30)+'</div>';
                       dados+=' <div class="item-left small">'+novaData+'</div>';
                  dados+='</div>'; //Fim swipeout-content
             
              }else{
                  dados+=' <div class="swipeout-content item-content">';
                      dados+='<div class="item-media color_A "><span>'+inicial+'</span></div>';
                      dados+=' <div class="item-title atividade">'+linha[i].titulo.substring(0,30)+'</div>';
                      dados+=' <div class="item-left small">'+novaData+'</div>';
                   dados+='</div>'; //Fim swipeout-content
         
              }  
          
              
              dados+='<div class="swipeout-actions-right">';
              dados+=' <a href="#" class="swipeout" onclick="descricao('+linha[i].id+')"><i class="f7-icons">eye_fill</i></a>';
              dados+='<a href="#" class="swipeout-delete" onclick="deletar('+linha[i].id+')"> <i class="f7-icons">trash_fill</i></a>';
              dados+='</div>';//Fim swipeout-actions-right
              dados+='</li>';  //Fim li
          } //Fim do For
          $("#list").html(dados);
      });
  });
}//Fim escopo global




function descricao(id){
  exibir = "";
  

  db.transaction(function(query){
      query.executeSql("SELECT titulo, descricao, data FROM projetos WHERE id=?",[id],function(query, result){
      linha = result.rows;
      for(var i = 0; i < linha.length; i++){
        exibir+=' <div class="card card-outline bg-color-yellow text-color-black margin-top">';
        exibir+=' <div class="card-header color_A color_B ">  <strong>'+linha[i].titulo.substring(0,30)+'</strong><img src="img/ideia.png" > </div>';
        exibir+='<div class="card-content card-content-padding  text-color-black">'+linha[i].descricao+'</div>';
        exibir+=' <div class="card-footer  padding  text-color-black text-right">'+novaData+'  </div>';
       
        exibir+='</div>';
          
      }
      app.dialog.alert(exibir);
      });
  });
}


//Remove tarefa
    function deletar(id){
     
        db.transaction(function(query){
          
            query.executeSql("DELETE FROM  projetos WHERE id=?",[id]);
        });
        app.dialog.preloader("Deletando ");
        setTimeout(function () {
          app.dialog.close();
        }, 1000);
    }

//removendo tarefas atrasadas
    $(".excluir").click(function(){
        // alert("ok");
        app.dialog.confirm("Deseja deletar os projetos atrasados?", "Excluir",
        function(){
                db.transaction(function(query){
                query.executeSql("DELETE FROM  projetos WHERE data < date('now')");
            });
            app.dialog.alert("Os projetos atrasados foram deletados", "Informação");
            mostrarDados();
        });
    });


    

function  teste(){

  


  $$(".btn-agendar-projet").click(function(){
    var  titulo = $("#titulo").val(); //recebendo um valor
    var descricao = $("#descricao").val();
    var data_tarefa = $("#data_tarefa").val();
    
    // if( descricao.trim() == "" && titulo.trim() == ""){
    //     app.dialog.alert("Preencha algum dos campos" , "AVISO");
    //     return false;
    // }
    if( titulo.trim() == ""){
      app.dialog.alert("O campo titulo é obrigatório" , "AVISO");
      return false;
  }
  if( data_tarefa.trim() == ""){
    app.dialog.alert("Digite ou selecione a data" , "AVISO");
    return false;
}
    
    
     if(data_tarefa < t){
         app.dialog.alert("A data não pode ser retroativa","AVISO");
         $('#data_tarefa').val(t);
         return false;
     }
    // alert(titulo + " | " + descricao);
    
    //inserindo informações no banco
  
    db.transaction(function(query){
        query.executeSql("INSERT INTO   projetos (titulo, descricao, data) VALUES(?,?,?)",[titulo, descricao,data_tarefa]);
        app.dialog.preloader("Cadastrando ");
        setTimeout(function () {
          app.dialog.close();
        }, 1000);
        app.views.current.router.back();
        $("#titulo").val(""); 
        $("#descricao").val("");
        $("#data_tarefa").val(t);
    });
    mostrarDados();
    
    
  });
}

//Função Page tarefas
