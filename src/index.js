const vscode = require('vscode')
const { Range, Position } = vscode

const Color = require('./Color')
const { testColor } = require('./utils')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  console.log('color converter is activate~')
  function colorConverter() {
    debugger
    const { activeTextEditor } = vscode.window
    const { selections, document } = activeTextEditor
    // selections，去除空的以及非单行的 selections
    const preSelections = selections.filter(selection => !selection.isEmpty && selection.isSingleLine)
    // positions
    const prePositions = preSelections.map(selection => [
      new Position(selection._start._line, selection._start._character),
      new Position(selection._end._line, selection._end._character)
    ])
    // Ranges
    const preRanges = prePositions.map(validPositions => new Range(validPositions[0], validPositions[1]))
    // 获取有效的 Ranges，该数组中的为用户选中并且通过了色值 reg 的过滤的 ranges
    const validRanges = preRanges.filter(range => testColor.some(regObj => regObj.reg.test(document.getText(range))))

    const currRanges = validRanges.map(range => new Color(document.getText(range)))

    activeTextEditor.edit(editBuilder => {
      validRanges.forEach((range, index) => {
        editBuilder.replace(range, currRanges[index].getColor())
      })
    })

    vscode.window.showInformationMessage('color converter say hello~')
  }

  context.subscriptions.push(vscode.commands.registerCommand('extension.cc', colorConverter))
}

function deactivate() {
  console.log('color converter is deactivate~')
}

module.exports = {
  activate,
  deactivate
}
