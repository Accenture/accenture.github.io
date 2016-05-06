---
layout: post
title:  "Smart Open Spaces"
categories: accenture opensource JavaME JavaSE Python MQTT RaspberryPi
---

# Smart Open Spaces

## Introduction

![Different scopes of Open Spaces](/img/posts/smart-open-spaces/scopes.png=510x360)

Open spaces management includes multiple scenarios with any kind of volume open to people activity. Manage people indoors or outdoors, and in spaces with nothing in common “business” needs, such as museums, department stores, or city downtowns.

We wish we could know what is exactly happening, in real-time and historic info in order to:

* Evaluate whether we are about to exceed the capacity of a closed space.
* If we need to plan special shifts to meet unexpected demand (more nurses/doctors at a hospital emergency).
* If there is a crowd on a street for some reason (accident, fire, traffic jam, …), we can send the appropriate public service (ambulance, firemen, police, ... ).

## Solution description

To face this problem we are going to define some “Presence Zones” within we can monitor people activity. In order to be as no intrusive as possible we track people activity through the radio signals of their personal devices: smart phones, wearables, laptops, tablets… We are taking “shots” of where each device is at this exact moment in time. The idea is to collect data that let us know how people are “moving” into our “Open Space”.

![Customers evolutions into a Smart Open Space](/img/posts/smart-open-spaces/evolution.gif)

Now we can use collected information in real time:

* Where are the customers located at this exact moment in time?
* Which places are capturing the customer attention?

Or analyse aggregated data for insights on people habits

* Which are the paths that customers follow more frequently inside the store?
* A sale on selected items started yesterday at noon. How was the activity in the surrounding area compared to normal days?
* What is the activity pattern along the day in the electronics department? That information would be helpful to plan working shifts better

Our approach has also one main objective: TCO should be as low as possible. To enable that objective:

* Leverage open standards, minimizing the cost of software licenses.
* Phisical implementation with low-cost, easy to obtain devices.
* Simple & lightweight, but easy to scale.

## Technology selection

For technology selection we identify:

* Java and Python as programming languages/runtimes
	* Device sniffing through Java ME 8 midlet or Python script (for devices that cannot run ME... yet)
	* Data collector through Java SE 8 server
* Bluetooth LE
	* More precise than WiFi
	* Not as frequently used compared with WiFi, but usage is growing fast thanks to wearables
* Single Board Computers
	* Raspberry Pi A+, B+, 2 B
	* Beaglebone Black
	* Arduino

![Technology selection schema](/img/posts/smart-open-spaces/technologySchema.png)
	
Here we can see a simple example of how sniffers and collector are working together.

1. First we sniff the devices using Bluetooth to find them.
2. When we have this information we translate it to JSON and send it to the collector.
3. Collector has to correlate and store information from each beacon.
4. And as last step it generates reports such as (daily, on demand reports, or the realtime view)
	
## Working example

![Working example](/img/posts/smart-open-spaces/workingExample.gif)

This is an example of how we are detecting and using real-time information.
We have three detected devices, Nexus 5, detected by Raspberry Pis 1 and 2. Pebble detected by Raspberry Pi number 2, and one iPhone 6 detected by Raspberry Pi 4. There is no devices detected by Raspberry Pi number 3. Each beacon send to collector information of all detected devices, because they don’t know if other beacon has detected the same device.
With information from each beacon collector match MAC addresses and timeframe trying to detect duplicated devices. That’s reason why beacons send 4 packets (two for Nexus 5, one for Pebble and other one for iPhone 6) but only three events are generated in the collector.
We’re also we can see how we’re using aggregated data.
First Nexus 5 is detected by rasberry pis number 1 and 2. After some time it’s detected only by raspberry pi number 2. And after some time it’s only detected by raspberry pi number 3. It seems that he’s looking for a coffee break…
Ok, that’s good if we need to manage one open space, but what if we need to manage 2, 3 or 50 of them? Is there a good and easy way to scale out this solution?
The answer is yes, and its name is MQTT.

## Scale out

Ok, that’s good if we need to manage one open space, but going forward, what if we need to manage 2, 3 or 50 of them? Is there a good and easy way to scale out this solution?
The answer is yes, and its name is MQTT.

![One data collector MQTT](/img/posts/smart-open-spaces/dataCollectorMQTT.png)

The idea is split data collector into a data collector itself and a data center for real time and aggregated data. Data collector receives sockets from beacons, and send information to data center using MQTT. Data center has to serve the requests of historic information, real time information and analytics.

Now we have an easy-to-scale solution. As times as necessary and without location restrictions.

![Scaled out solution](/img/posts/smart-open-spaces/scaledOutSolution.png)

Combining MQTT topics and wildcards we can also get just the information that we need. For example:

* All the activity in american stores.
* Only the activity in london store.
* The activity in electronics department of one specific store.
* The activity in all electronic departments.
* Or all the activity.

![MQTT filtering data](/img/posts/smart-open-spaces/mqttFiltering.png)

## Conclusions

Raspberry Pi devices are cheap but powerful enough to take multiple roles simultaneously: we use as Bluetooth device detection and collector device correlating data and producing reports. There are much more devices, but none of them has the availability and flexibility of Raspberry Pi, we can use if from simple IoT devices to complex java applications container (even using Docker).
In this solution we use different languages that requires different skills of your team: Python, Java EE, Java SE… Multiple roles and visions are involved in development. Also using open standards that facilitate integration and addition of new features in the future.
