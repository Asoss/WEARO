from django.urls import path
from .views import *
from django.contrib.auth import views as auth_views
from .views import register,add_review,product_details
from django.conf import settings
from django.conf.urls.static import static
from . import views

urlpatterns = [
    path('', product_list, name='product_list'),
    path('add', add_product, name='add_product'),
    path('edit/<int:id>/', edit_product, name='edit_product'),
    path('delete/<int:id>/', delete_product, name='delete_product'),
    path("details/<int:id>", details, name='details'),
    path('my_listings', my_listings, name='my_listings'),
    path('add_to_favorites/<int:id>', add_to_favorites, name='add_to_favorites'),
    path('my_favorites', my_favorites, name='my_favorites'),
    path('login/', auth_views.LoginView.as_view(template_name='registration/login.html', next_page='product_list'), name='login'),
    path('register/', register, name='register'),
    path('logout/', logout_view, name='logout'),
    path('profile/', profile_view, name='profile'),
    path('buying/', views.buying_view, name='buying'),
    path("profile/edit/", edit_profile, name="edit_profile"),
    path('details/<int:product_id>/', product_details, name='product_details'),
    path('add_review/<int:product_id>/', add_review, name='add_review'),    
    path("add_to_favorites/<int:product_id>/", add_to_favorites, name="add_to_favorites"),
    

]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)