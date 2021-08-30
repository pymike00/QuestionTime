from django.db import models
from django.conf import settings

from core.models import TimeStampedModel


class Question(TimeStampedModel):
    content = models.CharField(max_length=240)
    slug = models.SlugField(max_length=255, unique=True)
    author = models.ForeignKey(
        settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="questions"
    )

    def __str__(self):
        return self.content


class Answer(TimeStampedModel):
    body = models.TextField()
    question = models.ForeignKey(
        Question, on_delete=models.CASCADE, related_name="answers"
    )
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    voters = models.ManyToManyField(settings.AUTH_USER_MODEL, related_name="votes")

    def __str__(self):
        return self.author.username
