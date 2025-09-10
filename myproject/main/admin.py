from django.contrib import admin
from .models import Category, Product, ProductImage, Color
from .forms import ProductForm


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    form = ProductForm
    list_display = ('name', 'price', 'discount', 'final_price_display', 'stock', 'pattern', 'category', 'stretchiness', 'clothing_style')
    list_filter = ('stock', 'brand', 'color', 'category', 'discount', 'pattern', 'stretchiness', 'clothing_style')
    search_fields = ('name', 'brand')
    exclude = ('rating_sum', 'rating_count',)
    inlines = [ProductImageInline]

    def final_price_display(self, obj):
        return obj.final_price()
    final_price_display.short_description = 'Ціна зі знижкою'


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent')
    search_fields = ('name',)


@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ('name', 'hex_code')
    search_fields = ('name',)
