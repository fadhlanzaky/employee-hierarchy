import config

from flask import Flask

def register_configs(app: Flask):
    app.config.from_object(config.BaseConfig())