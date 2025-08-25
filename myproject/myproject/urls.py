from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from main import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('', include('main.urls')),
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),  
    path('orders/', views.my_orders, name='my_orders'),
    path('', include('main.urls')),
    path('my-account/', views.my_account, name='my_account'),
    path('help/delivery/', views.delivery_info, name='delivery_info'),
    path('women/', views.women_view, name='women'),
    path('men/', views.men_view, name='men'),

]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

handler404 = 'main.views.custom_404'
urlpatterns += static('/static/', document_root='static')