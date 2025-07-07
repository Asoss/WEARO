from django import forms
from django.contrib.auth.models import User
from .models import UserDetails

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