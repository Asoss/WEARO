from django.urls import path
from . import views

urlpatterns = [
    path('', views.cart_view, name='cart'), 
    path("move-to-cart/<int:product_id>/", views.move_to_cart, name="move_to_cart"),
    path('remove/<int:product_id>/', views.remove_from_cart, name='remove_from_cart'), 
    path('clear/', views.clear_cart, name='clear_cart'),
    path('update_cart_quantity/', views.update_cart_quantity, name='update_cart_quantity'),
]