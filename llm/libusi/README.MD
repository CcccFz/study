# venv环境要求
venv
python 3.12.9, python >= 3.11
pip 25.0.1, pip >= 24

# venv
python -m venv venv
source venv/bin/activate
deactivate
pip freeze > requirements.txt
pip install -r requirements.txt