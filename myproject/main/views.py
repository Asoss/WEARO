import json
from django.http import JsonResponse
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
from django.views.decorators.http import require_POST
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.db.models import Case, When
from cart.models import Cart, CartItem
from .models import Product, ProductRating, Review, UserDetails, Wishlist
from .forms import RegisterForm, UserForm,UserDetailsForm
import random
from .models import Product, Category
from django.core.paginator import Paginator
from django.db.models import Q

from main import models

def products_api(request):
    products = Product.objects.select_related('color').prefetch_related('category')
    
    products_list = []
    for product in products:
        final_price = product.final_price()
        
        products_list.append({
            'id': product.id,
            'name': product.name,
            'price': float(product.price),
            'final_price': float(final_price),
            'color': product.color.name if product.color else 'Без кольору',
            'sizes': product.sizes or [],
            'lengths': product.lengths or [],
            'clothing_style': product.get_clothing_style_display(),
            'stretchiness': product.get_stretchiness_display(),
            'pattern': product.get_pattern_display()
        })
    
    return JsonResponse(products_list, safe=False)
 

def home(request):
    products = Product.objects.filter(stock__gt=0)
    categories = Category.objects.all()

    category_filter = request.GET.get('category')
    if category_filter:
        products = products.filter(category__id=category_filter)
    else:
        products = list(products)
        random.shuffle(products)
        products = products[:5]


    viewed = request.session.get('viewed_products', [])
    recently_viewed = Product.objects.filter(pk__in=viewed)

    return render(request, 'main/home.html', {
        'products': products,
        'categories': categories,
        'selected_category': category_filter,
        'recently_viewed': recently_viewed
    })



def product_list_by_gender(request, gender: bool, title: str):
    products = Product.objects.filter(gender=gender, stock__gt=0).order_by("id")

    wishlist_products = []
    if request.user.is_authenticated:
        wishlist_products = Wishlist.objects.filter(
            user=request.user
        ).values_list("product_id", flat=True)

    paginator = Paginator(products, 12) 
    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)

    return render(request, "main/product_list.html", {
        "products": page_obj,
        "wishlist_products": list(wishlist_products),
        "title": title,
        "gender": gender,
        "page_obj": page_obj,
        "paginator": paginator,
    })


def women(request):
    return product_list_by_gender(request, gender=0, title="Жіночі товари")


def men(request):
    return product_list_by_gender(request, gender=1, title="Чоловічі товари")

def product_detail(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    reviews = Review.objects.filter(product=product)
    user_review = None

    paginator = Paginator(reviews, 5)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    if request.user.is_authenticated:
        try:
            user_review = Review.objects.get(user=request.user, product=product)
        except Review.DoesNotExist:
            pass

    total_reviews = reviews.count()
    recommended_count = reviews.filter(rating__gte=4).count() if total_reviews > 0 else 0
    recommended_percent = round((recommended_count / total_reviews) * 100, 1) if total_reviews > 0 else 0

    # === ЛОГІКА "НЕЩОДАВНО ПЕРЕГЛЯНУТИХ" ===
    recently_viewed = request.session.get('recently_viewed', [])

    # видаляємо поточний товар, якщо є у списку
    if product.id in recently_viewed:
        recently_viewed.remove(product.id)

    # додаємо поточний на початок списку
    recently_viewed.insert(0, product.id)

    # обмежуємо список (наприклад, 6 останніх)
    recently_viewed = recently_viewed[:6]

    # зберігаємо назад у сесію
    request.session['recently_viewed'] = recently_viewed

    # формуємо порядок для запиту
    preserved_order = Case(
        *[When(id=pk, then=pos) for pos, pk in enumerate(recently_viewed) if pk != product.id]
    )

    # дістаємо продукти, крім поточного
    recently_viewed_products = (
        Product.objects.filter(id__in=recently_viewed)
        .exclude(id=product.id)
        .order_by(preserved_order)
    )

    context = {
        'product': product,
        'reviews': page_obj,
        'user_review': user_review,
        'total_reviews': total_reviews,
        'recommended_count': recommended_count,
        'recommended_percent': recommended_percent,
        'range': range(1, 6),
        'recently_viewed': recently_viewed_products, 
    }
    return render(request, 'main/product_detail.html', context)



@login_required
def add_review(request, product_id):
    if request.method == 'POST':
        product = get_object_or_404(Product, id=product_id)
        rating = request.POST.get('rating')
        comment = request.POST.get('comment', '').strip()
        
        if rating and 1 <= int(rating) <= 5:
            review, created = Review.objects.get_or_create(
                user=request.user,
                product=product,
                defaults={
                    'rating': int(rating),
                    'comment': comment
                }
            )
            
            if created:
                product.rating_sum += int(rating)
                product.rating_count += 1
                product.save()
                messages.success(request, 'Дякуємо за відгук!')
            else:
                old_rating = review.rating
                review.rating = int(rating)
                review.comment = comment
                review.save()
                
                product.rating_sum = product.rating_sum - old_rating + int(rating)
                product.save()
                messages.success(request, 'Ваш відгук оновлено!')
        else:
            messages.error(request, 'Будь ласка, оберіть рейтинг від 1 до 5 зірок.')
    
    return redirect('product_detail', product_id=product_id)

def my_account(request):
    return render(request, 'main/my_account.html')

def my_orders(request):
    return render(request, 'order/my_orders.html')

def my_returns(request):
    return render(request, 'main/my_returns.html')

def need_help(request):
    return render(request, 'main/need_help.html')

@login_required
def my_details(request):
    user = request.user
    details, created = UserDetails.objects.get_or_create(user=user)

    if request.method == "POST":
        user_form = UserForm(request.POST, instance=user)
        details_form = UserDetailsForm(request.POST, instance=details)

        if user_form.is_valid() and details_form.is_valid():
            user_form.save()
            details_form.save()
            return redirect("my_details")
    else:
        user_form = UserForm(instance=user)
        details_form = UserDetailsForm(instance=details)

    return render(request, "main/my_details.html", {
        "user_form": user_form,
        "details_form": details_form,
    })

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
    next_url = request.GET.get("next", "home")

    if request.method == "POST":
        email = request.POST.get("email").strip().lower()
        request.session["login_email"] = email
        request.session["next_url"] = next_url  
        try:
            User.objects.get(email=email)
            return redirect("login_password")
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
                next_url = request.session.pop("next_url", "home")
                return redirect(next_url)  
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
                user_details, created = UserDetails.objects.get_or_create(user=request.user)
                user_details.birth_date = birth_date
                user_details.gender = gender
                user_details.save()
                return redirect("home")
        else:
            error = "Заповніть всі поля"
            return render(request, "main/complete_reg.html", {"error": error})

    return render(request, "main/complete_reg.html")

def women_view(request):
    return render(request, 'women/women.html')

def men_view(request):
    return render(request, 'men/men.html')

def search_results(request):
    query = request.GET.get('q', '').strip().lower()
    gender = request.GET.get('gender')

    developer_keywords = [
        'developers', 'dev', 'team', 'about', 'creators', 
        'розробники', 'команда', 'творці', 'автори',
        'secret',
    ]
    if any(keyword in query for keyword in developer_keywords):
        return redirect('developers_page')

    brand_filter = request.GET.get('brand', '')
    size_filter = request.GET.get('size', '')
    price_min = request.GET.get('price_min')
    price_max = request.GET.get('price_max')

    products = Product.objects.all()

    # фільтруємо по gender, якщо передано
    if gender is not None:
        products = products.filter(gender=gender)

    if query:
        words = query.split()
        q_filter = Q()
        for word in words:
            q_filter |= Q(name__icontains=word)
        products = products.filter(q_filter)

    if brand_filter:
        products = products.filter(brand=brand_filter)
    if size_filter:
        products = products.filter(model_size=size_filter)
    if price_min:
        products = products.filter(price__gte=price_min)
    if price_max:
        products = products.filter(price__lte=price_max)

    products = products.order_by('id')

    brands = ['Nike', 'Adidas', 'Puma', 'Zara', 'H&M', "Levi's", 'ONLY & SONS', 'COLLUSION', 'New Balance', 'Converse']
    sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'W']

    paginator = Paginator(products, 6)
    page_number = request.GET.get("page")
    page_obj = paginator.get_page(page_number)

    seen = page_obj.end_index()
    total = paginator.count
    remaining = total - seen
    percent = int((seen / total) * 100) if total > 0 else 0

    context = {
        'products': page_obj,
        'brands': brands,
        'sizes': sizes,
        'query': request.GET.get('q', ''),
        'gender': gender,
        'paginator': paginator,
        'page_obj': page_obj,
        'remaining': remaining,
        'seen': seen,
        'total': total,
        'percent': percent,
    }
    return render(request, 'main/product_search.html', context)

def developers_page(request):
    return render(request, 'main/developers.html')

def wishlist_view(request):
    if not request.user.is_authenticated:
        return render(request, 'main/wishlist_guest.html', {
            'title': 'Мої збережені речі'
        })

    saved_items = Wishlist.objects.filter(user=request.user).select_related('product')
    products = [item.product for item in saved_items]
    count = len(products)

    # ---- Фільтри ----
    brand_filter = request.GET.get("brand", "")
    price_min = request.GET.get("price_min")
    price_max = request.GET.get("price_max")

    products_qs = Product.objects.filter(id__in=[p.id for p in products])

    if brand_filter:
        products_qs = products_qs.filter(brand=brand_filter)

    if price_min:
        products_qs = products_qs.filter(price__gte=price_min)

    if price_max:
        products_qs = products_qs.filter(price__lte=price_max)

    # Списки для select у формі
    brands = Product.objects.values_list("brand", flat=True).distinct()

    return render(request, 'main/wishlist.html', {
        'title': 'Мої збережені речі',
        'products': products_qs,
        'wishlist_count': count,
        'brands': brands,
    })


def toggle_wishlist(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    wishlist_item, created = Wishlist.objects.get_or_create(user=request.user, product=product)

    if not created:
        wishlist_item.delete()
        status = "removed"
    else:
        status = "added"

    count = Wishlist.objects.filter(user=request.user).count()
    return JsonResponse({"status": status, "count": count})
    

def custom_404(request, exception):
    return render(request, "main/page404.html", status=404)

@login_required
def rate_product(request):
    if request.method == "POST":
        product_id = None
        rating = None

        if request.POST.get("product_id"):
            product_id = request.POST.get("product_id")
            rating = request.POST.get("rating")
        else:
            try:
                data = json.loads(request.body)
                product_id = data.get("product_id")
                rating = data.get("rating")
            except (json.JSONDecodeError, TypeError):
                return JsonResponse({"success": False, "error": "Invalid JSON"}, status=400)

        # валідація
        if not product_id or not rating:
            return JsonResponse({"success": False, "error": "Missing data"}, status=400)

        product = get_object_or_404(Product, id=product_id)

        obj, created = ProductRating.objects.update_or_create(
            user=request.user,
            product=product,
            defaults={"rating": rating}
        )

        # перерахуємо середнє і кількість
        ratings = ProductRating.objects.filter(product=product)
        count = ratings.count()
        avg = round(ratings.aggregate(avg=models.Avg("rating"))["avg"], 1) if count > 0 else 0

        # зберігаємо у товар
        product.rating_count = count
        product.rating_avg = avg
        product.save(update_fields=["rating_count", "rating_avg"])

        return JsonResponse({
            "success": True,
            "count": count,
            "avg": avg
        })

    return JsonResponse({"success": False, "error": "Invalid method"}, status=405)