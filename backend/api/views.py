import uuid
from http import HTTPStatus

from rest_framework.decorators import api_view
from rest_framework.response import Response

from myinfo.client import MyInfoClient


@api_view(['GET'])
def test_get(request):
    return Response("Test Response")


@api_view(['POST'])
def test_post(request):
    return Response({'Test': 'Response'})


@api_view(['GET'])
def get_authorize_url(request):
    query_params = request.query_params
    if 'callback_url' in query_params:
        callback_url = query_params['callback_url']
    else:
        callback_url = None
    my_info = MyInfoClient()
    state = uuid.uuid4()
    generated_url = my_info.get_authorise_url(state, callback_url='http://localhost:3001/callback')
    print(generated_url)
    return Response(generated_url)


@api_view(['POST'])
def get_access_token(request):
    query_params = request.query_params
    if 'code' not in query_params:
        return Response('Invalid code', status=HTTPStatus.BAD_REQUEST)
    code = query_params['code']
    my_info = MyInfoClient()
    generated_url = my_info.get_access_token(auth_code=code, )
