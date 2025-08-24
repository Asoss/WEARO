from django.shortcuts import render, get_object_or_404, redirect
from main.models import Product


def cart_view(request):
    cart_ids = request.session.get('cart', [])
    products = Product.objects.filter(id__in=cart_ids)
    return render(request, 'cart/cart.html', {'products': products})


def add_to_cart(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    cart = request.session.get('cart', [])
    if product.id not in cart:
        cart.append(product.id)
    request.session['cart'] = cart
    request.session.modified = True
    return redirect('cart')  


def remove_from_cart(request, product_id):
    cart = request.session.get('cart', [])
    if product_id in cart:
        cart.remove(product_id)
        request.session['cart'] = cart
        request.session.modified = True
    return redirect('cart')
