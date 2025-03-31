const fs = require('fs');
const uniq = require('lodash/uniq');

const imageFileNames = () => {
  const array = uniq(
    fs
      .readdirSync('src/components/ImageIcon/resources')
      .filter(file => {
        return file.endsWith('.png');
      })
      .map(file => {
        return file.replace('.png', '').replace('@2x', '').replace('@3x', '');
      }),
  );
  return array;
};

const generate = () => {
  let properties = imageFileNames()
    .map(name => {
      return `${name.replace(/-/g, '_')}: require('./resources/${name}.png')`;
    })
    .join(',\n  ');
  const string = `const resources = {
  ${properties},
};\n
export default resources;
`;

  const nameSuggestion = `import { ImageProps, ViewProps } from 'react-native';

  interface BoxProps extends ViewProps {
    background?: string;
    flexDirection?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
    justify?:
      | 'flex-start'
      | 'flex-end'
      | 'center'
      | 'space-between'
      | 'space-around'
      | 'space-evenly';
    align?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
    flex?: number;
    square?: number;
    circle?: number;
    shadowDepth?: number;
    width?: string | number;
    height?: string | number;
    margin?: number | [number, number] | [number, number, number, number];
    padding?: number | [number, number] | [number, number, number, number];
  }

  interface ImageIconProps extends ImageProps {
    size?: number;
    boxProps?: BoxProps;
    margin?: number | [number, number] | [number, number, number, number];
    padding?: number | [number, number] | [number, number, number, number];
    pressable?: boolean;
    name: ${imageFileNames()
      // eslint-disable-next-line no-useless-escape
      .map(e => `\'${e}\'`)
      .join(' | ')};
  }
  
  export default function ImageIcon(props: ImageIconProps): {};
  `;

  fs.writeFileSync('src/components/ImageIcon/resources.js', string, 'utf8');
  fs.writeFileSync(
    'src/components/ImageIcon/index.d.ts',
    nameSuggestion,
    'utf8',
  );
};

generate();
