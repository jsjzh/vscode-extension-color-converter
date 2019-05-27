const vscode = require('vscode')
const { Range, Position } = vscode
const { testColor } = require('./utils')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('Congratulations, your extension "color-converter" is now active!')
  let disposable = vscode.commands.registerCommand('extension.helloWorld', function() {
    debugger
    const { activeTextEditor } = vscode.window
    const {
      selections,
      document: { getText }
    } = activeTextEditor
    // 获取有效的 selections 片段
    const validSelections = selections.filter(selection => !selection.isEmpty && selection.isSingleLine)
    // 根据 selections 片段去获取 Ranges，用于 activeTextEditor.document.getText 去获取真实的选择的文本
    // 但是，这个还不是最终需要的文本
    const validRanges = validSelections
      .map(selection => [
        new Position(selection._start._line, selection._start._character),
        new Position(selection._end._line, selection._end._character)
      ])
      .map(validPositions => new Range(validPositions[0], validPositions[1]))
      .filter(range => testColor.some(regObj => regObj.reg.test(getText(range))))

    console.log(validRanges)

    // activeTextEditor.edit(editBuilder => {
    //   selections.forEach(selection => {
    //     editBuilder.replace(selection, 'success')
    //   })
    // })
    vscode.window.showInformationMessage('Hello World!')
  })

  context.subscriptions.push(disposable)
}
exports.activate = activate

function deactivate() {
  console.log('Congratulations, your extension "color-converter" is now deactivate!')
}

module.exports = {
  activate,
  deactivate
}
