# Commands
- `npm start` - run production
- `npm run start:dev` - run dev (hot-reloading)
- `docker build -t video-streaming-v1 --file Dockerfile .` - create local image
- `docker run -d -p 3000:3000 -e PORT=3000 video-streaming-v1` - instantiate local container (from image)
- `docker run -d -p 3000:3000 -e PORT=3000 edutube.azurecr.io/video-streaming-v1:latest` - instantiate local container (from cloud service image)
