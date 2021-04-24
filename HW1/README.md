## File Copy Based on MQTT

> Environment: AWS EC2 t2.micro
> OS: Ubuntu 18.04

### Process

1. Create EC2 Instance on AWS

   - Ubuntu 18.04
   - Disk: 20GB
   - Security Group: open 22 port only (for ssh)

2. Assign an Elastic IP to Instance
3. Install Mosquitto
   - Connect to Instance with elastic IP
   - type `sudo apt update` for APT(Advanced Package Tool) list update
   - Install mosquitto by `sudo apt install mosquitto`
   - Check mosquitto version and is running `sudo systemctl status mosquitto`
4. Install Mosquitto Client
   - Install mosquitto client by `sudo apt install mosquitto-clients`
   - First, Open Subscribe to get message `mosquitto_sub -h 127.0.0.1 -t TEST`
   - Second, Send message by Publish `mosquitto_pub -h 127.0.0.1 -t TEST -m "Hello Sub"`
   - Check Subscriber get message "Hello Sub"
   - Exit by 'ctrl + c'
   - Options
     - -h: Host address
     - -t: Topic
     - -m: Message
5. Open port for MQTT
   - Mosquitto use port number 1884
   - Edit 'Inbound rule'

<br />

### How To Run

1. Clone This Project
2. Make `.env` file on HW1 folder
3. Write `AWS_IP=` and Type your EC2 elastic IP
4. Make `dummy` folder and `sender`, `receiver` folder on it
5. Add a file to `send` folder, ex) 'test.txt'
6. Change fileName filed in sender.js
7. execute `node ./receiver.js`, then `node ./sender.js`
8. check receiver folder
