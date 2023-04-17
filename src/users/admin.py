from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from users.models import CustomUser


class CustomUserAdmin(UserAdmin):
    # add_form = 
    # form = 
    model = CustomUser
    list_display = ["username", "email", "is_staff"]


admin.site.register(CustomUser, CustomUserAdmin)
