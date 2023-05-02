from unittest.mock import patch

import requests
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIRequestFactory

from api import views
from api.response_code import ApiResponseCode


# Create your tests here.
class ViewsTest(TestCase):
    factory = APIRequestFactory()

    def test_get_authorize_url_no_callback_provided(self):
        with patch('api.views.MyInfoClient') as MockMyInfoClient, patch('api.views.uuid.uuid4') as mock_uuid4:
            mock_instance = MockMyInfoClient.return_value
            mock_instance.get_authorise_url.return_value = 'test_authorize_url'
            mock_uuid4.return_value = 'test_state'

            request = self.factory.get(reverse('authorize-url'))
            response = views.get_authorize_url(request)
            mock_instance.get_authorise_url.assert_called_once_with('test_state',
                                                                    callback_url='http://localhost:3001/callback')

    def test_get_authorize_url_callback_provided(self):
        with patch('api.views.MyInfoClient') as MockMyInfoClient, patch('api.views.uuid.uuid4') as mock_uuid4:
            mock_instance = MockMyInfoClient.return_value
            mock_instance.get_authorise_url.return_value = 'test_authorize_url'
            mock_uuid4.return_value = 'test_state'

            request = self.factory.get(reverse('authorize-url'), {'callback': 'test_callback'})
            response = views.get_authorize_url(request)
            mock_instance.get_authorise_url.assert_called_once_with('test_state', callback_url='test_callback')

    def test_get_person_info_no_auth_code(self):
        request = self.factory.post(reverse('person-info'))
        response = views.get_person_info(request)
        self.assertEquals(response.status_code, 400)
        self.assertDictEqual(response.data, {
            'message': ApiResponseCode.REQUIRE_AUTHORIZATION_CODE
        })

    def test_get_person_info_get_access_token_error_invalid_code(self):
        with patch('api.views.MyInfoClient') as MockMyInfoClient:
            mock_instance = MockMyInfoClient.return_value
            mock_instance.get_access_token.side_effect = requests.exceptions.HTTPError('Testing testing testing')

            request = self.factory.post(reverse('person-info'), {'code': 'test_code', 'state': 'test_state'})
            response = views.get_person_info(request)
            self.assertEquals(response.status_code, 400)
            self.assertDictEqual(response.data, {
                'message': ApiResponseCode.TOKEN_RETRIEVE_ERROR
            })
            mock_instance.get_access_token.assert_called_once_with(auth_code='test_code', state='test_state')

    def test_get_person_info_missing_access_token(self):
        with patch('api.views.MyInfoClient') as MockMyInfoClient:
            mock_instance = MockMyInfoClient.return_value
            mock_instance.get_access_token.return_value = {}

            request = self.factory.post(reverse('person-info'), {'code': 'test_code', 'state': 'test_state'})
            response = views.get_person_info(request)
            self.assertEquals(response.status_code, 400)
            self.assertDictEqual(response.data, {
                'message': ApiResponseCode.INVALID_ACCESS_TOKEN
            })
            mock_instance.get_access_token.assert_called_once_with(auth_code='test_code', state='test_state')

    def test_get_person_info_access_token_decode_error(self):
        with patch('api.views.MyInfoClient') as MockMyInfoClient:
            mock_instance = MockMyInfoClient.return_value
            mock_instance.get_access_token.return_value = {
                'access_token': 'test_access_token'
            }

            request = self.factory.post(reverse('person-info'), {'code': 'test_code', 'state': 'test_state'})
            response = views.get_person_info(request)
            self.assertEquals(response.status_code, 400)
            self.assertDictEqual(response.data, {
                'message': ApiResponseCode.TOKEN_DECODE_ERROR
            })
            mock_instance.get_access_token.assert_called_once_with(auth_code='test_code', state='test_state')

    def test_get_person_info_missing_sub(self):
        with patch('api.views.MyInfoClient') as MockMyInfoClient, patch(
                'api.views.get_decoded_access_token') as mock_get_decoded_access_token:
            mock_instance = MockMyInfoClient.return_value
            mock_instance.get_access_token.return_value = {
                'access_token': 'test_access_token'
            }
            mock_get_decoded_access_token.return_value = {}

            request = self.factory.post(reverse('person-info'), {'code': 'test_code', 'state': 'test_state'})
            response = views.get_person_info(request)
            self.assertEquals(response.status_code, 400)
            self.assertDictEqual(response.data, {
                'message': ApiResponseCode.INVALID_DECODED_SUB
            })
            mock_instance.get_access_token.assert_called_once_with(auth_code='test_code', state='test_state')
            mock_get_decoded_access_token.assert_called_once_with('test_access_token')

    def test_get_person_info_person_data_decrypt_error(self):
        with patch('api.views.MyInfoClient') as MockMyInfoClient, patch(
                'api.views.get_decoded_access_token') as mock_get_decoded_access_token:
            mock_instance = MockMyInfoClient.return_value
            mock_instance.get_access_token.return_value = {
                'access_token': 'test_access_token'
            }
            mock_get_decoded_access_token.return_value = {
                'sub': 'test_sub'
            }
            mock_instance.get_person.return_value = 'test_encoded_person_data'

            request = self.factory.post(reverse('person-info'), {'code': 'test_code', 'state': 'test_state'})
            response = views.get_person_info(request)
            self.assertEquals(response.status_code, 400)
            self.assertDictEqual(response.data, {
                'message': ApiResponseCode.PERSON_DATA_DECRYPT_ERROR
            })
            mock_instance.get_access_token.assert_called_once_with(auth_code='test_code', state='test_state')
            mock_get_decoded_access_token.assert_called_once_with('test_access_token')
            mock_instance.get_person.assert_called_once_with('test_sub', 'test_access_token')

    def test_get_person_info_(self):
        with patch('api.views.MyInfoClient') as MockMyInfoClient, patch(
                'api.views.get_decoded_access_token') as mock_get_decoded_access_token, patch(
            'api.views.get_decrypted_person_data') as mock_get_decrypted_person_data:
            mock_instance = MockMyInfoClient.return_value
            mock_instance.get_access_token.return_value = {
                'access_token': 'test_access_token'
            }
            mock_get_decoded_access_token.return_value = {
                'sub': 'test_sub'
            }
            mock_instance.get_person.return_value = 'test_encoded_person_data'
            mock_get_decrypted_person_data.return_value = {
                'key_1': 'data_1',
                'key_2': 'data_2',
                'key_3': 'data_3',
            }

            request = self.factory.post(reverse('person-info'), {'code': 'test_code', 'state': 'test_state'})
            response = views.get_person_info(request)
            self.assertEquals(response.status_code, 200)
            self.assertDictEqual(response.data, {
                'result': {
                    'key_1': 'data_1',
                    'key_2': 'data_2',
                    'key_3': 'data_3',
                }
            })
            mock_instance.get_access_token.assert_called_once_with(auth_code='test_code', state='test_state')
            mock_get_decoded_access_token.assert_called_once_with('test_access_token')
            mock_instance.get_person.assert_called_once_with('test_sub', 'test_access_token')
            mock_get_decrypted_person_data.assert_called_once_with('test_encoded_person_data')
