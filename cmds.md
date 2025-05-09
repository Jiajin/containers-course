docker cmds
docker build -t sjj/cron-test:0.10 .
docker tag sjj/cron-test:0.10 026083545547.dkr.ecr.ap-southeast-1.amazonaws.com/sjj/cron-test:0.10

docker push 026083545547.dkr.ecr.ap-southeast-1.amazonaws.com/sjj/cron-test:0.10

docker build -t sjj/dov-bear:v1 .
docker run -d -p 5001:3000 sjj/dov-bear:v1
INSTANCE_NAME=a-bear INSTANCE_HASH=arbi-hash docker run -d -p 5001:3000 sjj/dov-bear:v3
docker ps -a

5953 is the first 4 chars of container id
docker exec -ti 5953 ls -l
docker exec -ti 5953 /bin/sh
# to see running processes
ps -a

# logs
docker logs <id>
docker logs -f <id>

# kill all containers
docker rm -f $(docker ps -aq)

# exec
docker exec -ti <id> /bin/sh

# mysql volume e.g.
docker volume create data-vol
docker volume ls
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=abc123 --mount type=volume,src=data-vol,dst=/var/lib/mysql mysql:8

# kubectl cmds
# rmb to save config in ./kube first

# can use po/<podname> as shortofmr for delete pod <podname>
k delete pod cilium-cjrsh -n kube-system
k delete po/cilium-cjrsh -n kube-system

# get resources, the READY X/Y is X = No. of pod, Y = no. of containers
# -owide is for more info
k get po -nmyns -owide
k get po,deploy -nmyns
k get all -nmyns

# describe
k -nmyns describe svc/dov-svc
k -nmyns get ep

# logs (w namespace and using pod name)
k -nmyns logs -f po/dov-po

# to exec or bash in
# -- signals the end of kubectl cmds
k -nmyns exec -ti po/dov-po -- /bin/sh

# to force shutdown faster
export now="--force --grace-period=0"

# port forwarding
k -nmyns port-forward pod/myapp-pod 8080:3000
k -nmyns port-forward deploy/dov-deploy 8080:3000 

# Create VS Apply
# Apply will compare current state with the file
# Create will just do whatever is stated in the file regardless of current state
k -nmyns create -f pod.yaml
k -nmyns apply -f pod.yaml 

# Scale
k -nmyns scale deploy/dov-deploy --replicas=X

# restarting (rollout)
k -nmyns rollout restart deploy/dov-deploy
k -nbggns rollout undo deploy/bggapp-deploy --to-revision=1
k -nbggns rollout history deploy/bggapp-deploy

# to retrieve yaml file.
k -nbggns get deploy/bggapp-deploy -oyaml | less
k -nmyns apply -k . -oyaml --dry-run=client 

# see all
k  -nmyns get all,ing,pvc,pv

# monitoring mem usage
k top node
k top pod -A --sort-by=memory

# pinging cluster 
kubectl run netshoot --image=nicolaka/netshoot -ti --rm -- /bin/bash
nslookup dov-svc.myns.svc.cluster.local

kubectl run -n bggns tmp-shell --rm -i --tty --image nicolaka/netshoot -- bash
nslookup bggdb-svc.bggns.svc.cluster.local

# Storageclass
k get storageclass
k get sc

# IngressClass
k get ingressclass

# Annotation (can be assigned in yaml file too)
# Useful for appending info
# allow other config like ingress-nginx https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/annotations/
k -nmyns annotate <resource> note='your note here'

# helm
# myingress is simply a name. ingress-nginx/ingress-nginx is repoName/chartName
helm install myingress ingress-nginx/ingress-nginx -n ingress-nginx --create-namespace
helm list -n ingress-nginx
helm uninstall myingress -n ingress-nginx
helm template myingress ingress-nginx/ingress-nginx -n ingress-nginx
helm template myingress ingress-nginx/ingress-nginx -n ingress-nginx > ingress.yaml # to save the template

