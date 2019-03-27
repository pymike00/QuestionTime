from rest_framework import serializers
from users.models import CustomUser


class UserDisplaySerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUser
        fields = ["username"]