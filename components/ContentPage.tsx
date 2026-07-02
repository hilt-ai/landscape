'use client';

import { ContentLayout } from '@/components/ContentLayout';

interface ContentPageProps {
  title: string;
  children: React.ReactNode;
}

export function ContentPage({ title, children }: ContentPageProps) {
  return (
    <ContentLayout>
      <h1 className="text-4xl font-bold text-stone-900 mb-8">{title}</h1>
      <div className="space-y-6 text-stone-700">{children}</div>
    </ContentLayout>
  );
}

export const ContentSection = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => <div className={`space-y-4 ${className}`}>{children}</div>;

export const ContentHeading = ({
  level = 2,
  children,
}: {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
}) => {
  const HeadingTag = `h${level}` as keyof React.JSX.IntrinsicElements;
  const sizeClasses = {
    1: 'text-3xl font-bold text-stone-900 pt-4 mb-4',
    2: 'text-2xl font-semibold text-stone-900 pt-4 mb-4',
    3: 'text-xl font-semibold text-stone-900 pt-4 mb-3',
    4: 'text-lg font-semibold text-stone-900 pt-4 mb-2',
    5: 'text-base font-semibold text-stone-900 pt-3 mb-2',
    6: 'text-sm font-semibold text-stone-900 pt-2 mb-1',
  };

  return <HeadingTag className={sizeClasses[level]}>{children}</HeadingTag>;
};

export const ContentParagraph = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => <p className={`leading-relaxed ${className}`}>{children}</p>;

export const ContentList = ({
  type = 'unordered',
  items,
  className = '',
}: {
  type?: 'ordered' | 'unordered';
  items: React.ReactNode[];
  className?: string;
}) => {
  const ListTag = type === 'ordered' ? 'ol' : 'ul';
  const listClasses =
    type === 'ordered'
      ? 'list-decimal list-inside space-y-2 ml-4'
      : 'list-disc list-inside space-y-2 ml-4';

  return (
    <ListTag className={`${listClasses} ${className}`}>
      {items.map((item, index) => (
        <li key={`list-item-${index}`}>{item}</li>
      ))}
    </ListTag>
  );
};

export const ContentCode = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <code className={`bg-stone-100 px-2 py-1 rounded text-sm ${className}`}>
    {children}
  </code>
);

export const ContentCodeBlock = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <pre
    className={`bg-stone-100 p-4 rounded-lg overflow-x-auto text-sm ${className}`}
  >
    {children}
  </pre>
);

export const ContentAlert = ({
  type = 'info',
  title,
  children,
  className = '',
}: {
  type?: 'info' | 'warning' | 'success' | 'error';
  title?: string;
  children: React.ReactNode;
  className?: string;
}) => {
  const alertClasses = {
    info: 'bg-blue-50 border border-blue-200 text-blue-800',
    warning: 'bg-yellow-50 border border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border border-green-200 text-green-800',
    error: 'bg-red-50 border border-red-200 text-red-800',
  };

  const titleClasses = {
    info: 'text-blue-800',
    warning: 'text-yellow-800',
    success: 'text-green-800',
    error: 'text-red-800',
  };

  return (
    <div
      className={`border rounded-lg p-6 pt-4 ${alertClasses[type]} ${className}`}
    >
      {title && (
        <h3 className={`text-lg font-semibold mb-2 ${titleClasses[type]}`}>
          {title}
        </h3>
      )}
      <div className="text-stone-700">{children}</div>
    </div>
  );
};

export const ContentButton = ({
  href,
  children,
  variant = 'primary',
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}) => {
  const buttonClasses = {
    primary: 'bg-yellow-300 text-stone-900 hover:bg-yellow-300',
    secondary: 'bg-stone-200 text-stone-800 hover:bg-stone-300',
  };

  return (
    <a
      href={href}
      className={`inline-block mt-4 px-6 py-3 rounded-[34px] font-medium transition-colors ${buttonClasses[variant]} ${className}`}
    >
      {children}
    </a>
  );
};
