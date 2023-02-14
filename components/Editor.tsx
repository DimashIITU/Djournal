import React from 'react';
import EditotJS, { OutputData } from '@editorjs/editorjs';

type EditorProps = {
  onChange: (blocks: OutputData['blocks']) => void;
  initialBlocks?: OutputData['blocks'];
};

export const Editor: React.FC<EditorProps> = ({ onChange, initialBlocks }) => {
  React.useEffect(() => {
    const editor = new EditotJS({
      holder: 'editor',
      data: {
        blocks: initialBlocks,
      },
      placeholder: 'Enter your statement text',
      async onChange() {
        const { blocks } = await editor.save();
        onChange(blocks);
      },
    });
    return () => {
      editor.isReady
        .then(() => {
          editor.destroy();
        })
        .catch((e) => console.error('Error editor cleanup', e));
    };
  }, []);
  return <div id="editor"></div>;
};
