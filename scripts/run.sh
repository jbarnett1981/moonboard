#!/bin/bash
# Run startup animation
sudo /home/pi/moonboard/bin/python /home/pi/moonboard-pi/led/startup_animation.py
# Run moonboard service
sudo /home/pi/moonboard/bin/python /home/pi/moonboard-pi/run.py --led_layout=evo $1 --debug --driver_type=WS281X