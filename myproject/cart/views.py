from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404, redirect
from cart.models import Cart, CartItem
from main.models import Product, Wishlist
from django.views.decorators.http import require_POST


def cart_view(request):
    cart = Cart.objects.filter(user=request.user).first()
    items = cart.items.select_related("product") if cart else []

    # додаємо поле subtotal для кожного item
    for item in items:
        item.subtotal = item.product.price * item.quantity

    total_price = sum(item.subtotal for item in items)

    return render(request, "cart/cart.html", {
        "cart": cart,
        "items": items,
        "total_price": total_price,
    })

@require_POST
def move_to_cart(request, product_id):
    if not request.user.is_authenticated:
        return redirect("login_email")
    
    product = get_object_or_404(Product, id=product_id)
    cart, _ = Cart.objects.get_or_create(user=request.user)

    cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
    if not created:
        cart_item.quantity += 1
        cart_item.save()

    Wishlist.objects.filter(user=request.user, product=product).delete()

    return redirect("cart")

def remove_from_cart(request, product_id):
    cart = Cart.objects.filter(user=request.user).first()
    if cart:
        cart_item = CartItem.objects.filter(cart=cart, product_id=product_id).first()
        if cart_item:
            cart_item.delete()

    return redirect("cart")
