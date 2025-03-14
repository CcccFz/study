from langserve import RemoteRunnable

if __name__ == '__main__':
    cli = RemoteRunnable('http://localhost:8000')
    # actual http api body: {"input": {'language': 'English', 'text': '我下午要去约会，不能去上班了'}}
    print(cli.invoke({'language': 'English', 'text': '我下午要去约会，不能去上班了'}))
    for msg in cli.stream({'language': 'English', 'text': '我下午要去约会，不能去上班了'}):
        print(msg, end='', flush=True)
