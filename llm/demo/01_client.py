from langserve import RemoteRunnable

if __name__ == '__main__':
    cli = RemoteRunnable('http://localhost:8000')
    print(cli.invoke({'language': 'English', 'text': '我下午要去约会，不能去上班了'}))
    # {"input": {xxx: xxxx}}