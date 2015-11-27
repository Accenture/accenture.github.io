# A look at kubernetes autoscaling

## intro
Kubernetes works on top of docker and provides container management at scale. The recently released v1.1 provides

## about autoscaling

Autoscaling means to horizontally scale the number of instances based on workload. This usually means a load balancer in front and at least one instance serving traffic. To scale, some kind of service discovery is a must: A new instance needs to connect to the load balancer and the load balancer needs to know the address of a new instance to route traffic to. In an AWS world this is done by an autoscaling group.

## different types

Autoscaling can be splitted into categories. There are three different:
1. time-based
2. predictive
3. reactive

### time-based
Time-based autoscaling is the simplest of all types and was there from the early days of kubernetes, it’s as easy as `kubectl scale ...`. Combine that with a cronjob and et voila. If you know your userbase is active during the day and not so much at night you can pretty easily save resources (of course this works only regional).

### predictive
Predictive autoscaling means to scale the load based on historical data. This can be observations from the past year, month, week or even day. You feed your previous data into an algorithm which computes a number which is

### reactive
Reactive autoscaling is the hardest to get right. KPIs are constantly monitored and  It's a live version of predictive autoscaling.


## limits
It’s only CPU (for now).
timeperiod? after how long 80% CPU and then scale?

How about some downscaling?


## Summary
Autoscaling provides
