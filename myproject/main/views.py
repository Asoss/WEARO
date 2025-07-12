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
    return render(request, 'order/my_orders.html')

def my_returns(request):
    return render(request, 'main/my_returns.html')

def need_help(request):
    return render(request, 'main/need_help.html')

def my_details(request):
    return render(request, 'main/my_details.html')

def address_book(request):
    return render(request, 'main/address_book.html')

def payment_methods(request):
    return render(request, 'payment/payment_methods.html')

def social_accounts(request):
    return render(request, 'main/social_accounts.html')
def delivery_info(request):
    return render(request, 'main/help/delivery.html')

def sign_out(request):
    logout(request)
    return redirect('home')
def cart_view(request):
    cart_ids = request.session.get('cart', [])
    products = Product.objects.filter(id__in=cart_ids)
    return render(request, 'cart/cart.html', {'products': products})
def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)

    cart = request.session.get('cart', [])
    cart.append(product.id)
    request.session['cart'] = cart

    return redirect('cart')
def women_view(request):
    return render(request, 'women/women.html')

def men_view(request):
    return render(request, 'men/men.html')

