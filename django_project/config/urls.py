from django.contrib import admin
import os
from django.http import JsonResponse
from django.urls import include, path


def api_root(request):
    codespace_name = os.environ.get("CODESPACE_NAME")
    if codespace_name:
        api_base_url = f"https://{codespace_name}-8000.app.github.dev"
    else:
        api_base_url = request.build_absolute_uri("/").rstrip("/")

    return JsonResponse(
        {
            "activities": f"{api_base_url}/api/activities/",
            "teams": f"{api_base_url}/api/teams/",
            "leaderboard": f"{api_base_url}/api/leaderboard/",
            "workouts": f"{api_base_url}/api/workouts/",
        }
    )


urlpatterns = [
    path("admin/", admin.site.urls),
    path("", api_root, name="api_root"),
    path("api/", api_root, name="api"),
    path("api/", include("core.urls")),
]
