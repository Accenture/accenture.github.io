---
layout: post
title:  "Smart Open Spaces"
categories: accenture opensource JavaME JavaSE Python MQTT RaspberryPi
---

# Smart Open Spaces

## Introduction

Open space management is an emerging concept useful in scenarios where there is a large volume of people activity. Applying intelligence to open spaces makes it possible to understand what is happening indoors or outdoors--in areas such as museums, department stores, city downtowns or public venues--and in spaces with no common “business” needs among the people who are in the location. 

![Different scopes of Open Spaces](/img/posts/smart-open-spaces/scopes.png)

Government agencies and businesses can gain valuable insights and make better decisions by knowing what is happening at a location, both through real-time data and historical information. Examples include:

* Assessing why a crowd is gathering on a street (e.g., accident, fire, traffic jam) and sending the appropriate public service (ambulance, fire fighters, police officers).
* Evaluating whether the capacity of a closed space is about to be exceeded (sporting event, concert, convention center) and modifying crowd control plans.
* Determining if special shifts are needed to meet unexpected demand (e.g., more nurses/doctors in a hospital emergency room or additional utilities workers for a power outage).

## Solution description

To explore the opportunity, we defined some “presence zones” within which we could monitor people activity. In an effort to be discreet, we tracked people activity into one of our offices, through the radio signals of their personal devices: smart phones, wearables, laptops and tablets. This is similar to taking “snapshots” of where each device is at an exact moment in time. The idea was to collect data to better understand how people are moving around an open space.

![Customers evolutions into a Smart Open Space](/img/posts/smart-open-spaces/evolution.gif)

An organization can use collected information in real time to answer questions such as:

* Where are people located at this exact moment in time?
* Which places are capturing the people's attention?

Or analyze aggregated data for insights on people's habits:

* Which paths do customers follow more frequently inside the store?
* A sale on selected items started yesterday at noon. How has the activity in the surrounding area changed when compared to normal days?
* What is the activity pattern during the day in the electronics department? This information would be helpful to plan working shifts better.

Note: To enable the lowest possible total cost of ownership, we also followed these principles:

* Leverage open standards, minimizing the cost of software licenses.
* Physical implementation with low-cost, easy to obtain devices.
* Simple and lightweight, but easy to scale.

## Technology selection

We used the following technologies to develop the solution:

* Java and Python as programming languages/runtimes
	* Device sniffing through Java ME 8 midlet or Python script (for devices that cannot run ME... yet)
	* Data collector through Java SE 8 server
* Bluetooth LE
	* More precise than WiFi
	* Not as frequently used compared with WiFi, but usage is growing quickly thanks to wearables
* Single board computers
	* Raspberry Pi A+, B+, 2 B
	* Beaglebone Black
	* Arduino

![Technology selection schema](/img/posts/smart-open-spaces/technologySchema.png)
	
This diagram shows a simple example of how sniffers and a collector work together.

1. First we sniff the devices using Bluetooth to find them.
2. When we have this information, we translate it to JSON and send it to the collector.
3. The collector correlates and stores information from each beacon.
4. Finally, the collector generates reports such as daily reports, on-demand reports or a real-time view.
	
## Working example

![Working example](/img/posts/smart-open-spaces/workingExample.gif)

This diagram shows a hypothetical example of how we could detect and use real-time information.

There are three detected devices: Nexus 5 detected by Raspberry Pis 1 and 2; Pebble detected by Raspberry Pi 2; iPhone 6 detected by Raspberry Pi 4. There are no devices detected by Raspberry Pi 3. Each beacon sends to the collector the information gathered on all detected devices because it does not know if another beacon has detected the same device.

With information from each beacon, the collector matches MAC addresses and timeframe in an attempt to detect duplicated devices. This is the reason why the beacons send four packets (two for Nexus 5, one for Pebble and one for iPhone 6) but only three events are generated in the collector.

And here is how we could use aggregated data: First, Nexus 5 is detected by Raspberry Pis 1 and 2. After some time, the device is detected only by Raspberry Pi 2. Then after an additional amount of time, it’s only detected by Raspberry Pi 3. It seems that he’s looking for a coffee break…

## Scale out

This approach is valid if an organization needs to manage one open space; however, going forward, what if it needs to manage two, three or 50 of them? Is there a good and easy way to scale out this solution? The answer is yes, and its name is MQTT.

![One data collector MQTT](/img/posts/smart-open-spaces/dataCollectorMQTT.png)

The idea is to split the data collector into a data collector itself and a data center for real-time and aggregated data. The data collector receives sockets from beacons, and sends information to the data center using MQTT. The data center has to serve the requests of historic information, real-time information and analytics.

The result is an easy-to-scale solution as many times as necessary and without location restrictions.

![Scaled out solution](/img/posts/smart-open-spaces/scaledOutSolution.png)

Combining MQTT topics and wildcards also produces only the needed information. For example:

* All the activity in US stores.
* Only the activity in London, UK store.
* The activity in electronics department of one specific store.
* The activity in all electronic departments.
* Or all the activity.

![MQTT filtering data](/img/posts/smart-open-spaces/mqttFiltering.png)

## Conclusions

Raspberry Pi devices are cheap but powerful enough to take multiple roles simultaneously. We used them both as a Bluetooth device detection and as a collector device to correlate data and produce reports. There are many more devices available in the market, but they lack the availability and flexibility of Raspberry Pi, which can be used from simple Internet of Things devices to complex Java applications container (even using Docker).

In this solution, we used different languages that required a range of skills, including Python, Java ME and Java SE. Multiple roles and visions were involved in development, and using open standards facilitated integration as well as the addition of new features in the future.
