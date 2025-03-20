import { ActionIcon } from '@lobehub/ui';
import { Compass, FolderClosed, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import { memo } from 'react';

import { useGlobalStore } from '@/store/global';
import { SidebarTabKey } from '@/store/global/initialState';
import { featureFlagsSelectors, useServerConfigStore } from '@/store/serverConfig';
import { useSessionStore } from '@/store/session';

export interface TopActionProps {
  isPinned?: boolean | null;
  tab?: SidebarTabKey;
}

const TopActions = memo<TopActionProps>(({ tab, isPinned }) => {
  // const { t } = useTranslation('common');
  const switchBackToChat = useGlobalStore((s) => s.switchBackToChat);
  const { showMarket, enableKnowledgeBase } = useServerConfigStore(featureFlagsSelectors);

  return (
    <>
      <Link
        aria-label={'Klepet'}
        href={'/chat'}
        onClick={(e) => {
          e.preventDefault();
          switchBackToChat(useSessionStore.getState().activeId);
        }}
      >
        <ActionIcon
          active={tab === SidebarTabKey.Chat && !isPinned}
          icon={MessageSquare}
          placement={'right'}
          size="large"
          title={'Klepet'}
        />
      </Link>
      {enableKnowledgeBase && (
        <Link aria-label={'Datoteke'} href={'/files'}>
          <ActionIcon
            active={tab === SidebarTabKey.Files}
            icon={FolderClosed}
            placement={'right'}
            size="large"
            title={'Datoteke'}
          />
        </Link>
      )}
      {showMarket && (
        <Link aria-label={'Razišči'} href={'/discover'}>
          <ActionIcon
            active={tab === SidebarTabKey.Discover}
            icon={Compass}
            placement={'right'}
            size="large"
            title={'Razišči'}
          />
        </Link>
      )}
    </>
  );
});

export default TopActions;
