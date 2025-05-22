from django.shortcuts import render, redirect, get_object_or_404
from .models import Product, Profile,Order,Review
from django.http import HttpResponse
from .forms import ProductForm
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout, update_session_auth_hash
from .forms import RegisterForm, ProfileForm, UserForm, CustomPasswordChangeForm

# Список товарів
def product_list(request):
    sort_order = request.GET.get('sort', 'asc') 
    selected_category = request.GET.get('category')

    products = Product.objects.all()
    if selected_category:
        products = products.filter(category=selected_category)

    if sort_order == 'asc':
        products = products.order_by('price')
    else:
        products = products.order_by('-price')

    return render(request, 'products/product_list.html', {
        'products': products,
        'sort_order': sort_order,
        'selected_category': selected_category,
    })

# Деталі товару
def details(request, id):
    try:
        product = Product.objects.get(id=id)
    except Product.DoesNotExist:
        return HttpResponse("Product not found")
    return render(request, "products/details.html", {'product': product})
@login_required
def add_review(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    if request.method == "POST":
        text = request.POST.get("text")
        if text:
            Review.objects.create(user=request.user, product=product, text=text)
    return redirect("product_details", product_id=product.id)
def product_details(request, product_id):
    product = get_object_or_404(Product, id=product_id)
    return render(request, "products/details.html", {"product": product})
# Додавання товару
@login_required
def add_product(request):
    if request.method == "POST":
        form = ProductForm(request.POST, request.FILES)
        if form.is_valid():
            product = form.save(commit=False) 
            product.author = request.user 
            product.save()  
            return redirect('product_list') 
    else:
        form = ProductForm()

    return render(request, "products/add_product.html", {"form": form})


# Оновлення товару
@login_required 
def edit_product(request, id):
    product = Product.objects.get(id=id)
    if request.method == "POST":
        form = ProductForm(request.POST, request.FILES, instance=product)
        if form.is_valid():
            form.save()
            return redirect('/')
    else:
        form = ProductForm(instance=product)
    return render(request, 'products/edit_product.html', {'form': form, 'product': product})

# Видалення товару
@login_required
def delete_product(request, id):
    product = Product.objects.get(pk=id)
    if product is None:
        return HttpResponse("Product not found")
    product.delete()
    return redirect("/")

#  Мої оголошення
@login_required
def my_listings(request):
    products = Product.objects.filter(author=request.user)
    return render(request, 'products/my_listings.html', {'products': products})

@login_required
def add_to_favorites(request, product_id): 
    product = get_object_or_404(Product, id=product_id)

    if request.user in product.favorites.all():
        product.favorites.remove(request.user)
        messages.success(request, "Товар видалено з кошика.")
    else:
        product.favorites.add(request.user)
        messages.success(request, "Товар додано до кошика!")

    return redirect("product_details", product_id=product.id)
#  Мої вподобання
@login_required
def my_favorites(request):
    products = Product.objects.filter(favorites=request.user)
    total_price = sum(product.price for product in products)

    if request.method == 'POST':
        order = Order.objects.create(user=request.user, total_price=total_price)
        order.products.set(products)

        for product in products:
            product.favorites.remove(request.user)  

        return redirect('buying')  

    return render(request, 'products/my_favorites.html', {'products': products, 'total_price': total_price})
@login_required
def buying_view(request):
    return render(request, 'products/buying.html')
    
# Реєстрація
def register(request):
    if request.method == 'POST':
        form = RegisterForm(request.POST, request.FILES)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            avatar = form.cleaned_data.get('avatar')
            Profile.objects.create(user=user, avatar=avatar)
            login(request, user)
            return redirect('product_list')
    else:
        form = RegisterForm()
    return render(request, 'registration/register.html', {'form': form})

@login_required
def profile_view(request):
    return render(request, 'profile/profile.html', {'user': request.user})

def logout_view(request):
    logout(request)
    return redirect('/')

# Редагування профілю
@login_required
def edit_profile(request):
    user = request.user
    profile, created = Profile.objects.get_or_create(user=user)

    if request.method == "POST":
        user_form = UserForm(request.POST, instance=user)
        profile_form = ProfileForm(request.POST, request.FILES, instance=profile)
        password_form = CustomPasswordChangeForm(user, request.POST)

        if user_form.is_valid() and profile_form.is_valid():
            user_form.save()
            profile_form.save()

        if password_form.is_valid():
            user = password_form.save()
            update_session_auth_hash(request, user)

        return redirect("profile")

    else:
        user_form = UserForm(instance=user)
        profile_form = ProfileForm(instance=profile)
        password_form = CustomPasswordChangeForm(user)

    return render(request, "profile/profile_edit.html", {
        "user_form": user_form, 
        "profile_form": profile_form, 
        "password_form": password_form
    })

