import React, {useEffect, useMemo, useState} from 'react';
import {
  InitialConfigType,
  LexicalComposer,
} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {CustomHistoryActions} from './CustomHistoryActions';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import {EditorState} from 'lexical';
import {$generateHtmlFromNodes} from '@lexical/html';
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
// import initialState from './initialState.json';

export const Editor: React.FC = ({initialState}: {initialState: string}) => {
  const [editor] = useLexicalComposerContext();
  const [htmlString, setHtmlString] = useState('');

  useEffect(() => {
    return editor.registerUpdateListener(({editorState}) => {
      editorState.read(() => {
        const html = $generateHtmlFromNodes(editor, null); // Generate HTML from the entire content
        setHtmlString(html); // Update the state with the new HTML string
      });
    });
  }, [editor]);

  const CustomContent = useMemo(() => {
    return (
      <ContentEditable
        style={{
          position: 'relative',
          borderColor: 'rgba(255,211,2,0.68)',
          border: '2px solid red',
          borderRadius: '5px',
          maxWidth: '100%',
          padding: '10px',
        }}
      />
    );
  }, []);

  const CustomPlaceholder = useMemo(() => {
    return (
      <div
        style={{
          position: 'absolute',
          top: 30,
          left: 30,
        }}
      >
        Enter some text...
      </div>
    );
  }, []);

  const lexicalConfig: InitialConfigType = {
    namespace: 'My Rich Text Editor',
    onError: (e) => {
      console.log('ERROR:', e);
    },
  };

  return (
    <div style={{padding: '20px', position: 'relative'}}>
      <LexicalComposer
        initialConfig={{
          ...lexicalConfig,
          editorState: JSON.stringify(initialState),
        }}
      >
        <PlainTextPlugin
          contentEditable={CustomContent}
          placeholder={CustomPlaceholder}
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        <div style={{margin: '20px 0px'}}>
          <OnChangePlugin onChange={(editorState: EditorState) => {}} />
          <CustomHistoryActions />
        </div>
      </LexicalComposer>
    </div>
  );
};
