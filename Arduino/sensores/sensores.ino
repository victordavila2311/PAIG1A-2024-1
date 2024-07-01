// Arduino and KY-040 module
/*
  int encoderPinA = 8; // CLK pin
  int encoderPinB = 9; // DT pin
  int encoderBtn = 10; // SW pin
  int count = 0;
  int encoderPinA_prev;
  int encoderPinA_value;
  boolean bool_CW;
  void setup() {
  Serial.begin (9600);
  pinMode (encoderPinA, INPUT);
  pinMode (encoderPinB, INPUT);
  pinMode(encoderBtn, INPUT_PULLUP);
  encoderPinA_prev = digitalRead(encoderPinA);
  }
  void loop() {
  encoderPinA_value = digitalRead(encoderPinA);
  if (encoderPinA_value != encoderPinA_prev) { // check if knob is rotating
    // if pin A state changed before pin B, rotation is clockwise
    if (digitalRead(encoderPinB) != encoderPinA_value) {
      count ++;
      bool_CW = true;
    } else {
      // if pin B state changed before pin A, rotation is counter-clockwise
      bool_CW = false;
      count--;
    }
    if (bool_CW) {
      Serial.print("Clockwise | ");
    } else {
      Serial.print("Counter-Clockwise | ");
    }
    Serial.print(count);
    Serial.print(" | ");
  }
  encoderPinA_prev = encoderPinA_value;
  // check if button is pressed (pin SW)
  if (digitalRead(encoderBtn) == LOW) Serial.println("Button Pressed");
  else Serial.println("Button Released");
  }
*/
/*  Codificador rotativo Keyes KY-040
    ( KY-007 para algunos vendedores )
    Prueba de conteo, direccion y  pulsador
    No se filtra los ruidos de contacto
*/
/*
  #define salidaA 2
  #define salidaB 3
  #define boton 4

  int contador = 0;
  int estadoA;
  int estadoPrevioA;
  void setup() {
  pinMode (salidaA, INPUT); // pin 2
  pinMode (salidaB, INPUT); // pin 3
  // el pulsador debe ser polarizado a valor ALTO
  pinMode (boton, INPUT_PULLUP);
  Serial.begin (9600);
  // Lee el estado inicial de la salida A
  estadoPrevioA = digitalRead(salidaA);
  }
  void loop()
  {
  // Lee el estado de la salida A
  estadoA = digitalRead(salidaA);
  // Si el estado previo de la salida A era otro
  // significa que se ha producido un pulso
  if (estadoA != estadoPrevioA) {
    // Si el estado de salida B es diferente del estado
    // de salida A el codificador esta girando a la derecha
    if (digitalRead(salidaB) != estadoA) {
      contador ++;
    } else {
      contador --;
    }
    Serial.print("Posición: ");
    Serial.println(contador);
  }
  // actualiza el estado guardado
  estadoPrevioA = estadoA;

  bool Bot = digitalRead(boton);
  //Serial.print(B);
  if (!Bot) // si se pulsa el boton su valor va a BAJO
  { Serial.println("Boton pulsado: Contador a 0");
    contador = 0 ;
    delay(300);
  }
  }

  #include <Wire.h>
  #include <VL53L0X.h>

  VL53L0X sensor;

  void setup()
  {
  Serial.begin(9600);
  Wire.begin();

  sensor.init();
  sensor.setTimeout(500);

  // Start continuous back-to-back mode (take readings as
  // fast as possible).  To use continuous timed mode
  // instead, provide a desired inter-measurement period in
  // ms (e.g. sensor.startContinuous(100)).
  sensor.startContinuous();
  }

  void loop()
  {
  Serial.print(sensor.readRangeContinuousMillimeters());
  if (sensor.timeoutOccurred()) {
    Serial.print(" TIMEOUT");
  }

  Serial.println();
  }*/

#include <Wire.h>
#include <VL53L0X.h>
#define salidaA 2
#define salidaB 3
#define salidaA1 4
#define salidaB1 5


unsigned long previousMillis = 0;
unsigned long currentMillis = 0;
int Tr=1000;
VL53L0X sensor;

int contador = 0;
int contador1 = 0;
int estadoA;
int estadoPrevioA;
int estadoA1;
int estadoPrevioA1;

void setup() {
  

  pinMode (salidaA, INPUT); // pin 2
  pinMode (salidaB, INPUT); // pin 3
  pinMode (salidaA1, INPUT); // pin 2
  pinMode (salidaB1, INPUT); // pin 3
  // el pulsador debe ser polarizado a valor ALTO
  Serial.begin (115200);
  // Lee el estado inicial de la salida A
  estadoPrevioA = digitalRead(salidaA);
  estadoPrevioA1 = digitalRead(salidaA1);
  Wire.begin();

  sensor.init();
  sensor.setTimeout(500);

  // Start continuous back-to-back mode (take readings as
  // fast as possible).  To use continuous timed mode
  // instead, provide a desired inter-measurement period in
  // ms (e.g. sensor.startContinuous(100)).
  sensor.startContinuous();
}
void loop()
{
  currentMillis = millis();
  // Lee el estado de la salida A
  estadoA = digitalRead(salidaA);
  estadoA1 = digitalRead(salidaA1);
  // Si el estado previo de la salida A era otro
  // significa que se ha producido un pulso
  if (estadoA != estadoPrevioA) {
    // Si el estado de salida B es diferente del estado
    // de salida A el codificador esta girando a la derecha
    if (digitalRead(salidaB) != estadoA) {
      contador ++;
    } else {
      contador --;
    }

  }
  
  estadoPrevioA = estadoA;
  if (estadoA1 != estadoPrevioA1) {
    // Si el estado de salida B es diferente del estado
    // de salida A el codificador esta girando a la derecha
    if (digitalRead(salidaB1) != estadoA1) {
      contador1 ++;
    } else {
      contador1 --;
    }

  }
  estadoPrevioA1 = estadoA1;
  // actualiza el estado guardado

  if (sensor.timeoutOccurred()) {
    Serial.print(" TIMEOUT");
  }

  
  if (currentMillis - previousMillis >= Tr) {
    Serial.print("*{\"A1\": ");
    Serial.print(contador*12);
    Serial.print(", ");

    Serial.print("\"A2\": ");
    Serial.print(contador1*12);
    Serial.print(", ");
    

    
    Serial.print("\"D\":");
    Serial.print(sensor.readRangeContinuousMillimeters());
    Serial.println("}#");
    
    previousMillis=currentMillis;
  }
  
}
