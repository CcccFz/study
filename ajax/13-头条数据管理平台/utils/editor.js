// 富文本编辑器
// 创建编辑器函数，创建工具栏函数

const { createEditor, createToolbar } = window.wangEditor

const editorConfig = {
    placeholder: '请输入文章内容...',
    onChange(editor) {
      document.querySelector('.publish-content').value = editor.getHtml()
    }
}

const editor = createEditor({
    selector: '#editor-container',
    html: '<p><br></p>',
    config: editorConfig,
    mode: 'default', // or 'simple'
})

const toolbarConfig = {}

const toolbar = createToolbar({
    editor,
    selector: '#toolbar-container',
    config: toolbarConfig,
    mode: 'default', // or 'simple'
})