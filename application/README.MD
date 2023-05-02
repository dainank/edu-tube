Deploying the microservice in this code respository to Kubernetes.

`docker build -t video-streaming:1 --file Dockerfile-prod .`
`docker tag video-streaming:1 <registry-url>/video-streaming:1`
`docker login <registry-url>`
`docker push <registry-url>/video-streaming:1`
`kubectl apply -f scripts/deploy.yaml`
```bash
kubectl get pods
kubectl get deployments
kubectl get services
```
`kubectl delete -f scripts/deploy.yaml`