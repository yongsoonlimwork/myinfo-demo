import uuid
from http import HTTPStatus

import jwcrypto
import jwt
import requests.exceptions
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.response_code import ApiResponseCode
from myinfo.client import MyInfoClient
from myinfo.security import get_decoded_access_token, get_decrypted_person_data


@api_view(['GET'])
def get_authorize_url(request):
    query_params = request.query_params

    if 'callback' in query_params:
        callback = query_params['callback']
    else:
        callback = 'http://localhost:3001/callback'

    my_info = MyInfoClient()
    state = uuid.uuid4()
    authorize_url = my_info.get_authorise_url(state, callback_url=callback)

    return Response({
        'result': {
            'authorizeUrl': authorize_url
        }
    })


@api_view(['POST'])
def get_person_info(request):
    data = request.data
    if 'code' not in data:
        return Response({
            'message': ApiResponseCode.REQUIRE_AUTHORIZATION_CODE
        }, status=HTTPStatus.BAD_REQUEST)
    code = data['code']
    state = data['state'] if 'state' in data else None
    my_info = MyInfoClient()
    try:
        access_token_dict: dict = my_info.get_access_token(auth_code=code, state=state)
    except requests.exceptions.HTTPError:
        return Response({
            'message': ApiResponseCode.TOKEN_RETRIEVE_ERROR
        }, status=HTTPStatus.BAD_REQUEST)

    if 'access_token' not in access_token_dict:
        return Response({
            'message': ApiResponseCode.INVALID_ACCESS_TOKEN
        }, status=HTTPStatus.BAD_REQUEST)

    access_token = access_token_dict['access_token']

    try:
        decoded_dict = get_decoded_access_token(access_token)
    except jwt.exceptions.DecodeError:
        return Response({
            'message': ApiResponseCode.TOKEN_DECODE_ERROR
        }, status=HTTPStatus.BAD_REQUEST)

    if 'sub' not in decoded_dict:
        return Response({
            'message': ApiResponseCode.INVALID_DECODED_SUB
        }, status=HTTPStatus.BAD_REQUEST)

    uinfin = decoded_dict['sub']
    encoded_person_data = my_info.get_person(uinfin, access_token)

    try:
        decoded_person_data = get_decrypted_person_data(encoded_person_data)
    except jwcrypto.jwe.InvalidJWEData:
        return Response({
            'message': ApiResponseCode.PERSON_DATA_DECRYPT_ERROR
        }, status=HTTPStatus.BAD_REQUEST)

    return Response({
        'result': decoded_person_data
    })


@api_view(['POST'])
def get_person_info_sample(request):
    return Response({
        'result':
            {
                "employmentsector": {
                    "lastupdated": "2023-04-26",
                    "source": "3",
                    "classification": "C",
                    "value": ""
                },
                "uinfin": {
                    "lastupdated": "2023-04-26",
                    "source": "1",
                    "classification": "C",
                    "value": "S6005048A"
                },
                "name": {
                    "lastupdated": "2023-04-26",
                    "source": "1",
                    "classification": "C",
                    "value": "ANDY LAU"
                },
                "sex": {
                    "lastupdated": "2023-04-26",
                    "code": "M",
                    "source": "1",
                    "classification": "C",
                    "desc": "MALE"
                },
                "race": {
                    "lastupdated": "2023-04-26",
                    "code": "CN",
                    "source": "1",
                    "classification": "C",
                    "desc": "CHINESE"
                },
                "nationality": {
                    "lastupdated": "2023-04-26",
                    "code": "SG",
                    "source": "1",
                    "classification": "C",
                    "desc": "SINGAPORE CITIZEN"
                },
                "dob": {
                    "lastupdated": "2023-04-26",
                    "source": "1",
                    "classification": "C",
                    "value": "1988-10-06"
                },
                "email": {
                    "lastupdated": "2023-04-26",
                    "source": "4",
                    "classification": "C",
                    "value": ""
                },
                "mobileno": {
                    "lastupdated": "2023-04-26",
                    "source": "4",
                    "classification": "C",
                    "areacode": {
                        "value": ""
                    },
                    "prefix": {
                        "value": ""
                    },
                    "nbr": {
                        "value": ""
                    }
                },
                "regadd": {
                    "country": {
                        "code": "SG",
                        "desc": "SINGAPORE"
                    },
                    "unit": {
                        "value": "10"
                    },
                    "street": {
                        "value": "ANCHORVALE DRIVE"
                    },
                    "lastupdated": "2023-04-26",
                    "block": {
                        "value": "319"
                    },
                    "source": "1",
                    "postal": {
                        "value": "542319"
                    },
                    "classification": "C",
                    "floor": {
                        "value": "38"
                    },
                    "type": "SG",
                    "building": {
                        "value": ""
                    }
                },
                "housingtype": {
                    "lastupdated": "2023-04-26",
                    "code": "",
                    "source": "1",
                    "classification": "C",
                    "desc": ""
                },
                "hdbtype": {
                    "lastupdated": "2023-04-26",
                    "code": "115",
                    "source": "1",
                    "classification": "C",
                    "desc": "5-ROOM FLAT (HDB)"
                },
                "marital": {
                    "lastupdated": "2023-04-26",
                    "code": "2",
                    "source": "1",
                    "classification": "C",
                    "desc": "MARRIED"
                },
                "edulevel": {
                    "lastupdated": "2023-04-26",
                    "code": "",
                    "source": "2",
                    "classification": "C",
                    "desc": ""
                },
                "ownerprivate": {
                    "lastupdated": "2023-04-26",
                    "source": "1",
                    "classification": "C",
                    "value": False
                },
                "cpfcontributions": {
                    "lastupdated": "2023-04-26",
                    "source": "1",
                    "history": [
                        {
                            "date": {
                                "value": "2021-12-07"
                            },
                            "employer": {
                                "value": "ABC"
                            },
                            "amount": {
                                "value": 1055.12
                            },
                            "month": {
                                "value": "2022-02"
                            }
                        },
                        {
                            "date": {
                                "value": "2022-01-07"
                            },
                            "employer": {
                                "value": "ABC"
                            },
                            "amount": {
                                "value": 1055.12
                            },
                            "month": {
                                "value": "2022-03"
                            }
                        },
                        {
                            "date": {
                                "value": "2022-02-07"
                            },
                            "employer": {
                                "value": "ABC"
                            },
                            "amount": {
                                "value": 1055.12
                            },
                            "month": {
                                "value": "2022-04"
                            }
                        },
                        {
                            "date": {
                                "value": "2022-03-07"
                            },
                            "employer": {
                                "value": "ABC"
                            },
                            "amount": {
                                "value": 1055.12
                            },
                            "month": {
                                "value": "2022-05"
                            }
                        },
                        {
                            "date": {
                                "value": "2022-04-07"
                            },
                            "employer": {
                                "value": "ABC"
                            },
                            "amount": {
                                "value": 1055.12
                            },
                            "month": {
                                "value": "2022-06"
                            }
                        },
                        {
                            "date": {
                                "value": "2022-05-07"
                            },
                            "employer": {
                                "value": "ABC"
                            },
                            "amount": {
                                "value": 1055.12
                            },
                            "month": {
                                "value": "2022-07"
                            }
                        },
                        {
                            "date": {
                                "value": "2022-06-07"
                            },
                            "employer": {
                                "value": "ABC"
                            },
                            "amount": {
                                "value": 3300.88
                            },
                            "month": {
                                "value": "2022-08"
                            }
                        },
                        {
                            "date": {
                                "value": "2022-07-07"
                            },
                            "employer": {
                                "value": "ABC"
                            },
                            "amount": {
                                "value": 1055.12
                            },
                            "month": {
                                "value": "2022-09"
                            }
                        },
                        {
                            "date": {
                                "value": "2022-08-07"
                            },
                            "employer": {
                                "value": "ABC"
                            },
                            "amount": {
                                "value": 1808.34
                            },
                            "month": {
                                "value": "2022-10"
                            }
                        },
                        {
                            "date": {
                                "value": "2022-09-07"
                            },
                            "employer": {
                                "value": "ABC"
                            },
                            "amount": {
                                "value": 1055.12
                            },
                            "month": {
                                "value": "2022-11"
                            }
                        },
                        {
                            "date": {
                                "value": "2022-10-07"
                            },
                            "employer": {
                                "value": "ABC"
                            },
                            "amount": {
                                "value": 1055.12
                            },
                            "month": {
                                "value": "2022-12"
                            }
                        },
                        {
                            "date": {
                                "value": "2022-11-07"
                            },
                            "employer": {
                                "value": "ABC"
                            },
                            "amount": {
                                "value": 1055.12
                            },
                            "month": {
                                "value": "2023-01"
                            }
                        },
                        {
                            "date": {
                                "value": "2022-12-07"
                            },
                            "employer": {
                                "value": "ABC"
                            },
                            "amount": {
                                "value": 1055.12
                            },
                            "month": {
                                "value": "2023-02"
                            }
                        },
                        {
                            "date": {
                                "value": "2023-01-07"
                            },
                            "employer": {
                                "value": "ABC"
                            },
                            "amount": {
                                "value": 1055.12
                            },
                            "month": {
                                "value": "2023-03"
                            }
                        },
                        {
                            "date": {
                                "value": "2023-02-07"
                            },
                            "employer": {
                                "value": "ABC"
                            },
                            "amount": {
                                "value": 1055.12
                            },
                            "month": {
                                "value": "2023-04"
                            }
                        }
                    ],
                    "classification": "C"
                },
                "cpfbalances": {
                    "oa": {
                        "value": 56343.35
                    },
                    "ma": {
                        "value": 32455.22
                    },
                    "lastupdated": "2023-04-26",
                    "source": "1",
                    "classification": "C",
                    "sa": {
                        "value": 42521.4
                    },
                    "ra": {
                        "value": 89323.58
                    }
                },
                "birthcountry": {
                    "lastupdated": "2023-04-26",
                    "code": "SG",
                    "source": "1",
                    "classification": "C",
                    "desc": "SINGAPORE"
                },
                "residentialstatus": {
                    "lastupdated": "2023-04-26",
                    "code": "C",
                    "source": "1",
                    "classification": "C",
                    "desc": "CITIZEN"
                },
                "aliasname": {
                    "lastupdated": "2023-04-26",
                    "source": "1",
                    "classification": "C",
                    "value": ""
                },
                "marriedname": {
                    "lastupdated": "2023-04-26",
                    "source": "1",
                    "classification": "C",
                    "value": ""
                },
                "passtype": {
                    "lastupdated": "2023-04-26",
                    "code": "",
                    "source": "3",
                    "classification": "C",
                    "desc": ""
                },
                "noahistory": {
                    "noas": [
                        {
                            "amount": {
                                "value": 200456.1
                            },
                            "trade": {
                                "value": 15000
                            },
                            "interest": {
                                "value": 8123
                            },
                            "yearofassessment": {
                                "value": "2022"
                            },
                            "taxclearance": {
                                "value": "N"
                            },
                            "employment": {
                                "value": 200000
                            },
                            "rent": {
                                "value": 7839
                            },
                            "category": {
                                "value": "ADDITIONAL"
                            }
                        },
                        {
                            "amount": {
                                "value": 200456.1
                            },
                            "trade": {
                                "value": 15000
                            },
                            "interest": {
                                "value": 8123
                            },
                            "yearofassessment": {
                                "value": "2021"
                            },
                            "taxclearance": {
                                "value": "N"
                            },
                            "employment": {
                                "value": 200000
                            },
                            "rent": {
                                "value": 7839
                            },
                            "category": {
                                "value": "ADDITIONAL"
                            }
                        }
                    ],
                    "lastupdated": "2023-04-26",
                    "source": "1",
                    "classification": "C"
                }
            }
    })
