python -m venv .venv

.\.venv\Scripts\activate

python -m pip install Django

python -m pip install Pillow

Set-ExecutionPolicy Unrestricted -Scope Process

python manage.py runserver
