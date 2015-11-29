# A look into kubernetes autoscaling

## about kubernetes
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
Predictive autoscaling means to scale the load based on historical data. This can be observations from the past year, month, week or even day. You feed your previous data into an algorithm which computes a number which is then used as input for the actual scaling.

### reactive
Reactive autoscaling is the hardest to get right. KPIs are constantly monitored and a decision has to be made in ne It's a live version of predictive autoscaling.


## limits
It’s only CPU (for now).
timeperiod? after how long 80% CPU and then scale?

think about:
- different requests (one takes 5s to compute, one 10ms): problem with total # of requests
- backend system overloaded: problem with ms approach
-

How about some downscaling?

## try it out
```
docker run \
  --name=etcd \
  --net=host \
  -d quay.io/coreos/etcd:v2.2.2 \
    --addr=127.0.0.1:2379 \
    --bind-addr=0.0.0.0:2379 \
    --data-dir=/var/etcd/data
```

```
docker run \
  --name=hyperkube \
  --volume=/:/rootfs:ro \
  --volume=/sys:/sys:ro \
  --volume=/dev:/dev \
  --volume=/var/lib/docker/:/var/lib/docker:ro \
  --volume=/var/lib/kubelet/:/var/lib/kubelet:rw \
  --volume=/var/run:/var/run:rw \
  --net=host \
  --pid=host \
  --privileged=true \
  -d willies/hyperkube:v1.1 \
    /hyperkube kubelet \
    --containerized \
    --hostname-override="127.0.0.1" \
    --address="0.0.0.0" \
    --api-servers=http://localhost:8080 \
    --config=/etc/kubernetes/manifests
```


## Summary
Autoscaling provides
