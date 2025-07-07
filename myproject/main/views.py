from django.shortcuts import render, get_object_or_404, redirect
from .models import Product
from django.contrib.auth import logout
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

