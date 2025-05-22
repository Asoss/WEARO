from django.db import models
from django.contrib.auth.models import User  
from django.core.validators import MinValueValidator

class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def str(self):
        return self.name

class Product(models.Model):
    CATEGORY_CHOICES = [
        ('Auto', 'Auto'),
        ('Electronics', 'Electronics'),
        ('Home/Garden', 'Home/Garden'),
        ('Clothes', 'Clothes'),
        ('Realty', 'Realty'),
        ('Toys', 'Toys'),
        ('Animals', 'Animals'),
        ('Other', 'Other'),
    ]

    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(1)])
    description = models.TextField()
    category = models.CharField(max_length=40, choices=CATEGORY_CHOICES)  
    image = models.ImageField(upload_to='product_images/', blank=False, null=False)    
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    favorites = models.ManyToManyField(User, related_name='favorite_products', blank=True)

    def str(self):
        return f"{self.name} - {self.author.username}"
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to='avatars/', default='site_images/ava1.png', blank=True, null=True)

    def __str__(self):
        return self.user.username
class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    total_price = models.DecimalField(max_digits=10, decimal_places=2)
    products = models.ManyToManyField(Product)

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"
class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey("Product", on_delete=models.CASCADE, related_name="reviews")
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.username} on {self.product.name}"   