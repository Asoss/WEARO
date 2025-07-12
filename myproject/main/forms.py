from django import forms
from django.contrib.auth.models import User
from .models import UserDetails
import re #регулярні вирази

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
        widget=forms.TextInput(attrs={"class": "form-control"})
    )
    email = forms.EmailField(
        label="Email",
        widget=forms.EmailInput(attrs={"class": "form-control"})
    )
    password = forms.CharField(
        label="Пароль",
        widget=forms.PasswordInput(attrs={"class": "form-control"})
    )
    password2 = forms.CharField(
        label="Підтвердіть пароль",
        widget=forms.PasswordInput(attrs={"class": "form-control"})
    )

    def clean_username(self):
        username = self.cleaned_data.get("username")
        if User.objects.filter(username=username).exists():
            raise forms.ValidationError("Користувач з таким ім'ям вже існує")
        return username

    def clean_email(self):
        email = self.cleaned_data.get("email")
        if "@" not in email:
            raise forms.ValidationError("Email має містити @.")
        if not email.endswith((".com", ".net", ".ua", ".org")):
            raise forms.ValidationError("Email повинен закінчуватись на .com, .ua, .net або .org")
        return email

    def clean_password(self):
        password = self.cleaned_data.get("password")
        if len(password) < 8:
            raise forms.ValidationError("Пароль має містити щонайменше 8 символів")
        if not re.search(r"[A-ZА-Я]", password):
            raise forms.ValidationError("Пароль має містити хоча б одну велику літеру")
        if not re.search(r"\d", password):
            raise forms.ValidationError("Пароль має містити хоча б одну цифру")
        if not re.search(r"[!@#$%^&*()_+=\-{}[\]:;\"'<>,.?/]", password):
            raise forms.ValidationError("Пароль має містити хоча б один спеціальний символ")
        return password

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get("password")
        password2 = cleaned_data.get("password2")

        if password and password2 and password != password2:
            raise forms.ValidationError("Паролі не співпадають!")

        return cleaned_data
