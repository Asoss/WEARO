from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.urls import reverse
from django.conf import settings
from django.template.loader import render_to_string
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from .models import Product, Wishlist
from .forms import RegisterForm, UserForm
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_POST


def home(request):
    return render(request, 'main/home.html')

def product_list_by_gender(request, gender: bool, title: str):
    """Універсальна в’юшка для списку товарів за статтю"""
    products = Product.objects.filter(gender=gender, available=True)

    wishlist_products = []
    if request.user.is_authenticated:
        wishlist_products = Wishlist.objects.filter(
            user=request.user
        ).values_list("product_id", flat=True)

    return render(request, "main/product_list.html", {
        "products": products,
        "wishlist_products": list(wishlist_products),
    })


def women(request):
    return product_list_by_gender(request, gender=False, title="Жіночі товари")


def men(request):
    return product_list_by_gender(request, gender=True, title="Чоловічі товари")


def product_detail(request, pk):
    product = get_object_or_404(Product, pk=pk)

    
    viewed = request.session.get('viewed_products', [])
    if pk not in viewed:
        viewed.insert(0, pk)
    
    viewed = viewed[:5]
    request.session['viewed_products'] = viewed


    recently_viewed = Product.objects.filter(pk__in=viewed).exclude(pk=pk)

    return render(request, 'main/product_detail.html', {
        'product': product,
        'recently_viewed': recently_viewed
    })



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

def page404(request):
    return render(request, 'main/page404.html')

def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        user_form = UserForm(request.POST)
        if form.is_valid() and user_form.is_valid():
            user = User.objects.create_user(
                username=form.cleaned_data["username"],
                email=form.cleaned_data["email"],
                password=form.cleaned_data["password"],
                first_name=user_form.cleaned_data["first_name"],
                last_name=user_form.cleaned_data["last_name"]
            )
            login(request, user)  
            return redirect("complete_reg") 
    else:
        form = RegisterForm()
        user_form = UserForm()
    return render(request, "main/register.html", {"form": form, "user_form": user_form})



def email_step(request):
    error = None
    next_url = request.GET.get("next", "login_password")

    if request.method == "POST":
        email = request.POST.get("email").strip().lower()
        request.session["login_email"] = email

        try:
            User.objects.get(email=email)
            return redirect(next_url)
        except User.DoesNotExist:
            error = "Упс! Невірна адреса електронної пошти"

    return render(request, "main/login_email.html", {"error": error})

def password_step(request):
    email = request.session.get("login_email")
    if not email:
        return redirect("login_email")

    error = None

    if request.method == "POST":
        password = request.POST.get("password")
        try:
            user = User.objects.get(email=email)
            auth_user = authenticate(request, username=user.username, password=password)
            if auth_user:
                login(request, auth_user)
                request.session.pop("login_email", None) 
                return redirect("home")
            else:
                error = "Невірний пароль"
        except User.DoesNotExist:
            return redirect("login_email")

    return render(request, "main/login_password.html", {"error": error, "email": email})



def password_reset_request(request):
    email = request.session.get("login_email")

    if not email:
        return redirect("login_email")  

    if request.method == "POST":
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return redirect("login_email")


        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)

        reset_url = request.build_absolute_uri(
            reverse("password_reset_confirm", kwargs={"uidb64": uid, "token": token})
        )

        email_subject = "Скидання паролю"
        email_body = render_to_string("main/password_reset_email.html", {
            "user": user,
            "reset_url": reset_url,
        })

        send_mail(
            subject=email_subject,
            message=email_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False,
        )

        return redirect("password_reset_done") 

    return render(request, "main/password_reset.html", {"email": email})


def complete_register(request):
    if request.method == "POST":
        birth_date = request.POST.get("birth_date")
        gender = request.POST.get("gender")

        if birth_date and gender:
            if request.user.is_authenticated:
                user_details = request.user.userdetails
                user_details.birth_date = birth_date
                user_details.gender = gender
                user_details.save()
                return redirect("home")
        else:
            error = "Заповніть всі поля"
            return render(request, "main/complete_reg.html", {"error": error})

    return render(request, "main/complete_reg.html")

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

def search_results(request):
    query = request.GET.get('q')
    products = Product.objects.filter(name__icontains=query) if query else []
    return render(request, 'main/product_search.html', {'products': products})

@login_required
def wishlist_view(request):
    if not request.user.is_authenticated:
        return render(request, 'main/wishlist_guest.html', {
            'title': 'Мої збережені речі'
        })

    saved_items = Wishlist.objects.filter(user=request.user).select_related('product')
    products = [item.product for item in saved_items]  
    count = len(products)

    return render(request, 'main/wishlist.html', {
        'title': 'Мої збережені речі',
        'products': products,   
        'wishlist_count': count
    })

@login_required
def toggle_wishlist(request, product_id):
    print(f"Toggle wishlist для товару: {product_id}")
    try:
        product = Product.objects.get(id=product_id)
        wishlist_item, created = Wishlist.objects.get_or_create(user=request.user, product=product)

        if not created:
            wishlist_item.delete()
            print(f"Товар {product_id} видалено з wishlist")  
            return JsonResponse({'status': 'removed'})
        else:
            print(f"Товар {product_id} додано в wishlist")  
            return JsonResponse({'status': 'added'})
    except Product.DoesNotExist:
        return JsonResponse({'status': 'error', 'message': 'Product not found'}, status=404)

