# Demo Microservices
A demo collection of microservices for a video-streaming application.
## Boot Up Application (all microservices)
`docker compose down && docker compose up --build`

## Project Scope
### Key Aspects Covered
- individual microservices
- packaging microservices
- publishing microservices (Docker)
- develop microservice application on development workstation (Docker Compose)
- testing microservices (Jest & Cypress)
- integrating third-party servers (MongoDB/RabbitMQ)
    - communicating between services
- storing data across services
- deploying microservices (Kubernetes)
- creating production infrastructure (Terraform)
- continuous delivery pipeline (automatic deployment)

### Technology Stack
- Node.js (`src`): Network orientated, relative performance, large ecosystem, lightweight.
- Express@v5.X (web server)
- Azure (cloud)
- Docker (container)
- Docker Compose (container configuration)
- MongoDB (Database)

### Wiki
See sidebar here: https://github.com/dainank/edu-tube/wiki

### Architecture
![architecture](https://user-images.githubusercontent.com/83029234/232541165-891067fd-9c57-45c3-9e29-972ccfe025f6.png)

#### Microservices
- Video Streaming: *serve video to user* [db]
- Video Storage: *return video from cloud storage*
- Video History: *record viewing history* [db]
- MongoDB Database Host

### Misc.
Sample Videos: https://sample-videos.com/

```bash
npm test
npm run test:watch
```