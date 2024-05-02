class EscenaInicial extends Phaser.Scene{
preload(){
    this.load.spritesheet("baraja","assets/sprites/baraja_2.png",{frameWidth:104,frameHeight:160 })
}


    matriz_solitario = []
    selecciono = true
    titulo=undefined
    mazo = Array()


    cargar_texto(){

   
    }



    cargar_matriz_inicial(){
        let posicion_x = 50
        let posicion_y = 160
        for (let fila = 0; fila < 4; fila++) {
            for (let columna = 0; columna < 10; columna++) {
                console.log("fila:",fila,"columna:",columna)
                this.add.sprite(posicion_x, posicion_y, "baraja").setFrame(49)
                posicion_x+=104 + 10
            }
            posicion_x = 50
            posicion_y+=160
        }


    }

    armar_mazo(){
        let frame=0 // guardo la posicion de la imagen
 
        
    }

    barajar_mazo(){
       
    }

    mostrar_mis_cartas(){
        let pos_x = 80
        let pos_y = 600
        
    }




    //Se ejecuta una sola vez al comienzo del juego.
    //Por ejemplo, haremos acciones como ubicar 
    //las imagénes en la pantalla
    create(){
        //carga la matriz principal
        this.cargar_matriz_inicial()

        //muestra el texto Mis Cartas
        this.cargar_texto()

        //preparar el mazo con todas las cartas, quitando los 8 y 9
        this.armar_mazo()

        //desordenar aleatoriamente
        this.barajar_mazo()
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
