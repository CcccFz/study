# 环境要求
venv
python >= 3.11
pip >= 24
sqlite3 3.49

# FTS5问题
wget https://www.sqlite.org/2024/sqlite-autoconf-xxx.tar.gz
tar -xzvf sqlite-autoconf-xxx.tar.gz
cd sqlite-autoconf-xxx

./configure --enable-fts5 \
            --enable-shared \
            --enable-static \
            --prefix=/usr/local

make -j$(nproc)
make install

ldconfig

sqlite3 --version
sqlite3 :memory: "SELECT sqlite_version();"

python3 diagnose.py
