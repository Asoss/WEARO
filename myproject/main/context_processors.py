from cart.models import Cart, CartItem
from main.models import Wishlist

def counts(request):
    cart_count = 0
    wishlist_count = 0

    if request.user.is_authenticated:
        try:
            cart = Cart.objects.get(user=request.user)
            cart_count = CartItem.objects.filter(cart=cart).count()
        except Cart.DoesNotExist:
            cart_count = 0

        wishlist_count = Wishlist.objects.filter(user=request.user).count()

    return {
        "cart_count": cart_count,
        "wishlist_count": wishlist_count,
    }