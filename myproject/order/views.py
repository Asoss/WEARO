from django.db import transaction
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.utils import timezone
from main.models import Order, OrderItem
from cart.models import Cart 

@login_required
@require_POST
def create_order(request):
    try:
        cart = Cart.objects.filter(user=request.user).first()
        if not cart or not cart.items.exists():
            return JsonResponse({"error": "Кошик порожній"}, status=400)

        with transaction.atomic():
            order = Order.objects.create(
                user=request.user,
                description="Нове замовлення",
                # Видалено date_ordered, оскільки auto_now_add=True
            )

            total_price = 0
            for cart_item in cart.items.select_related("product"):
                product = cart_item.product
                price = product.final_price()
                qty = cart_item.quantity

                OrderItem.objects.create(
                    order=order,
                    product=product,
                    quantity=qty,
                    price=price
                )

                total_price += price * qty

            order.total_price = total_price
            order.save()

            # очищаємо кошик
            cart.items.all().delete()

        return JsonResponse({"success": True, "order_id": order.id})

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=400)