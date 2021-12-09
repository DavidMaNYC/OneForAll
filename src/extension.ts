// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerTextEditorCommand(
		"extension.duckDuckGo",()=>{
		  let link= "https://duckduckgo.com/?q=%SELECTION%";
		  webSearch(link);
		}
	  ));
	  context.subscriptions.push(vscode.commands.registerTextEditorCommand(
		"extension.google",
		()=>{
		  let link= "https://www.google.com/search?q=%SELECTION%";
		  webSearch(link);
		}
	  ));
	  context.subscriptions.push(vscode.commands.registerTextEditorCommand(
		"extension.bing",
		()=>{
		  let link= "https://www4.bing.com/search?q=%SELECTION%";
		  webSearch(link);
		}
	  ));
	  context.subscriptions.push(vscode.commands.registerTextEditorCommand(
		"extension.yahoo",
		()=>{
		  let link= "https://search.yahoo.com/search?p=%SELECTION%";
		  webSearch(link);
		}
	  ));
	  context.subscriptions.push(vscode.commands.registerTextEditorCommand(
		"extension.baidu",
		()=>{
		  let link= "https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%SELECTION%";
		  webSearch(link);
		}
	  ));
	  context.subscriptions.push(vscode.commands.registerTextEditorCommand(
		"extension.yandex",
		()=>{
		  let link= "https://yandex.com/search/?text=%SELECTION%";
		  webSearch(link);
		}
	  ));
	}

	function webSearch(url:string) {
		const selectedText = getSelectedText();
		if (!selectedText) {
		  return;
		}
		const uriText = encodeURI(selectedText);
		const queryTemplate = url;
		const query = queryTemplate.replace("%SELECTION%", uriText);
		vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(query));
	  }
	  
	  function getSelectedText() {
		const documentText = vscode.window.activeTextEditor?.document.getText();
		let language= vscode.window.activeTextEditor?.document.languageId;
	  
		if (!documentText) {
		  return "";
		}
		if (language==="javascriptreact"){
		  language= "javascript react";
		}
		if (language==="typescriptreact"){
		  language= "typescript react";
		}
		const activeSelection = vscode.window.activeTextEditor?.selection;
		if (activeSelection?.isEmpty) {
		  return "";
		}
		const selStartoffset = (()=>{if(activeSelection){return vscode.window.activeTextEditor?.document.offsetAt(
			activeSelection.start
		);}else{return undefined;}})();
		const selEndOffset = (()=>{if(activeSelection){return vscode.window.activeTextEditor?.document.offsetAt(
			activeSelection.end
		);}else{return undefined;}})();
		let selectedText = documentText.slice(selStartoffset, selEndOffset).trim();
	  
		return `${selectedText.replace(/\s\s+/g, " ")} ${language}`;
	  }
// this method is called when your extension is deactivated
export function deactivate() {}
