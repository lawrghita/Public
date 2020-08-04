import sys
import pyautogui


import time
import subprocess
from winput import *


class click:
    def __init__(self, x, y):
        self.x = x
        self.y = y

clicks = []
heads = []
registerClicks = False
registerHeads = False




def mouse_callback( event ):
    global registerClicks, registerHeads
    global clicks, heads
    if event.action == winput.WM_LBUTTONDOWN:
        print("Left mouse button press at {}".format( event.position ))
        x, y = event.position
        if registerClicks == True:
            print("Append Click")
            clicks.append(click(x,y))
        if registerHeads == True:
            print("Append Head")
            heads.append(click(x,y))
            if len(heads)>2:
                heads = heads[:2]

    
def keyboard_callback( event ):
    global registerClicks, registerHeads
    global clicks, heads
  
    print("Key: {}".format(vk_code_dict.get(event.vkCode, "VK_UNKNOWN")))
    if event.vkCode == VK_F9:  #  on pressing F9
        registerClicks = True
        registerHeads = False
        
    if event.vkCode == VK_F12:  #  on pressing F12
        registerClicks = False
        registerHeads = False


    if event.vkCode == VK_LCONTROL:
        registerHeads = True
        registerClicks = False

        
    print("Reg Clicks ",registerClicks)
    print("Reg Heads ",registerHeads)
    
    
    
    if event.vkCode == VK_V: #  on pressing V
        registerHeads = False
        pyautogui.keyDown('v')
        for click in clicks:
            print("Move to ", click.x,click.y) 
            pyautogui.moveTo(click.x, click.y)
            time.sleep(0.1)
            pyautogui.doubleClick()
        pyautogui.keyUp('v')
        for click in heads:
            print("Head ", click.x,click.y) 

    if event.vkCode == winput.VK_ESCAPE: # quit on pressing escape
        winput.stop()

   
print("Press escape to quit")
w,h = pyautogui.size()
print("Test ",w,h)
time.sleep(1)


#Activate Image Annotation Tool application window
windowIAT = pyautogui.getWindowsWithTitle('Image Annotation Tool')  
fw = windowIAT[0]
fw.activate()



pyautogui.keyDown('v')
pyautogui.moveTo(200, 200)
print('moveTo200 200')
time.sleep(0.1)
pyautogui.click()
pyautogui.keyUp('v')


