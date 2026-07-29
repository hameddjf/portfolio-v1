from rest_framework.routers import DefaultRouter
from .views import SkillCategoryViewSet

router = DefaultRouter()
router.register(r'skils', SkillCategoryViewSet)

urlpatterns = router.urls