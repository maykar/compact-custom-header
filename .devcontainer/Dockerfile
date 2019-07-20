FROM python:3.7

RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        git \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

RUN python -m pip install --upgrade colorlog
RUN python -m pip install --upgrade git+git://github.com/home-assistant/home-assistant.git@dev
RUN mkdir -p /config/.storage
RUN ln -s /workspaces/compact-custom-header /config/www


WORKDIR /config/www

# Set the default shell to bash instead of sh
ENV SHELL /bin/bash