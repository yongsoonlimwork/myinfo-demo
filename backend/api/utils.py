from contextlib import contextmanager


@contextmanager
def disable_ssl_warnings():
    import warnings
    import requests

    with warnings.catch_warnings():
        # urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)
        requests.packages.urllib3.disable_warnings(requests.packages.urllib3.exceptions.InsecureRequestWarning)
        yield None
