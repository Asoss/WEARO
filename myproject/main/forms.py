from django import forms
from django.contrib.auth.models import User
from .models import UserDetails, Product
import re  # регулярні вирази


class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'email']


class UserDetailsForm(forms.ModelForm):
    class Meta:
        model = UserDetails
        fields = ['birth_date', 'gender']
        widgets = {
            'birth_date': forms.SelectDateWidget(years=range(1900, 2026)),
            'gender': forms.RadioSelect
        }


class ProductForm(forms.ModelForm):
    sizes = forms.CharField(required=False, help_text="Введення розміру через кому, напр. 36,37,38")
    lengths = forms.CharField(required=False, help_text="Введення довжини через кому, напр. 30,32,34")

    class Meta:
        model = Product
        fields = '__all__'

    def clean_sizes(self):
        data = self.cleaned_data['sizes']
        if data:
            return [int(x.strip()) for x in data.split(',') if x.strip().isdigit()]
        return []

    def clean_lengths(self):
        data = self.cleaned_data['lengths']
        if data:
            return [int(x.strip()) for x in data.split(',') if x.strip().isdigit()]
        return []


class LoginForm(forms.Form):
    username = forms.CharField(
        label="Ім'я користувача",
        widget=forms.TextInput(attrs={"class": "form-control"})
    )
    password = forms.CharField(
        label="Пароль",
        widget=forms.PasswordInput(attrs={"class": "form-control"})
    )


class RegisterForm(forms.Form):
    username = forms.CharField(
        label="Ім'я користувача",
        min_length=3,
        widget=forms.TextInput(attrs={
            "class": "form-control",
            "id": "id_username"
        })
    )
    email = forms.EmailField(
        label="Email",
        widget=forms.EmailInput(attrs={
            "class": "form-control",
            "id": "id_email"
        })
    )
    password = forms.CharField(
        label="Пароль",
        widget=forms.PasswordInput(attrs={
            "class": "form-control",
            "id": "id_password"
        })
    )
    password2 = forms.CharField(
        label="Підтвердіть пароль",
        widget=forms.PasswordInput(attrs={
            "class": "form-control",
            "id": "id_password2"
        })
    )

    def clean_username(self):
        username = self.cleaned_data.get("username")
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError("Користувач з таким ім'ям вже існує")
        return username

    def clean_email(self):
        email = self.cleaned_data.get("email")
        if User.objects.filter(email=email).exists():
            raise forms.ValidationError("Користувач з таким email вже існує")
        if not email.endswith((".com", ".net", ".ua", ".org")):
            raise forms.ValidationError("Email повинен закінчуватись на .com, .ua, .net або .org")
        return email

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        password2 = cleaned_data.get("password2")

        if password and len(password) < 8:
            self.add_error("password", "Пароль має містити щонайменше 8 символів")
        if password and not re.search(r"[A-ZА-Я]", password):
            self.add_error("password", "Пароль має містити хоча б одну велику літеру")
        if password and not re.search(r"\d", password):
            self.add_error("password", "Пароль має містити хоча б одну цифру")
        if password and not re.search(r"[!@#$%^&*()_+=\-{}[\]:;\"'<>,.?/]", password):
            self.add_error("password", "Пароль має містити хоча б один спеціальний символ")

        if password and password2 and password != password2:
            self.add_error("password2", "Паролі не співпадають!")

        return cleaned_data
