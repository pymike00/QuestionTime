import json
import os

from django import template
from django.conf import settings
from django.utils.safestring import mark_safe

register = template.Library()


@register.simple_tag
def render_vite_assets():
    if settings.VITE_LIVE_SERVER:
        return mark_safe(
            """
            <script type='module' src='http://localhost:5173/@vite/client'>
            </script><script type='module' src='http://localhost:5173/src/main.js'></script>
            """
        )
    manifest_json_path = os.path.join(settings.VITE_STATIC_BUNDLE, "manifest.json")
    try:
        with open(manifest_json_path, "r") as f:
            manifest = json.load(f)
            payload = f"""<script type="module" src="/static/{settings.VITE_BUILD_DIRNAME}/{manifest['index.html']['file']}"></script>"""
            if "css" in manifest["index.html"].keys():
                payload += f"""<link rel="stylesheet" type="text/css" href="/static/{settings.VITE_BUILD_DIRNAME}/{manifest['index.html']['css'][0]}" />"""
            return mark_safe(payload)
    except Exception as e:
        raise Exception(f"Error loading {manifest_json_path} - {e}") from e
