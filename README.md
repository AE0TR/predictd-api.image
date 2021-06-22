# Predict Daemon API

This REST-ful API talks to the excellent [kd2bd/predict](https://github.com/kd2bd/predict) satellite orbit prediction software running as a server.

### Configuration

Two environment variables control where the API will find the predict server.

1. PREDICTD_HOST=predictd
1. PREDICTD_PORT=1210