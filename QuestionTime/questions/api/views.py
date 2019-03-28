from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated

from questions.api.permissions import IsAuthorOrReadOnly
from questions.api.serializers import QuestionSerializer
from questions.models import Question


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    lookup_field = "slug"
    serializer_class = QuestionSerializer
    permission_classes = [IsAuthenticated, IsAuthorOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)