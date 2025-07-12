from django.urls import path
from . import views
from django.contrib import admin

urlpatterns = [
    path('', views.home, name='home'),
    path('admin/', admin.site.urls),
    path('product/<int:pk>/', views.product_detail, name='product_detail'),
    path('my-account/', views.my_account, name='my_account'),
    path('orders/', views.my_orders, name='my_orders'),
    path('returns/', views.my_returns, name='my_returns'),
    path('help/', views.need_help, name='need_help'),
    path('details/', views.my_details, name='my_details'),
    path('address/', views.address_book, name='address_book'),
    path('payment/', views.payment_methods, name='payment_methods'),
    path('social/', views.social_accounts, name='social_accounts'),
    path('logout/', views.sign_out, name='sign_out'),
    path('cart/', views.cart_view, name='cart'),
    path('cart/add/<int:product_id>/', views.add_to_cart, name='add_to_cart'),
]
