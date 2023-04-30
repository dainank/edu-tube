`cloud integration`

- build image: `docker build -t video-streaming:1 --file Dockerfile-prod .`
- tag image: `docker tag video-streaming:1 edutube2.azurecr.io/video-streaming:1`
- cloud login: `docker login edutube2.azurecr.io`
- push to container reg: `docker push edutube2.azurecr.io/video-streaming:1`
- role propegation: `az aks update -n edutube2 -g edutube2 --attach-acr edutube2`
- deploy: `kubectl apply -f scripts/deploy.yaml`
- viewing:
    - `kubectl get pods`
    - `kubectl get deployments`
    - `kubectl get services`
- close deployment:
    - `kubectl delete -f scripts/deploy.yaml`
