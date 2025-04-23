from django import forms


class RegisterForm(forms.Form):
    username = forms.CharField(max_length=64, widget=forms.TextInput(attrs={'placeholder': 'Username', 'class': 'form-control', 'autofocus': True}))
    email = forms.EmailField(widget=forms.EmailInput(attrs={'placeholder': 'johndoe@example.com', 'class': 'form-control'}))
    first_name = forms.CharField(max_length=64, widget=forms.TextInput(attrs={'placeholder': 'John', 'class': 'form-control'}))
    last_name = forms.CharField(max_length=64, widget=forms.TextInput(attrs={'placeholder': 'Doe', 'class': 'form-control'}))
    password = forms.CharField(max_length=64, widget=forms.PasswordInput(attrs={'placeholder': 'Password', 'class': 'form-control'}))
    confirm_password = forms.CharField(max_length=64, widget=forms.PasswordInput(attrs={'placeholder': 'Re-enter password', 'class': 'form-control'}))
    birthdate = forms.DateField(widget=forms.DateInput(attrs={'type': 'date', 'class': 'form-control'}))


class LoginForm(forms.Form):
    username = forms.CharField(max_length=64, widget=forms.TextInput(attrs={'placeholder': 'Username', 'class': 'form-control', 'autofocus': True}))
    password = forms.CharField(max_length=64, widget=forms.PasswordInput(attrs={'placeholder': 'Password', 'class': 'form-control'}))
