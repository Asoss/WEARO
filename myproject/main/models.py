from django.db import models
from django.contrib.auth.models import User


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
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=8, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    brand = models.CharField(max_length=100, blank=True)
    color = models.ForeignKey(Color, on_delete=models.SET_NULL, null=True, blank=True)
    available = models.BooleanField(default=True)
    model_height = models.PositiveIntegerField(blank=True, null=True, help_text="Зріст моделі в см")
    model_size = models.CharField(max_length=10, blank=True, help_text="Розмір одягу на моделі (наприклад, S)")
    care = models.TextField(blank=True, help_text="Про догляд")  
    extra_details = models.TextField(blank=True, help_text="Про мене")
    gender = models.IntegerField(choices=GENDER_CHOICES, default=0)

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
        ('O', 'Інше'),
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