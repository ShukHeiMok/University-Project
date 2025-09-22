# imports
import sys
import grovepi
import time
import json


# component ports
grovepi.set_bus("RPI_1")
ultrasonic_ranger = 3
led_button = 6
led_light = 5
buzzer = 8
grovepi.pinMode(buzzer, "OUTPUT")
grovepi.pinMode(led_button, "INPUT")

###
# LCD setup and write command. LINE 19 -> 67 TAKEN FROM LAB EXERCISE
if sys.platform == 'uwp':
    import winrt_smbus as smbus
    bus = smbus.SMBus(1)
else:
    import smbus
    import RPi.GPIO as GPIO
    rev = GPIO.RPI_REVISION
    if rev == 2 or rev == 3:
        bus = smbus.SMBus(1)
    else:
        bus = smbus.SMBus(0)

# this device has two I2C addresses for LCD version 5.0
DISPLAY_RGB_ADDR = 0x30
DISPLAY_TEXT_ADDR = 0x3e

# set backlight to (R,G,B) (values from 0..255 for each)
def setRGB(r,g,b):
    bus.write_byte_data(DISPLAY_RGB_ADDR,0,0)
    bus.write_byte_data(DISPLAY_RGB_ADDR,1,0)
    bus.write_byte_data(DISPLAY_RGB_ADDR,0x08,0xaa)
    bus.write_byte_data(DISPLAY_RGB_ADDR,4,r)
    bus.write_byte_data(DISPLAY_RGB_ADDR,3,g)
    bus.write_byte_data(DISPLAY_RGB_ADDR,2,b)
 
# send command to display (no need for external use)    
def textCommand(cmd):
    bus.write_byte_data(DISPLAY_TEXT_ADDR,0x80,cmd)
 
# set display text \n for second line(or auto wrap)     
def setText(text):
    textCommand(0x01) # clear display
    time.sleep(.05)
    textCommand(0x08 | 0x04) # display on, no cursor
    textCommand(0x28) # 2 lines
    time.sleep(.05)
    count = 0
    row = 0
    for c in text:
        if c == '\n' or count == 16:
            count = 0
            row += 1
            if row == 2:
                break
            textCommand(0xc0)
            if c == '\n':
                continue
        count += 1
        bus.write_byte_data(DISPLAY_TEXT_ADDR,0x40,ord(c))

###
present = ''
while True:
    try:
        setRGB(5,250,0)
        # read
        distance = grovepi.ultrasonicRead(ultrasonic_ranger)
        button_state = grovepi.digitalRead(led_button)

        
        # send to Thingsboard
        x = json.dumps({'distance': distance, 'doorbell': present})
        print(x, end='', flush=True)
        y = ''
        setText(y)
        
        # Button + Buzzer logic
        if button_state == 0:
            grovepi.digitalWrite(led_light, 1)
            grovepi.digitalWrite(buzzer,1)
            present = 'Motion detected'
            y = 'You are being   recorded'
            setText(y)       
        
        else:
            grovepi.digitalWrite(led_light, 0)
            grovepi.digitalWrite(buzzer,0)
            present = 'No one present'

        # ultrasonic ranger
        if distance < 40:

            present = 'Motion detected'
            y = 'You are being   recorded'
            setText(y)
            
            #camera.start_preview()
            #camera.start_recording('/home/pi/Desktop/video%s.h264' % vidIndex)
            #sleep(5)#length of videos
            #camera.stop_recording()
            #time.sleep(1)
            #vidIndex = vidIndex + 1
        else:
            present = 'No one present'
            
        time.sleep(1)
    except KeyboardInterrupt:

        break
    except IOError:
        print ("Error")
    