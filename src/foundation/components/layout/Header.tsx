import { CommandBar, ICommandBarItemProps } from '@fluentui/react';

export const Header: React.FC = () => {
  const commandItems: ICommandBarItemProps[] = [
    {
      key: 'top',
      text: 'Top',
      href: '/',
    },
    {
      key: 'promarker', 
      text: 'ProMarker',
      href: '/mste',
    },
    // ...他のメニュー項目
  ];

  return (
    <CommandBar items={commandItems} />
  );
};