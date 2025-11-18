import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import { ComponentProps } from 'react';
import {
  OpaqueColorValue,
  type StyleProp,
  type TextStyle,
} from 'react-native';

type IconSymbolName = string;

type MaterialIconName = ComponentProps<typeof MaterialIcons>['name'];

/**
 * Mapeamento SF Symbols → Material Icons
 */
const MAPPING: Record<string, MaterialIconName> = {
  // Telas antigas
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',

  // Ranking
  'trophy.fill': 'emoji-events',

  // Palpites
  'palpites': 'tips-and-updates',
};

/**
 * Ícone cross-platform
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  const fallbackIcon: MaterialIconName = 'help-outline';
  const mappedName = MAPPING[name] ?? fallbackIcon;

  return (
    <MaterialIcons
      name={mappedName}
      size={size}
      color={color}
      style={style}
    />
  );
}
