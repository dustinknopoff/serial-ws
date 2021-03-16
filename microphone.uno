/****************************************
  Example Sound Level Sketch for the
  Adafruit Microphone Amplifier used as template
****************************************/

const int sampleWindow = 50; // Sample window width in mS (50 mS = 20Hz)
unsigned int sample;
unsigned int p2pMin = 1023;
unsigned int p2pMax = 512;
const int buttonPin = 7;
int buttonValue = 0;
String quizType = "\"collective\"";

void setup()
{
  Serial.begin(9600);
  pinMode(buttonPin, INPUT_PULLUP);
}


void loop()
{
  int i;
  int value = 0;
  int numReadings = 1;
  for (i = 0; i < numReadings; i++) {
    unsigned long startMillis = millis(); // Start of sample window
    unsigned int peakToPeak = 0;   // peak-to-peak level
    unsigned int signalMax = 0;
    unsigned int signalMin = 1024;
    // collect data for 50 mS
    while (millis() - startMillis < sampleWindow)
    {
      sample = analogRead(0);
      if (sample < 1024)  // toss out spurious readings
      {
        if (sample > signalMax)
        {
          signalMax = sample;  // save just the max levels
        }
        else if (sample < signalMin)
        {
          signalMin = sample;  // save just the min levels
        }
      }
    }
    peakToPeak = signalMax - signalMin;  // max - min = peak-peak amplitude
    value = value + peakToPeak;

    delay(1);
  }

  value = value / numReadings;
  p2pMin = min(value, p2pMin);
  p2pMax = max(value, p2pMax);
  Serial.println(map(value, p2pMin, p2pMax, 0, 99));



  int newButtonValue = digitalRead(buttonPin);
  if (newButtonValue != buttonValue) {
    buttonValue = newButtonValue;
    if (buttonValue == LOW) {
      Serial.println(quizType);
      quizType = quizType == "\"personal\"" ? "\"collective\"" : "\"personal\"";
    }
  }
}
