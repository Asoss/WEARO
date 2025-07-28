from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Product, Item
from .forms import LoginForm, RegisterForm


def home(request):
    products = Product.objects.all()
    return render(request, 'main/home.html', {'products': products})

def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)
    return render(request, 'main/product_detail.html', {'product': product})

def my_account(request):
    return render(request, 'main/my_account.html')

def my_orders(request):
    return render(request, 'main/my_orders.html')

def my_returns(request):
    return render(request, 'main/my_returns.html')

def need_help(request):
    return render(request, 'main/need_help.html')

def my_details(request):
    return render(request, 'main/my_details.html')

def address_book(request):
    return render(request, 'main/address_book.html')

def payment_methods(request):
    return render(request, 'main/payment_methods.html')

def social_accounts(request):
    return render(request, 'main/social_accounts.html')

def delivery_info(request):
    return render(request, 'main/help/delivery.html')

def sign_out(request):
    logout(request)
    return redirect('home')

def page404(request):
    return render(request, 'main/page404.html')

def register(request):
    """Обробка реєстрації нового користувача"""
    form = RegisterForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        user = User.objects.create_user(
            username=form.cleaned_data["username"],
            email=form.cleaned_data["email"],
            password=form.cleaned_data["password"]
        )
        login(request, user)
        return redirect("home")
    return render(request, "main/auth.html", {"form": form, "page": "register"})

def user_login(request):
    """Обробка входу користувача"""
    form = LoginForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        username = form.cleaned_data["username"]
        password = form.cleaned_data["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect("home")
    return render(request, "main/auth.html", {"form": form, "page": "login"})
