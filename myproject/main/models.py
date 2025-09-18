from django.db import models
from django.contrib.auth.models import User
from myproject import settings
from decimal import Decimal



product = models.ForeignKey("main.Product", on_delete=models.CASCADE)
class UserDetails(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(
        max_length=10,
        choices=[("male", "Menswear"), ("female", "Womenswear")],
        blank=True
    )

    def __str__(self):
        return f"{self.user.username} details"
class Color(models.Model):
    name = models.CharField(max_length=50, unique=True)
    hex_code = models.CharField(max_length=7, help_text='HTML-код кольору, напр. #000000')

    def __str__(self):
        return self.name

    def color_box(self):
        return f'<div style="width:20px; height:20px; background:{self.hex_code}; border:1px solid #000;"></div>'

    color_box.allow_tags = True


class Category(models.Model):
    name = models.CharField(max_length=100)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='subcategories')

    def __str__(self):
        return f"{self.parent.name + ' > ' if self.parent else ''}{self.name}"

class Product(models.Model):
    GENDER_CHOICES = [
        (0, 'Жіноче'),
        (1, 'Чоловіче'),
    ]
    PATTERN_CHOICES = [
        ('none', 'Відсутній'),
        ('striped', 'Смугастий'),
        ('checked', 'Клітинка'),
        ('floral', 'Квітковий'),
        ('other', 'Інший'),
    ]
    STRETCH_CHOICES = [
        ('low', 'Низька'),
        ('medium', 'Середня'),
        ('high', 'Висока'),
    ]

    CLOTHING_STYLE_CHOICES = [
        ('relaxed_straight', 'Розслаблений прямий'),
        ('loose_straight', 'Вільний прямий'),
        ('relaxed_arrow', 'Розслаблена стрілка'),
        ('loose', 'Вільний'),
        ('baggy', 'Мішковина'),
        ('straight', 'Прямий'),
        ('fitted', 'Приталений'),
    ]
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.CharField(max_length=100, blank=True)
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True, blank=True)
    stock = models.PositiveIntegerField(default=1, help_text="Кількість доступних одиниць товару")
    look_after_me = models.TextField(blank=True, help_text="Про догляд", default="Машинне прання згідно з інструкціями на етикетках з догляду")  
    about_me = models.TextField(blank=True, help_text="Про мене")
    product_details = models.TextField(blank=True, help_text="Деталі продукту")
    gender = models.IntegerField(choices=GENDER_CHOICES, default=0)
    discount = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    sizes = models.JSONField(default=list, blank=True, null=True)
    lengths = models.JSONField(default=list, blank=True, null=True)
    rating_sum = models.PositiveIntegerField(default=0)
    rating_count = models.PositiveIntegerField(default=0)
    pattern = models.CharField(
        max_length=20,
        choices=PATTERN_CHOICES,
        default='none',
        verbose_name='Візерунок'
    )
    stretchiness = models.CharField(
        max_length=20,
        choices=STRETCH_CHOICES,
        default='medium',
        verbose_name="Розтяжність"
    )

    clothing_style = models.CharField(
        max_length=50,
        choices=CLOTHING_STYLE_CHOICES,
        default='loose_straight',
        verbose_name="Загальний вид одягу"
    )
    
    def final_price(self):
        if self.discount:
            price = self.price * (100 - self.discount) / 100
        else:
            price = self.price
        return round(price, 2)
    
    def save(self, *args, **kwargs):
        if not self.sizes:
            self.sizes = [36, 37, 38, 39, 40]
        if not self.lengths:
            self.lengths = [30, 32, 34]
        super().save(*args, **kwargs)

    def average_rating(self):
        if self.rating_count == 0:
            return 0
        return round(self.rating_sum / self.rating_count, 1)


    def __str__(self):
        return self.name



class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='products/gallery/')

    def __str__(self):
        return f"Фото для {self.product.name}"
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    date_ordered = models.DateField()

class Return(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    reason = models.TextField()
    date_requested = models.DateField()

class HelpRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    submitted_at = models.DateTimeField(auto_now_add=True)




class Address(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address_line = models.TextField()
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)

class PaymentMethod(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card_number = models.CharField(max_length=16)
    expiry_date = models.DateField()

class SocialAccount(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    provider = models.CharField(max_length=100)
    account_link = models.URLField()

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

class UserDetails(models.Model):
    GENDER_CHOICES = [
        ('M', 'Чоловік'),
        ('F', 'Жінка'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    birth_date = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES)

    def __str__(self):
        return f"Деталі для {self.user.username}"


class Wishlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='wishlist')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='wishlisted_by')
    added_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'product')
    def __str__(self):
        return f"{self.user.username} → {self.product.name}"

class ProductRating(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="ratings")
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ("product", "user")