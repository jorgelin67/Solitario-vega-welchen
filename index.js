class EscenaInicial extends Phaser.Scene{

    mazo = []
    intentos = 4
    
    matriz_solitario = []
    selecciono = true
    titulo=undefined
    cartasSeleccionadas = undefined
    indiceSeleccionada = undefined


preload(){
    this.load.spritesheet("baraja","assets/sprites/baraja_2.png",{frameWidth:104,frameHeight:160 })
    
}




    cargar_texto(){
        this.add.text(650,90, "mis cartas",{
           Fill : 'purple',
           fontSize: 60
    


        });
    this.add.text(100,500, "mis intentos:"+ this.intentos, {
        fontSize: 22

        })
    }

    SeleccionarCarta(carta, infoCarta){
        console.log(carta)
        this.cartasSeleccionadas = carta
        this.indiceSeleccionada = infoCarta.indice
    }
    clickCarta(carta){
        console.log(carta)
        if(carta.valor !=12){
            if(this.cartasSeleccionadas!=undefined){
                this.mazo[this.indiceSeleccionada]=carta;
                this.add.sprite(carta.columna, carta.fila, "baraja").setScale(0.5).setFrame(this.cartasSeleccionadas.frame);
                this.add.sprite(this.cartasSeleccionadas.pos_x, this.cartasSeleccionadas.pos_y, "baraja").setFrame(carta.frame);
                this.cartasSeleccionadas=undefined;
                
                }
            }
        }


    cargar_matriz_inicial(){
        let posicion_x = 50
        let posicion_y = 160
        let fila = 0
        let columna = 0
        for (let j = 0,length = 36; j < length; j++ ){
            //columna+=1
            let cartasJson = {"palo": this.mazo[j].palo,
            "fila": posicion_y, "columna": posicion_x, "valor": this.mazo[j].columna,
        "frame":this.mazo[j].frame}
        this.add.sprite(posicion_x,posicion_y, "baraja").setScale(0.5)
        .setFrame(49)
        .setInteractive()
        .on("pointerdown",() =>{
            this.clickCarta(cartasJson);//motrar info de cartas
            
        } )
        if(columna == 8){
            columna = 0 
            posicion_x = 50
            posicion_y += 80

        }else{
            posicion_x += 52
            columna += 1
        }
        }
    
    }

 

 

 asignarPalo(fila) {
    let palo = "";
  
    if (fila == 1) {
        palo = "oro";
    } else if (fila == 2) {
        palo = "copas";
    } else if (fila == 3) {
        palo = "espadas";
    } else if (fila == 4) {
        palo = "bastos";
      
    
    }
    return palo;
}



    armar_mazo(){
        let frame=0 // guardo la posicion de la imagen
        for(let fila = 1; fila<5; fila++){
            let palo = this.asignarPalo(fila)
            for(let columna = 1;columna < 13; columna++){
                if (columna == 8 || columna == 9){
                frame += 1;
                continue;
                }
                else {
                 
                let carta = {"palo":palo,"fila":fila,"columna":columna,"frame":frame,"valor":columna}
                this.mazo.push(carta)
                frame += 1

            } 
        } //fin for  columna
    } //fin for fila
    console.log(this.mazo) 
}//fin funcion

    barajar_mazo(){
       return this.mazo.sort(()=>Math.random() - 0.5);
    }



 
    mostrar_mis_cartas() {
        let pos_x = 710
        let pos_y = 190
        for (let i = 39; i >= 36; i--) {
            let info_carta = {"x": pos_x, "y":pos_y, "indice":i}
            let carta = this.mazo[i];
            this.add.sprite(pos_x, pos_y, "baraja").setFrame(carta.frame).setScale(0.5)
                .setInteractive()
                .on("pointerdown", () => {
                    this.SeleccionarCarta(carta, info_carta);
                });
            pos_y += 80
        }
    }




    //Se ejecuta una sola vez al comienzo del juego.
    //Por ejemplo, haremos acciones como ubicar 
    //las imagénes en la pantalla
    create(){
     
        //muestra el texto Mis Cartas
        this.cargar_texto()

        //preparar el mazo con todas las cartas, quitando los 8 y 9
        this.armar_mazo()

        //desordenar aleatoriamente
        this.barajar_mazo()

           //carga la matriz principal
           this.cargar_matriz_inicial()

        //muestra las 4 cartas para intentar resolver el solitario
        this.mostrar_mis_cartas()
    }

    //Se ejecuta de manera constante durante todo el tiempo del videojuego
    // acciones del personaje, colisiones entre otros eventos
    // que se necesiten
    update(){
    
     
    }
}

//Configuracion inicial del juego. Es un objeto JSON
const config = {
    type: Phaser.AUTO, // renderizado del juego (CANVAS, WEBGL, HEADLESS, AUTO)
    with: 900, //ancho del canvas
    height: 800, // alto del canvas
    scene: [EscenaInicial], // escena de un videojuego. Si hay mas de 1 se usan listas
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            
        },
    }
};

new Phaser.Game(config);
