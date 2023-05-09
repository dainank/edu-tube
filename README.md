# Demo Microservices
A demo collection of microservices for a video-streaming application that lives within the *Knowledge Navigator* ecosystem.

## Building, Installing and Running
You need Docker and Docker-Compose installed to run this.

Boot EduTube from your terminal:
```bash
docker-compose up --build
```

Shutdown EduTube from your terminal:

```bash
docker-compose down
```

Give it some time to start, wait for the `gateway` service to come online. Then point your browser at http://localhost:4000/

## Project Scope
### Key Aspects Covered
- individual microservices
- packaging microservices
- publishing microservices (Docker)
- develop microservice application on development workstation (Docker Compose)
- testing microservices (Jest & Cypress)
- integrating third-party servers (MongoDB/RabbitMQ)
    - communicating between services (Async Messaging)
- storing data across services
- deploying microservices (Kubernetes)
- creating automated production infrastructure (Terraform)
- continuous delivery pipeline (automatic deployment)

### Technology Stack
- **Node.js** (`src`): Network orientated, relative performance, large ecosystem, lightweight.
- **Express@v5.X** (web server)
- **Azure** (cloud)
- **Docker** (container)
- **Docker Compose** (container configuration)
- **MongoDB** (Database)
- **Kubernetes** (Container Orchestration)
- **Terraform** (Cloud Infrastructure)
- **Jest** (Unit Testing)
- **GitHub Actions** (CI/CD)

A [wiki](https://github.com/dainank/edu-tube/wiki) can be found within this repository providing basic explanations of the technology stack and how they relate to microservices.

### Architecture
![architecture version 1](https://user-images.githubusercontent.com/83029234/232541165-891067fd-9c57-45c3-9e29-972ccfe025f6.png)
![architecture final version]()

#### Microservices
- Video Streaming: *serve video to user* [db]
- Video Storage: *return video from cloud storage*
- Video History: *record viewing history* [db]
- Video Upload: *allow user data blob uploading to cloud*
- Front-end Gateway: *receive and relay browser front-end requests*
- MongoDB Database Host

#### Key Events