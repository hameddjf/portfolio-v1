from rest_framework import viewsets
from .serializers import SkillCategorySerializer
from .models import SkillCategory

class SkillCategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SkillCategory.objects.all().prefetch_related('skills')
    serializer_class = SkillCategorySerializer
    # اجازه دسترسی عمومی
    permission_classes = []