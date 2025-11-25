from rest_framework import viewsets
from .models import Project
from .serializers import ProjectSerializer

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    فقط اجازه خواندن (GET) را به فرانت‌اند می‌دهد.
    مدیریت (Create/Update/Delete) فقط از طریق پنل ادمین جنگو است.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer