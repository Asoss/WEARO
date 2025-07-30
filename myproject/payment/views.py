from django.shortcuts import render

def payment_methods(request):
    return render(request, 'payment/payment_methods.html')
