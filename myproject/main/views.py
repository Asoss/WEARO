from django.shortcuts import render, redirect
from .models import Item
from django.contrib.auth import authenticate, login, logout
from .forms import LoginForm, RegisterForm
from django.contrib.auth.models import User

def item_list(request):
    items = Item.objects.all()
    return render(request, 'main/items/item_list.html', {'items': items})

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
        return redirect("item_list")
    return render(request, "main/items/auth.html", {"form": form, "page": "register"})

def user_login(request):
    """Обробка входу користувача"""
    form = LoginForm(request.POST or None)
    if request.method == "POST" and form.is_valid():
        username = form.cleaned_data["username"]
        password = form.cleaned_data["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)  
            return redirect("item_list")  
    return render(request, "main/items/auth.html", {"form": form, "page": "login"})

def user_logout(request):
    """Обробка виходу користувача"""
    logout(request)
    return redirect("item_list")