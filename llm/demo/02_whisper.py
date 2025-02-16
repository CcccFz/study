import whisper

model = whisper.load_model("base")
result = model.transcribe("audio1.m4a",
                           verbose=True,           # 显示详细日志
    language='zh',          # 指定语言
    fp16=False,             # CPU 使用
    beam_size=5,            # 增加beam search大小
    best_of=5)
    
# result = model.transcribe("./audio.m4a")
print(result["text"])