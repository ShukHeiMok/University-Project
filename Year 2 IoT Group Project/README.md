## Group 29 - IoT Project - Smart Doorbell

## Description
Our project is a smart doorbell designed to help owners observe motion outside of their house with convenience.

## Sensors and Actuators
Sensors: Camera, Ultrasonic Ranger, and LED button (button).
Actuators: LCD Screen, Buzzer, and LED Button (LED).

## How it works
1. Youtube stream configured and relevant access key is entered into livestream.sh.
2. NodeRed runs the IoTProject.py file. Distance and motion detected status is sent to ThingsBoard via MQTT.
3. livestream.sh is executed. Stream must be opened from the browser, click 'share' and copy the embed code.
4. Replace ThingsBoard widget with the specific URL, increase the width and height to increase the widget size (we doubled both values).
5. Livestream, motion data, and whether someone is present should all be visible from the dashboard.


## References
IoTProject.py: Lines 19 -> 67 taken from: hakan kayan. 2021. lcd.py source code. Available at: https://gitlab.com/IOTGarage/iot-lab-book/-/blob/master/LAB%2002%20-%20Single-board%20Computer%20Programming/lcd.py [Accessed: 14 May 2024]. 