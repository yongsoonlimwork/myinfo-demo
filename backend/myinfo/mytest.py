from myinfo.client import MyInfoClient
import uuid


def main():
    my_info = MyInfoClient()
    state = uuid.uuid4()
    print(my_info.get_authorise_url(state))


if __name__ == '__main__':
    main()
