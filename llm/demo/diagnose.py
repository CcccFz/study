import sys
import sqlite3

def detailed_sqlite_diagnosis():
    print("📊 SQLite 详细诊断报告:")
    
    try:
        # SQLite 版本信息
        print(f"SQLite 版本: {sqlite3.sqlite_version}")
        
        # 创建内存数据库
        conn = sqlite3.connect(':memory:')
        cursor = conn.cursor()
        
        # 检查编译选项
        cursor.execute("SELECT sqlite_compileoption_get(0)")
        compile_options = []
        
        for i in range(100):
            try:
                option = cursor.execute(f"SELECT sqlite_compileoption_get({i})").fetchone()
                if option and option[0]:
                    compile_options.append(option[0])
                else:
                    break
            except:
                break
        
        print("\n🔍 SQLite 编译选项:")
        for option in compile_options:
            print(f"- {option}")
        
        # 检查 FTS5 扩展
        fts5_enabled = any('ENABLE_FTS5' in opt for opt in compile_options)
        print(f"\n✅ FTS5 扩展是否可用: {fts5_enabled}")
        
        # 测试 FTS5 创建
        if fts5_enabled:
            cursor.execute('''
                CREATE VIRTUAL TABLE test_fts USING fts5(content);
            ''')
            cursor.execute('INSERT INTO test_fts(content) VALUES (?)', ('测试全文搜索',))
            
            # 执行全文搜索
            cursor.execute('SELECT * FROM test_fts WHERE test_fts MATCH ?', ('测试',))
            results = cursor.fetchall()
            
            print(f"✅ 全文搜索测试成功，结果: {results}")
        
        conn.close()
        
    except Exception as e:
        print(f"❌ SQLite 诊断失败: {e}")
        import traceback
        traceback.print_exc()

# 运行诊断
detailed_sqlite_diagnosis()
