# Example-1

- **Dockerfile** is responsible for building production Docker image.
- **Yaml** file is responsible for deploying this microservice to Kubernetes.
- **`Src`** code can be found under `src` directory.

You can build the image with the following command:
`docker build -t video-streaming:1 --file Dockerfile-prod .`

> Make sure to integrate version number `:1` per build to better differentiate between builds.

You can check if your `kubectl` is connected to the cluster, through the following command: `kubectl config current-context`

To connect to a cluster, use: `kubectl config use-context docker-desktop`

For an overal list, see: `kubectl config get-contexts`

Additional Commands:
- list pods running in cluster: `kubectl get pods`
- deploy microservice to cluster: `kubectl apply -f scripts/deploy.yaml`
- view services in cluster: `kubectl get services`
- delete deployment to cleanup: `kubectl delete -f scripts/deploy.yaml`