from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import Http404
from food.models import Food, Account
from food.serializers_food import FoodSerializer

class FoodList(APIView):
  def get(self, request, format=None):
    foods = Food.objects.all()
    serializer = FoodSerializer(foods, many=True)
    return Response(serializer.data)

  def post(self, request, format=None):
    serializer = FoodSerializer(data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class FoodDetail(APIView):
  def get_object(self, pk):
    try:
      return Food.objects.get(pk=pk)
    except Food.DoesNotExist:
      raise Http404

  def get(self, request, pk, format=None):
    food = self.get_object(pk)
    serializer = FoodSerializer(food)
    return Response(serializer.data)

  def put(self, request, pk, format=None):
    food = self.get_object(pk)
    serializer = FoodSerializer(food, data=request.data)
    if serializer.is_valid():
      serializer.save()
      return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

  def delete(self, request, pk, format=None):
    food = self.get_object(pk)
    food.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

class FoodGroups(APIView):
  def get_object(self, restaurant_pk):
    try:
      return Food.objects.filter(restaurant_id=restaurant_pk).all()
    except Food.DoesNotExist:
      raise Http404

  def get(self, request, restaurant_pk, format=None):
    foods = self.get_object(restaurant_pk=restaurant_pk)
    serializer = FoodSerializer(foods, many=True)
    return Response(serializer.data)

class FoodFavorites(APIView):
  def get_object(self, account_pk):
    try:
      return Account.objects.filter(pk=account_pk).first().food_favorites
    except Account.DoesNotExist:
      raise Http404

  def get(self, request, account_pk, format=None):
    favorites = self.get_object(account_pk=account_pk)
    serializer = FoodSerializer(favorites, many=True)
    return Response(serializer.data)
