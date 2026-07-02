'use client';

import { Item, ItemMembership } from '@/lib/types';
import { ItemTile } from '@/components/ItemTile';
import { getTestId } from '@/lib/test-ids';

interface CategoryClusterProps {
  title: string;
  items: Item[];
  itemMemberships: Map<string, ItemMembership>;
  description?: string;
  onItemClick: (item: Item) => void;
}

export function CategoryCluster({
  title,
  items,
  itemMemberships,
  description,
  onItemClick,
}: CategoryClusterProps) {
  if (items.length === 0) return null;

  const platinumContributorMemberItems = items.filter((item) => {
    const membership = itemMemberships.get(item.slug);
    return (
      (membership?.isPlatinumMember && membership?.isEbpfContributor) || false
    );
  });
  const platinumMemberItems = items.filter((item) => {
    const membership = itemMemberships.get(item.slug);
    return (
      (membership?.isPlatinumMember && !membership?.isEbpfContributor) || false
    );
  });
  const ebpfContributorItems = items.filter((item) => {
    const membership = itemMemberships.get(item.slug);
    return (
      (membership?.isEbpfContributor && !membership?.isPlatinumMember) || false
    );
  });
  const memberItems = items.filter((item) => {
    const membership = itemMemberships.get(item.slug);
    return membership?.isMember || false;
  });
  const regularItems = items.filter((item) => {
    const membership = itemMemberships.get(item.slug);
    return !(
      membership?.isPlatinumMember ||
      membership?.isEbpfContributor ||
      membership?.isMember
    );
  });

  return (
    <div className="mb-12">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-stone-900 mb-2">{title}</h2>
        {description && <p className="text-stone-600 text-sm">{description}</p>}
      </div>

      <div
        {...getTestId('categoryCluster')}
        className="grid gap-2 sm:gap-4 grid-flow-row-dense"
        style={{
          gridTemplateColumns: 'repeat(auto-fill, 60px)',
          gridAutoRows: '60px',
        }}
      >
        {platinumContributorMemberItems.map((item, index) => (
          <ItemTile
            key={item.slug}
            item={item}
            membership={itemMemberships.get(item.slug)!}
            index={index}
            onItemClick={onItemClick}
          />
        ))}

        {platinumMemberItems.map((item, index) => (
          <ItemTile
            key={item.slug}
            item={item}
            membership={itemMemberships.get(item.slug)!}
            index={index}
            onItemClick={onItemClick}
          />
        ))}

        {ebpfContributorItems.map((item, index) => (
          <ItemTile
            key={item.slug}
            item={item}
            membership={itemMemberships.get(item.slug)!}
            index={index}
            onItemClick={onItemClick}
          />
        ))}

        {memberItems.map((item, index) => (
          <ItemTile
            key={item.slug}
            item={item}
            membership={itemMemberships.get(item.slug)!}
            index={index}
            onItemClick={onItemClick}
          />
        ))}

        {regularItems.map((item, index) => (
          <ItemTile
            key={item.slug}
            item={item}
            membership={itemMemberships.get(item.slug)!}
            index={index}
            onItemClick={onItemClick}
          />
        ))}
      </div>
    </div>
  );
}
