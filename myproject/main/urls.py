from django.shortcuts import render
from django.urls import path,include
from django.contrib import admin
from main import views
from django.contrib.auth import views as auth_views


urlpatterns = [
    path('', views.home, name='home'),
    path('admin/', admin.site.urls),
    path('women/', views.women, name='women'),
    path('men/', views.men, name='men'),
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
    path('login/email/', views.email_step, name='login_email'),
    path('login/password/', views.password_step, name='login_password'),
    path("reset_password/", views.password_reset_request, name="password_reset"),
    path(
        "reset/<uidb64>/<token>/",
        auth_views.PasswordResetConfirmView.as_view(template_name="main/password_reset_confirm.html"),
        name="password_reset_confirm"
    ),
    path(
        "reset_password_done/",
        auth_views.PasswordResetDoneView.as_view(template_name="main/password_reset_done.html"),
        name="password_reset_done"
    ),
    path(
        "reset_password_complete/",
        auth_views.PasswordResetCompleteView.as_view(template_name="main/password_reset_complete.html"),
        name="password_reset_complete"
    ),
    path('register/', views.register, name='register'),
    path("complete-register/", views.complete_register, name="complete_reg"),
    path('cart/', include('cart.urls')),
    path('search/', views.search_results, name='product_search'),
    path('wishlist/', views.wishlist_view, name='wishlist'),
    path('wishlist-guest/', views.wishlist_view, name='wishlist_guest'),
    path('wishlist/toggle/<int:product_id>/', views.toggle_wishlist, name='toggle_wishlist'),

]

