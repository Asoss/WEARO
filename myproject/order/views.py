from django.shortcuts import render

def my_orders(request):
    return render(request, 'order/my_orders.html')
