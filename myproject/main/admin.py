from django.contrib import admin
from .models import Category, Product, ProductImage, Color
from .forms import ProductForm


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    form = ProductForm
    list_display = ('name', 'price', 'discount', 'final_price', 'stock', 'category')
    list_filter = ('stock', 'brand', 'color', 'category', 'discount')
    search_fields = ('name', 'brand')
    inlines = [ProductImageInline]


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent')
    search_fields = ('name',)


@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ('name', 'hex_code')
    search_fields = ('name',)
