from main.models import Wishlist


def counts(request):
    wishlist_count = 0
    cart_count = 0

    if request.user.is_authenticated:
        wishlist_count = Wishlist.objects.filter(user=request.user).count()

    cart = request.session.get("cart", [])
    cart_count = len(cart)

    return {
        "wishlist_count": wishlist_count,
        "cart_count": cart_count,
    }